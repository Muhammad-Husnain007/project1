// import { OrderModel } from "../models/order.model.js";
// const router = Router()
// // router.get('/:userId',getAllOrders = async (req, res) => {
// //   try {
// //     const userId = req.params;

// //     if (!userId) {
// //       return res.status(400).json({
// //         success: false,
// //         error: true,
// //         message: "User id is required",
// //       });
// //     }

// //     const orders = await OrderModel.find({
// //       user: userId,
// //       deletedAt: { $exists: false },
// //     })
// //       .populate("basket.product", "price status")
// //       .populate("shippingAddress")
// //       .sort({ createdAt: -1 });

// //     return res.status(200).json({
// //       success: true,
// //       error: false,
// //       data: orders,
// //     });

// //   } catch (error) {
// //     return res.status(500).json({
// //       success: false,
// //       error: true,
// //       message: error.message,
// //     });
// //   }
// // });
