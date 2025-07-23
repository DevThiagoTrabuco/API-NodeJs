import { Router } from "express";
import {create, findAll, findById, update} from "../controllers/userController.js";
import globalMiddlewares from "../middlewares/globalMiddlewares.js";

const userRoute = Router();

userRoute.post("/", create);
userRoute.get("/", findAll);
userRoute.get("/:id", globalMiddlewares.validId, globalMiddlewares.validUser, findById);
userRoute.patch("/:id", globalMiddlewares.validId, globalMiddlewares.validUser, update);

export default userRoute;
