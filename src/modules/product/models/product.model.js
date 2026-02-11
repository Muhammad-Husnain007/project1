import mongoose from "mongoose";
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true, // Faster queries for user's order history
    },
    price: {
      currencyCode: { type: String, default: "" },
      amount: { type: Number, default: 0 },
      usdPrice: {
        type: Number,
        default: 0,
      },
    },
    status: {
      // cancelled -> unavailable?,
      // new -> waiting? -> draft
      type: String,
      enum: [
        "draft",
        "reserved",
        "waiting",
        "available",
        "sold",
        "unavailable",
        "awaiting",
      ],
      default: "available",
    },
    views: {
      type: Number,
      default: 0,
    },
    sellingFormat: {
      type: String,
      enum: ["buynow", "negotiable"],
      default: "buynow",
    },
    qty: {
      type: Number,
      default: 0,
    },

    qtySold: {
      type: Number,
      default: 0,
      select: false,
    },
    isCashEnable: {
      type: Boolean,
      default: null,
    },

    deletedAt: { type: Date, default: null, select: false },
  },
  {
    timestamps: true, // Automatically manages createdAt and updatedAt
  },
);

export const ProductModel = mongoose.model("Product", productSchema);
