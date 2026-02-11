import { UserModel } from "../models/user.model.js";

export const patchUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, class: userClass } = req.body;

    const user = await UserModel.findOne({ _id: id, del: false });

    if (!user) {
      return res.status(404).json({
        success: false,
        error: true,
        message: "User not found",
      });
    }

    if (username) {
      user.username = username;
      user.usernameUpdatedAt = new Date();
    }

    if (userClass) {
      user.class = userClass;
    }

    await user.save();

    return res.status(200).json({
      success: true,
      error: false,
      message: "User updated successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};
