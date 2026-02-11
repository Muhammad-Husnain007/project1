import { UserModel } from "../models/user.model.js";

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findOne({ _id: id, del: false });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    user.del = true;
    user.deletedAt = new Date();
    await user.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "User deleted successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
