const Warranty = require('../models/warrantyModel');
const { StatusCodes } = require('http-status-codes');
const Order = require("../models/orderModel"); 

const createWarranty = async (req, res) => {
  const { name, description, warrantyType, duration, durationUnit, coverage, terms } = req.body;

  try {
    const newWarranty = await Warranty.create({
      name,
      description,
      warrantyType,
      duration,
      durationUnit,
      coverage,
      terms,
    });

    res.status(StatusCodes.CREATED).json({ warranty: newWarranty });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

const getAllWarranties = async (req, res) => {
  try {
    const warranties = await Warranty.find();
    res.status(StatusCodes.OK).json({ total_warranties: warranties.length, warranties });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

const getWarrantyById = async (req, res) => {
  const {  id: warrantyId } = req.params;

  try {
    const warranty = await Warranty.findById(warrantyId);

    if (!warranty) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Warranty not found' });
    }

    res.status(StatusCodes.OK).json({ warranty });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

const updateWarranty = async (req, res) => {
  const {  id:warrantyId } = req.params;
  const { name, description, warrantyType, duration, durationUnit, coverage, terms } = req.body;

  try {
    const updatedWarranty = await Warranty.findByIdAndUpdate(
      warrantyId,
      { name, description, warrantyType, duration, durationUnit, coverage, terms },
      { new: true }
    );

    if (!updatedWarranty) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Warranty not found' });
    }

    res.status(StatusCodes.OK).json({ warranty: updatedWarranty });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

const deleteWarranty = async (req, res) => {
  const { id:warrantyId } = req.params;

  try {
    const deletedWarranty = await Warranty.findByIdAndDelete(warrantyId);

    if (!deletedWarranty) {
      return res.status(StatusCodes.NOT_FOUND).json({ message: 'Warranty not found' });
    }

    res.status(StatusCodes.NO_CONTENT).json({ message: 'Warranty deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'Server Error' });
  }
};

const getWarrantyDates = async (req, res) => { 
  try {
    const { codeWarranty } = req.params;

    if (!codeWarranty) {
      return res.status(400).json({ message: "Code warranty is required" });
    }

    const order = await Order.findOne({
      "products.codeWarranty": codeWarranty,
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    const productWithWarranty = order.products.find((product) => 
      product.codeWarranty === codeWarranty
    );

    if (!productWithWarranty || !productWithWarranty.datesWarranty) {
      return res.status(404).json({ message: "Warranty information not found" });
    }

    const warrantyDetails = await Promise.all(
      productWithWarranty.datesWarranty.map(async (warranty) => {
        const detailedWarranty = await Warranty.findById(warranty.idWarranty);

        if (!detailedWarranty) {
          return { ...warranty, error: 'Warranty details not found' };
        }

        return {
          idWarranty: warranty.idWarranty,
          name: detailedWarranty.name,
          duration: detailedWarranty.duration,
          durationUnit: detailedWarranty.durationUnit,
          warrantyEndDate: warranty.endDate,
        };
      })
    );

    return res.status(200).json({
      datesWarranty: warrantyDetails,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = {
  createWarranty,
  getAllWarranties,
  getWarrantyById,
  updateWarranty,
  deleteWarranty,
  getWarrantyDates
};
