import mongoose from "mongoose";
const { Schema } = mongoose;

const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // Faster queries for user's order history
  },
  idempotencyKey:{
     type: String,
     required: true,
     unique: true
  },
  basket: [
    {
      product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
      qty: { type: Number, default: 1, min: 1 },
      price: { type: Number, required: true } // Product price at time of purchase
    },
  ],
  oid:{
    type: Number,
    required: true
  },
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address",
    required: true,
  },
  paymentMethod: {
    type: String,
    required: true,
    enum: ["COD", "Card", "Wallet"],
  },
  pricing: {
    itemsPrice: { type: Number, default: 0 },
    shippingPrice: { type: Number, default: 0 },
    totalPrice: { type: Number, required: true },
  },
  status: {
    type: String,
    enum: ["draft", "awaitpay", "paid", "refunded", "cancelled"],
    default: "draft",
  },
  shippingStatus: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "returned", "cancelled"],
    default: "pending",
  },
  trackingId: { type: String, default: null },
  shippingStatusChangedAt: { type: Date },
  deletedAt: { type: Date, select: false },
}, { 
  timestamps: true // Automatically manages createdAt and updatedAt
});

export const OrderModel = mongoose.model('Order', orderSchema);
