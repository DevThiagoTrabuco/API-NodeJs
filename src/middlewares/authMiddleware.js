import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import userService from "../services/userService.js";

dotenv.config();

export const authMiddleware = (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const parts = authorization.split(" ");
    const [scheme, token] = parts;

    if (!authorization || scheme !== "Bearer" || parts.length !==2){
        return res.status(401).send({ message: "Não autorizado" });
    }

    jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "TOKEN inválido" });
      }

      const user = await userService.findByIdService(decoded.id);
      if (!user || !user.id) {
        return res.status(401).send({ message: "TOKEN inválido" });
      }

      req.userId = user._id;
      return next();
    });
  } catch (err) {
    res.status(500).send({ message: err.message });
  }
};
