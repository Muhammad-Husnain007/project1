import { Router } from "express";
import { AddressModel } from "../models/address.model.js";
import { UserModel } from './../../user/models/user.model.js';

const router = Router()

router.post('/:userId', async function createAddress(req, res){
  try {
    const {userId} = req?.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User id is required",
      });
    }
    const {
      countryCode,
      country,
      flat,
      building,
      road,
      block,
      area,
      city,
      directions,
      fullname,
      firstname,
      lastname,
      addresstype,
      location,
    } = req.body;


    // Check user exists
    const user = await UserModel.findOne({ _id: userId, del: false });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    // ✅ Create address
    const address = await AddressModel.create({
      user: userId,
      countryCode,
      country,
      flat,
      building,
      road,
      block,
      area,
      city,
      directions,
      fullname,
      firstname,
      lastname,
      addresstype,
      location,
    });

    // Push address id into user
    await UserModel.updateOne(
      { _id: userId },
      { $push: { address: address._id } }
    );

    return res.status(201).json({
      success: true,
      error: false,
      message: "Address created and linked to user successfully",
      data: address,
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