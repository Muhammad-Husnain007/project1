import mongoose from "mongoose";
const { Schema } = mongoose;

const addressSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
    index: true, // Faster queries for user's order history
  },

  countryCode: { type: String, default: '' },
  country: { type: String, default: '' },
  flat: { type: String, default: '', trim: true },
  building: { type: String, default: '', trim: true },
  road: { type: String, default: '', trim: true },
  block: { type: String, default: '', trim: true },
  area: { type: String, default: '', trim: true },
  city: { type: String, default: '', trim: true },
  directions: { type: String, default: '', trim: true },
  fulladdress: { type: String, default: '', trim: true },
  fullname: { type: String, default: '', trim: true },
  firstname: { type: String, default: '', trim: true },
  lastname: { type: String, default: '', trim: true },
  addresstype: { type: String, default: 'Home', enum: ['Home', 'Office'] },
 location: {
    type: { type: String, default: 'Point', enum: ['Point'] },
    coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
  },
   locationIndex: {
    type: { type: String, default: 'Point', enum: ['Point'] },
    coordinates: { type: [Number], default: [0, 0] }, // [longitude, latitude]
  },

  // soft delete
  del: {
    type: Boolean, default: false, select: false,
  },

  active: {
    type: Boolean, default: false,
  },
  
  deletedAt: { type: Date, default: null, select: false },
}, { 
  timestamps: true // Automatically manages createdAt and updatedAt
});

export const AddressModel = mongoose.model('Address', addressSchema);

