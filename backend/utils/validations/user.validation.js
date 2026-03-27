const { z } = require("zod");
const Validation = require("./index");

const userValidation = (req, res, next) => {
  const schema = z.object({
    username: z.string().min(4).max(50),
    email: z.email().trim().toLowerCase(),
    password: z.string().min(6).max(100),
    role: z.enum(["reader", "author", "admin"]).default("reader"),
  });

  const valid = Validation(schema, req.body);
  if (valid.isValid) {
    req.body = valid.data;
    next();
  } else {
    return res.status(400).json(valid.error);
  }
};

module.exports = { userValidation };
