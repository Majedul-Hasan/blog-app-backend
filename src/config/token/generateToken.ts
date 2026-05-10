import config from "@conf/env.const";
import jwt from "jsonwebtoken"

const generateToken = (id: string) => {
  return jwt.sign({ id }, config.jwt.jwt_secret , { expiresIn: "20d" });
};

export default generateToken;
