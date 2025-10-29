const Product = require("../models/productModel");
const CustomError = require("../errors");
const { StatusCodes } = require("http-status-codes");
const removeAccents = require("remove-accents");
const path = require("path");

const createProduct = async (req, res) => {
  req.body.user = req.user.userId;
  const product = await Product.create(req.body);
  res.status(StatusCodes.CREATED).json({ product });
};

const getAllProducts = async (req, res) => {
  const { 
    page = 1, 
    limit = 10, 
    sort = "", 
    search = "", 
    company,
    priceRange 
  } = req.query;

  const pageNumber = parseInt(page, 10);
  const pageLimit = parseInt(limit, 10);

  const searchQuery = {};

  if (search) {
    searchQuery.$or = [
      { name: { $regex: search, $options: "i" } },
      { name: { $regex: removeAccents(search), $options: "i" } },
    ];
  }

  if (company) {
    const companies = Array.isArray(company) ? company : company.split(",");
    searchQuery.company = { $in: companies };
  }
  

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    searchQuery.price = {
      ...(minPrice ? { $gte: minPrice } : {}),
      ...(maxPrice ? { $lte: maxPrice } : {}),
    };
  }

  let sortQuery = {};
  if (sort === "price-asc") sortQuery = { price: 1 }; // Ascending price
  if (sort === "price-desc") sortQuery = { price: -1 }; // Descending price
  if (sort === "newest") sortQuery = { createdAt: -1 }; // Newest
  if (sort === "best-seller") sortQuery = { sold: -1 }; // Best seller

  try {
    if (pageLimit === 100) {
      const products = await Product.find(searchQuery)
        .populate("discount")
        .sort(sortQuery);

      return res.status(200).json({
        total_products: products.length,
        products,
      });
    }

    const skip = (pageNumber - 1) * pageLimit;

    const products = await Product.find(searchQuery)
      .populate("discount")
      .sort(sortQuery)
      .skip(skip)
      .limit(pageLimit);

    const totalProducts = await Product.countDocuments(searchQuery);

    return res.status(200).json({
      total_products: totalProducts,
      total_pages: Math.ceil(totalProducts / pageLimit),
      current_page: pageNumber,
      products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};



const getProductsByCategory = async (req, res) => {
  const { categoryId } = req.params;
  const { 
    page = 1, 
    limit = 30, 
    search = "", 
    priceRange, 
    company, 
    sort = "" 
  } = req.query;

  const searchQuery = {
    $or: [{ mainCategory: categoryId }, { subCategory: categoryId }],
  };

  if (search) {
    searchQuery.$and = [
      ...(searchQuery.$and || []),
      {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { name: { $regex: removeAccents(search), $options: "i" } },
        ],
      },
    ];
  }

  if (priceRange) {
    const [minPrice, maxPrice] = priceRange.split("-").map(Number);
    searchQuery.price = {
      ...(minPrice ? { $gte: minPrice } : {}),
      ...(maxPrice ? { $lte: maxPrice } : {}),
    };
  }

  if (company) {
    const companies = Array.isArray(company) ? company : company.split(",");
    searchQuery.company = { $in: companies };
  }

  let sortQuery = {};
  if (sort === "price-asc") sortQuery = { price: 1 };  // Giá tăng dần
  if (sort === "price-desc") sortQuery = { price: -1 }; // Giá giảm dần
  if (sort === "newest") sortQuery = { createdAt: -1 }; // Mới nhất
  if (sort === "best-seller") sortQuery = { sold: -1 }; // Bán chạy nhất

  const pageNumber = parseInt(page, 10);
  const pageSize = parseInt(limit, 10);

  if (pageNumber < 1 || pageSize < 1) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: "Invalid page or limit value" });
  }

  try {
    const totalProducts = await Product.countDocuments(searchQuery);
    const totalPages = Math.ceil(totalProducts / pageSize);
    const currentPage = pageNumber > totalPages ? totalPages : pageNumber;

    const products = await Product.find(searchQuery)
      .populate("discount")
      .sort(sortQuery)  // Sắp xếp theo yêu cầu
      .skip((currentPage - 1) * pageSize)
      .limit(pageSize);

    if (products.length === 0) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "No products found in this category" });
    }

    res.status(StatusCodes.OK).json({
      totalProducts,
      totalPages,
      currentPage,
      products,
    });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const getProductBySlug = async (req, res) => {
  try {
    const { slug } = req.params;
    const product = await Product.findOne({ slug })
      .populate("discount")
      .populate("reviews")
      .lean();

    if (!product) {
      throw new CustomError.BadRequestError(`No product with slug ${slug}`);
    }

    console.log(product);

    res.status(StatusCodes.OK).json({ product });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: error.message || "Something went wrong!",
    });
  }
};



const getSingleProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findById(productId)
    .populate("discount")
    .populate("reviews")
    .lean();

  if (!product) {
    throw new CustomError.BadRequestError(`No product with id ${productId}`);
  }
  console.log(product);

  res.status(StatusCodes.OK).json({ product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndUpdate(productId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    throw new CustomError.BadRequestError(`No product with id ${productId}`);
  }

  res.status(StatusCodes.OK).json({ product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findByIdAndDelete(productId);

  if (!product) {
    throw new CustomError.BadRequestError(`No product with id ${productId}`);
  }

  res.status(StatusCodes.OK).json({ msg: "Product successfully removed" });
};

const uploadImage = async (req, res) => {
  if (!req.files || !req.files.images || req.files.images.length === 0) {
    throw new CustomError.BadRequestError("No images uploaded");
  }

  const uploadedImages = [];
  const images = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

  for (const image of images) {
    if (!image.mimetype.startsWith("image")) {
      throw new CustomError.BadRequestError("Please upload only valid images");
    }

    if (image.size > 5 * 1024 * 1024) {
      throw new CustomError.BadRequestError("Image must be smaller than 5MB");
    }

    const imagePath = path.join(
      __dirname,
      "../public/uploads",
      image.name
    );
    
    await image.mv(imagePath);

    uploadedImages.push(`/uploads/${image.name}`);
  }

  res.status(StatusCodes.OK).json({ images: uploadedImages });
};


module.exports = {
  createProduct,
  getAllProducts,
  getProductsByCategory,
  getProductBySlug,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
