import { UserModel } from "../models/user.model.js";

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find({ del: false })
      .select("_id username class createdAt").limit(20);

    return res.status(200).json({
      success: true,
      error: false,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
