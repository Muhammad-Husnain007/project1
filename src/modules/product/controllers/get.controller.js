// import { Router } from "express";
// import { ProductModel } from "../models/product.model";
// // const router = Router()
// router.get('/:userId', async function getAllProducts(req, res) {
//   try {
//     const products = await ProductModel.find({
//       deletedAt: null,
//       status: { $ne: "unavailable" },
//     })
//       .populate("user", "_id username")
//       .sort({ createdAt: -1 });

//     return res.status(200).json({
//       success: true,
//       error: false,
//       data: products,
//     });

//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       error: true,
//       message: error.message,
//     });
//   }
// });
