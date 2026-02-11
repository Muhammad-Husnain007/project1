import { UserModel } from "../models/user.model.js";

const createUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "Username and password are required",
      });
    }

    const alreadyExist = await UserModel.findOne({ username });

    if (alreadyExist) {
      return res.status(400).json({
        success: false,
        error: true,
        message: "This username already exists",
      });
    }

    const user = await UserModel.create({
      username,
      password,
      ip: req?.ip,
      class: req.body?.class || "user", // default
      firstLoginAt: new Date(),
      lastActive: new Date(),
    });

    return res.status(201).json({
      success: true,
      data:user,
      message: "User created successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      error: true,
      message: error.message,
    });
  }
};

export default createUser;
