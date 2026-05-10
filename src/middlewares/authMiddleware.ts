import expressAsyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../model/user/User.js"
import config from "@conf/env.const.js";

const authMiddleWare = expressAsyncHandler(async (req, res, next) => {
  let token;

  if (req?.headers?.authorization?.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (token) {
        const decoded: any = jwt.verify(token, config.jwt.jwt_secret);
        //   find the user by id

        const user = await User.findById(decoded?.id).select("-password");
        //   attach the user to the request object
        req.user = user;
        next();
      }
    } catch (error) {
      throw new Error("Not authorized token expired, login again");
    }
  } else {
    throw new Error("There is no token attach to the header");

  }
});

export default authMiddleWare;
