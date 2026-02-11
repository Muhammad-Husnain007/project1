import mongoose from "mongoose";
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      default: "",
      index: true
    },
    usernameUpdatedAt: {
      type: Date,
      default: null,
    },

    password: {
      type: String,
      default: null,
      select: false, // Don't select password by default for security
    },

    class: {
      type: String,
      enum: ["lurker", "user", "seller", "admin", "driver"],
      default: "user",
    },
    ip: {
      type: String,
      default: null,
    },
    verified: { type: Boolean, default: true },

    address: {
      type: Schema.Types.ObjectId,
      ref: "Address",
      select: false,
    },
    del: {
      type: Boolean,
      default: false,
    },
   
    live: { type: Number, default: 0 },
    online: { type: Number, default: 0 },
    lastActive: { type: Date, default: null },
    firstLoginAt: { type: Date, default: null },
    deletedAt: { type: Date, default: null },
  },
  {
    timestamps: true,
  },
);

export const UserModel = mongoose.model("User", userSchema);
