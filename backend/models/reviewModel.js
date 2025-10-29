const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number, // Sửa từ String sang Number
      min: 1,
      max: 5,
      required: [true, "Please provide rating"],
    },

    title: {
      type: String,
      trim: true,
      required: [false, "Please provide review title"],
      maxlength: 100,
    },

    comment: {
      type: String,
      required: [true, "Please provide review text"],
    },

    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },

    username: {
      type: String,
      required: [true, "Please provide username"],
    },

    product: {
      type: mongoose.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// User can leave only one review for a product
ReviewSchema.index({ product: 1, user: 1 }, { unique: true });

// Average rating
ReviewSchema.statics.calculateAverageRating = async function (productId) {
  const result = await this.aggregate([
    { $match: { product: productId } },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$rating" }, // `$avg` sẽ hoạt động đúng với Number
        numOfReviews: { $sum: 1 },
      },
    },
  ]);

  try {
    await this.model("Product").findOneAndUpdate(
      { _id: productId },
      {
        averageRating: parseFloat(result[0]?.averageRating?.toFixed(1) || 0),
        numOfReviews: result[0]?.numOfReviews || 0,
      }
    );
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

ReviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});
ReviewSchema.post("remove", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

module.exports = mongoose.model("Review", ReviewSchema);
