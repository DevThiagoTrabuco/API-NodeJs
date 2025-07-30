import { Router } from "express";
import newsController from "../controllers/newsController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validId } from "../middlewares/globalMiddlewares.js";

const newsRoute = Router();

newsRoute.get("/", newsController.findAllController);
newsRoute.get("/last", newsController.findLastController);
newsRoute.get("/search", newsController.searchByTitleController);

newsRoute.use(authMiddleware);
newsRoute.post("/", newsController.createController);

newsRoute.use(validId);
newsRoute.get("/searchByUser", newsController.searchByUserController);
newsRoute.get("/findById/:id", newsController.findByIdController);
newsRoute.patch("/update/:id", newsController.updateController);
newsRoute.delete("/delete/:id", newsController.eraseController);
newsRoute.patch("/like/:id", newsController.likeController);
newsRoute.patch("/comment/:id", newsController.addCommentController);
newsRoute.patch(
  "/comment/:idNews/:idComment",
  newsController.removeCommentController
);

export default newsRoute;
