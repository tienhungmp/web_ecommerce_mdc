const mongoose = require('mongoose');

const BannerSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: false,
    },
    imageUrl: {
      type: String,
      required: [true, "Please provide banner image URL"],
    },
    code: {
      type: String,
      required: [true, "Please provide banner code"],
    },
    isActive: {
      type: Boolean,
      default: true,
    }
  },
  { timestamps: true }
);

BannerSchema.set('toObject', { virtuals: true });
BannerSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Banner', BannerSchema);
