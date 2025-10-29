const Feedback = require("../models/feedbackModel");
const { StatusCodes } = require("http-status-codes");
const CustomError = require("../errors");

const createFeedback = async (req, res) => {
  const { name, phone, email, message } = req.body;

  if (!name || !phone || !email || !message) {
    throw new CustomError.BadRequestError("Please provide all required fields: name, phone, email, message");
  }

  const feedback = new Feedback({
    name,
    phone,
    email,
    message,
  });

  try {
    await feedback.save();
    res.status(StatusCodes.CREATED).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
  }
};

const getAllFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 }); // Sắp xếp theo thời gian tạo (mới nhất đầu tiên)
    res.status(StatusCodes.OK).json({
      total_feedbacks: feedbacks.length,
      feedbacks,
    });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
  }
};

const getSingleFeedback = async (req, res) => {
  const { id: feedbackId } = req.params;

  try {
    const feedback = await Feedback.findById(feedbackId);
    
    if (!feedback) {
      throw new CustomError.NotFoundError(`No feedback found with id ${feedbackId}`);
    }

    res.status(StatusCodes.OK).json({ feedback });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
  }
};

const updateFeedback = async (req, res) => {
  const { id: feedbackId } = req.params;

  try {
    const feedback = await Feedback.findByIdAndUpdate(feedbackId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!feedback) {
      throw new CustomError.NotFoundError(`No feedback found with id ${feedbackId}`);
    }

    res.status(StatusCodes.OK).json({ message: "Feedback updated successfully", feedback });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
  }
};

const deleteFeedback = async (req, res) => {
  const { id: feedbackId } = req.params;

  try {
    const feedback = await Feedback.findByIdAndDelete(feedbackId);

    if (!feedback) {
      throw new CustomError.NotFoundError(`No feedback found with id ${feedbackId}`);
    }

    res.status(StatusCodes.OK).json({ message: "Feedback successfully removed" });
  } catch (error) {
    console.error(error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Server Error" });
  }
};

module.exports = {
  createFeedback,
  getAllFeedbacks,
  getSingleFeedback,
  updateFeedback,
  deleteFeedback,
};
