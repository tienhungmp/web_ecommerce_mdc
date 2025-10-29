const Category = require('../models/categoryModel');
const CustomError = require('../errors');
const { StatusCodes } = require('http-status-codes');

// ** =================== CREATE CATEGORY ===================
const createCategory = async (req, res) => {
  const { name, description, parentCategory } = req.body;

  const categoryExists = await Category.findOne({ name });
  if (categoryExists) {
    throw new CustomError.BadRequestError('Category already exists');
  }

  const category = await Category.create({ name, description, parentCategory });
  res.status(StatusCodes.CREATED).json({ category });
};

// ** =================== GET ALL CATEGORIES ===================
const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({}).populate('parentCategory').lean();
    res.status(StatusCodes.OK).json({ total_categories: categories.length, categories });
  } catch (error) {
    console.log(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Error fetching categories' });
  }
};

// ** =================== GET SINGLE CATEGORY WITH SUBCATEGORIES ===================
const getCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id).populate('parentCategory').lean();
  if (!category) {
    throw new CustomError.NotFoundError(`No category found with id: ${id}`);
  }

  const subCategories = await Category.find({ parentCategory: category._id }).lean();

  res.status(StatusCodes.OK).json({ category, subCategories });
};

// ** =================== UPDATE CATEGORY ===================
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name, description, parentCategory } = req.body;

  const category = await Category.findById(id);
  if (!category) {
    throw new CustomError.NotFoundError(`No category found with id: ${id}`);
  }

  if (name && name !== category.name) {
    const categoryExists = await Category.findOne({ name });
    if (categoryExists) {
      throw new CustomError.BadRequestError('Category with this name already exists');
    }
  }

  category.name = name || category.name;
  category.description = description || category.description;
  category.parentCategory = parentCategory || category.parentCategory;

  await category.save();
  res.status(StatusCodes.OK).json({ category });
};

// ** =================== DELETE CATEGORY ===================
const deleteCategory = async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);
  if (!category) {
    throw new CustomError.NotFoundError(`No category found with id: ${id}`);
  }

  const childCategories = await Category.find({ parentCategory: category._id });
  if (childCategories.length > 0) {
    throw new CustomError.BadRequestError('Cannot delete category with subcategories');
  }

  await category.remove();
  res.status(StatusCodes.OK).json({ message: `Category with id: ${id} deleted successfully` });
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  deleteCategory,
};
