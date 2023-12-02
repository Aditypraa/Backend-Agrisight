import jwt from "jsonwebtoken";
import userModel from "../Models/User.js";

var checkUserAuth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get Token From Header
      token = authorization.split(" ")[1];

      // Verify Token
      const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY);
      //   console.log(userId);

      // Get User From Token
      req.user = await userModel.findById(userId).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401).send({ status: "Failed", message: "Unauthorized User" });
    }
  }
  if (!token) {
    res
      .status(401)
      .send({ status: "Failed", message: "Unauthorized User, No token" });
  }
};

export default checkUserAuth;
