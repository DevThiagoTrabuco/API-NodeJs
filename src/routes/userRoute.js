import { Router } from "express";
import userController from "../controllers/userController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import {validId} from "../middlewares/globalMiddlewares.js";

const userRoute = Router();

userRoute.post("/", userController.createController);

userRoute.use(authMiddleware);
userRoute.get("/", userController.findAllController);

userRoute.use(validId);
userRoute.get("/:id", userController.findByIdController);
userRoute.patch("/:id", userController.updateController);

export default userRoute;
