const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please Enter Product Name"],
      trim: true,
    },
    desc: {
      type: String,
      required: [true, "Please Enter Product Description"],
    },
    img: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    categories: {
      type: String,
      required: [true, "Please Enter Product Category"],
    },
    price: {
      type: Number,
      required: [true, "Please Enter Product Price"],
      maxlength: [8, "Price cannot exceed 8 figures"],
    },
    inStock: {
      type: Number,
      required: [true, "Please Enter Product Stock"],
      maxlength: [13, "Stock cannot exceed"],
      default: 1,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numofReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
        user: {
          type: mongoose.Schema.ObjectId,
          ref: "User",
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
        rating: {
          type: String,
          required: true,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", ProductSchema);
