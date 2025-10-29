const Discount = require("../models/discountModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createDiscount = async (req, res) => {
  const { name, discountType, value, validFrom, validUntil, description, isActive } =
    req.body;

  // Check if a discount with the same name already exists (optional but recommended)
  const existingDiscount = await Discount.findOne({ name });
  if (existingDiscount) {
    throw new CustomError.BadRequestError(
      `A discount with the name ${name} already exists`
    );
  }

  const discount = await Discount.create({
    name,
    discountType,
    value,
    validFrom,
    validUntil,
    description,
    isActive,
  });

  res.status(StatusCodes.CREATED).json({ discount });
};

const getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find();
    res.status(StatusCodes.OK).json({ discounts });
  } catch (error) {
    console.error(error);
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: "Server Error" });
  }
};

const getSingleDiscount = async (req, res) => {
  const { id: discountId } = req.params;

  const discount = await Discount.findById(discountId);
  if (!discount) {
    throw new CustomError.BadRequestError(
      `No discount found with id ${discountId}`
    );
  }

  res.status(StatusCodes.OK).json({ discount });
};

const getDiscountByName = async (req, res) => {
  const { name } = req.body; // Get the discount name from the request body

  if (!name) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      message: "Discount name is required",
    });
  }

  try {
    const discount = await Discount.findOne({ name: name });
    if (!discount) {
      return res.status(StatusCodes.NOT_FOUND).json({
        message: `No discount found with name ${name}`,
      });
    }

    res.status(StatusCodes.OK).json({ discount });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
  }
};

const updateDiscount = async (req, res) => {
  const { id: discountId } = req.params;

  const discount = await Discount.findByIdAndUpdate(discountId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!discount) {
    throw new CustomError.BadRequestError(
      `No discount found with id ${discountId}`
    );
  }

  res.status(StatusCodes.OK).json({ discount });
};

const deleteDiscount = async (req, res) => {
  const { id: discountId } = req.params;

  const discount = await Discount.findByIdAndDelete(discountId);
  if (!discount) {
    throw new CustomError.BadRequestError(
      `No discount found with id ${discountId}`
    );
  }

  res.status(StatusCodes.OK).json({ message: "Discount successfully removed" });
};

module.exports = {
  createDiscount,
  getAllDiscounts,
  getSingleDiscount,
  updateDiscount,
  deleteDiscount,
  getDiscountByName
};
