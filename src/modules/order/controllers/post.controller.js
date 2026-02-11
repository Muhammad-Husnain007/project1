import { OrderModel } from "../models/order.model.js";
import { AddressModel } from "../../address/models/address.model.js";
import { Router } from "express";
import { ProductModel } from "./../../product/models/product.model.js";
import mongoose from "mongoose";

const router = Router();

router.post("/:userId", async function createOrder(req, res) {
  try {
    const { basket, shippingAddress, paymentMethod, pricing } = req.body;
    const { userId } = req.params;

    if (!userId || !basket?.length || !shippingAddress || !paymentMethod) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Missing required fields",
      });
    }

    //  check address
    // const address = await AddressModel.findOne({
    //   _id: shippingAddress,
    //   // userId: user,
    //   del: false,
    // });

    // if (!address) {
    //   return res.status(404).json({
    //     success: false,
    //     error: true,
    //     message: "Shipping address not found",
    //   });
    // }
//  Use for qty update with also create order both work not one
    const session = await mongoose.startSession();
session.startTransaction();

    for (const item of basket) {
      const product = await ProductModel.findOneAndUpdate(
        {
          _id: item.product,
          qty: { $gte: item.qty },
        },
        {
          $inc: { qty: -item.qty, qtySold: item.qty },
        },
       { session, new: true } 
      );

      if (!product) {
        return res.status(400).json({
        message:  (`Product out of stock: ${item.product}`) 
        })
      }
    }
  //  throw new Error("CRASH! Database connection lost while saving order"); for error
    const oid = Math.floor(100000 + Math.random() * 900000);

    const order = await OrderModel.create({
      user: userId,
      basket,
      oid,
      shippingAddress,
      paymentMethod,
      pricing,
      status: "draft",
      shippingStatus: "pending",
    }, { session });

    await session.commitTransaction();

    return res.status(201).json({
      success: true,
      error: false,
      message: "Order created successfully",
      data: order,
    });
  } catch (error) {
    await session.abortTransaction();
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
});

router.get("/", async function getAllOrders(req, res) {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User id is required",
      });
    }

    const orders = await OrderModel.find({
      user: userId,
      deletedAt: { $exists: false },
    })
      .populate("basket.product", "price status")
      .populate("shippingAddress")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      error: false,
      data: orders,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
});

export default router;
