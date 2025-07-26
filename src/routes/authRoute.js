import { Router } from "express";
import authController from "../controllers/authController.js";

const authRoute = Router();

authRoute.post('/login', authController.loginController);

export default authRoute