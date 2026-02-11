import { ProductModel } from "../models/product.model.js";
import { UserModel } from "../../user/models/user.model.js";
import { Router } from "express";

const router = Router()
router.post('/:userId', async function createProduct(req, res){
  try {
    const {
      price,
      status,
      sellingFormat,
      qty,
      isCashEnable,
    } = req.body;

    const {userId} = req.params;


    if (!userId) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "User id is required",
      });
    }

    // ✅ Check user exists
    const user = await UserModel.findOne({ _id: userId, del: false });
    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }
    if (user.class !== 'seller') {
      return res.status(404).json({
        success: false,
        error: true,
        message: "Only Seller can create product",
      });
    }

    // ✅ Create product
    const product = await ProductModel.create({
      user: userId,
      price,
      status,
      sellingFormat,
      qty,
      isCashEnable,
    });

    return res.status(201).json({
      success: true,
      error: false,
      message: "Product created successfully",
      data: product,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
});

router.get('/', async function getAllProducts(req, res) {
  try {
    const products = await ProductModel.find({
      deletedAt: null,
      status: { $ne: "unavailable" },
    })
      .populate("user", "_id username")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      error: false,
      data: products,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
});

export default router
