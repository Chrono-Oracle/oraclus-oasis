const userService = require("../services/user.service");
const { hashPassword, comparePassword } = require("../../utils/lib/bcrypt.lib");
const User = require("../models/User");
const { sign } = require("../../utils/lib/jwt.lib");

const register = async (req, res) => {
  try {
    const data = req.body;
    const email = data.email.toLowerCase();
    const find = await User.findOne({ email });
    if (find) {
      return res.status(404).json({
        message: "Email already exists !!!",
      });
    }

    const password = await hashPassword(data.password);

    // await User.create({ ...data, password });

    const newUser = await userService.create({ ...data, password });
    // console.log("New User Created: ", newUser);

    return res.status(201).json({
      message: "User registered successfully!!!",
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      message: "Internal Server Error, please retry later !!!",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email.toLowerCase() }).select(
      "_id password role",
    );

    const result = await userService.login({ email, password });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    const verify = await comparePassword(password, user.password);
    if (!verify) {
      return res.status(400).json({
        message: "Incorrect Password",
      });
    }

    if (verify) {
      const token = sign({ id: user._id, role: user.role, email: user.email });

      console.log("role:", user.role);

      return res.json({
        message: "User login successfully !!!",
        data: { token, id: user._id, role: user.role },
      });
    }

    return res.status(400).json({
      message: "Invalid credentials !!!",
    });
  } catch (error) {
    console.log("Error: ", error);
    return res.status(500).json({
      message: "Internal Server Error, please retry later !!!",
    });
  }
};

const findMany = async (req, res) => {
  const result = await userService.find({});
  if (result.error) {
    return res.status(400).json({
      message: result.error,
    });
  }

  return res.status(200).json({
    message: "Users fetched successfully!!!",
    data: result.data,
  });
};

const update = async (req, res) => {
  const result = await userService.update(req.params.id, req.body);
  if (result.error) {
    return res.status(400).json({
      message: result.error,
    });
  }

  return res.status(201).json({
    message: "User updated successfully!!!",
  });
};

module.exports = { register, findMany, update, login };
