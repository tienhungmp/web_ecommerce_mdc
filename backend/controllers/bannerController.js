const Banner = require("../models/bannerModel");
const fs = require("fs");
const path = require("path");
const CustomError = require("../errors");

const createBanner = async (req, res) => {
  try {
    const { title, imageUrl, code, isActive } = req.body;
    const newBanner = await Banner.create({ title, imageUrl, code, isActive });
    return res.status(201).json({ success: true, data: newBanner });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

const getAllBanners = async (req, res) => {
  try {
    const banners = await Banner.find();
    return res.status(200).json({ success: true, data: banners });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getBannerById = async (req, res) => {
  try {
    const { id } = req.params;
    const banner = await Banner.findById(id);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }
    return res.status(200).json({ success: true, data: banner });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const updateBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    const updatedBanner = await Banner.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!updatedBanner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }
    return res.status(200).json({ success: true, data: updatedBanner });
  } catch (error) {
    return res.status(400).json({ success: false, error: error.message });
  }
};

const deleteBanner = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBanner = await Banner.findByIdAndDelete(id);
    if (!deletedBanner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Banner deleted successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const getBannersByCodes = async (req, res) => {
  const { code } = req.params;

  if (!code) {
    return res.status(400).json({ message: "Please provide a banner code." });
  }

  try {
    const banners = await Banner.find({ code });

    if (banners.length === 0) {
      return res
        .status(404)
        .json({ message: "No banners found for the provided code." });
    }

    return res.status(200).json({ data: banners });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "An error occurred while fetching banners." });
  }
};

const uploadImageBanner = async (req, res) => {
  if (!req.files || !req.files.images || req.files.images.length === 0) {
    throw new CustomError.BadRequestError("No images uploaded");
  }

  const uploadedImages = [];
  const images = Array.isArray(req.files.images)
    ? req.files.images
    : [req.files.images];

  const uploadDir = path.join(__dirname, "../public/uploads/banner");

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  for (const image of images) {
    if (!image.mimetype.startsWith("image")) {
      throw new CustomError.BadRequestError("Please upload only valid images");
    }

    if (image.size > 5 * 1024 * 1024) {
      throw new CustomError.BadRequestError("Image must be smaller than 5MB");
    }

    const imagePath = path.join(uploadDir, image.name);

    await image.mv(imagePath);

    uploadedImages.push(`/uploads/banner/${image.name}`);
  }

  return res.status(200).json({
    success: true,
    message: "Images uploaded successfully",
    data: uploadedImages,
  });
};

module.exports = {
  createBanner,
  getAllBanners,
  getBannerById,
  updateBanner,
  deleteBanner,
  getBannersByCodes,
  uploadImageBanner,
};
