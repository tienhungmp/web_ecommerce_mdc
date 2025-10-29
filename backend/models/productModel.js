const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide product name"],
      trim: true,
      maxlength: [100, "Name cannot be more than 100 characters"],
      unique: true,
    },
    price: {
      type: Number,
      required: [true, "Please provide price"],
      default: 0,
    },
    saleprice: {
      type: Number,
      required: false,
      default: 0,
    },
    inventory: {
      type: Number,
      required: true,
      default: 15,
    },
    slug: {
      type: String,
      required: true,
    },
    sold: {
      type: Number,
      required: true,
      default: 0,
    },
    description: {
      type: String,
      required: [false, "Please provide description"],
    },
    avatar: {
      type: [String],
      default: ["/uploads/example.jpeg"],
    },
    images: {
      type: [String],
      default: ["/uploads/example.jpeg"],
    },
    mainCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Please provide main category"],
    },
    tags: {
      type: [String],
      default: [],
      enum: [
        "flashsale",
        "outstanding",
        "promotion",
        "new",
        "featured",
        "freeShipping",
      ],
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    company: {
      type: String,
      enum: {
        values: [
          "Xiaomi",
          "Ecovacs",
          "Tineco",
          "Xiaomi-Redmi",
          "Lumias",
          "KingSmith",
          "Khác",
        ],
        message: "{VALUE} is not supported",
      },
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    discount: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Discount",
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    variants: {
      type: [
        {
          options: [
            {
              name: { type: String, required: true },
              value: { type: String, required: true },
            },
          ],
        },
      ],
    },
    warranties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Warranty",
        default: [],
      },
    ],
    warrantiesDescriptions: { type: String },
    colors: {
      type: [String],
      default: ["#000000"],
    },
    specifications: {
      type: String,
    },
  },
  { timestamps: true }
);

ProductSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

ProductSchema.pre("remove", async function (next) {
  await this.model("Review").deleteMany({ product: this._id });
});

module.exports = mongoose.model("Product", ProductSchema);
