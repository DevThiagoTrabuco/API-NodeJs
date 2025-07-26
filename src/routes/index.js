import { Router } from "express";
import userRoute from "./userRoute.js";
import newsRoute from "./newsRoute.js";
import authRoute from "./authRoute.js";
import swaggerRoute from "./swaggerRoute.js";

const router = Router()

router.use("/user", userRoute);
router.use("/news", newsRoute);
router.use("/auth", authRoute);
router.use("/doc", swaggerRoute);

export default router;