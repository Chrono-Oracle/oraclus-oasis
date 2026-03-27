const User = require("../models/User");
const BaseService = require("./base.service");
const { sign } = require("../../utils/lib/jwt.lib");

class UserService extends BaseService {
  constructor() {
    super(User);
  }

  async login(data) {
    try {
      console.log("Data: ", data);
      if (!data.email || !data.password) {
        return {
          error: true,
          message: "Email and password are required",
        };
      }

      const user = await this.model.findOne({ email: data.email });
      console.log("User: ", user);

      if (!user) {
        return {
          error: true,
          message: "User not found",
        };
      }

      // const isPasswordValid = await comparePassword(data.password, user.password);
      const isPasswordValid = data.password === user.password;

      if (!isPasswordValid) {
        return {
          error: true,
          message: "Invalid password",
        };
      }

      const token = sign({ id: user._id, email: user.email });
      return {
        error: false,
        data: {
          user,
          token,
        },
        message: "Login successful",
      };
    } catch (error) {
      console.log("error: ", error);

      return {
        error: true,
        message: error.message || "Login failed, try again later",
      };
    }
  }
}

const userService = new UserService();
module.exports = userService;
