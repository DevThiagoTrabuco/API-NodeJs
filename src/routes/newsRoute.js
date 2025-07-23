import { Router } from "express";
import { create, findAll, findLast, findById, searchByTitle, searchByUser, update ,erase, like, addComment, removeComment } from "../controllers/newsController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const newsRoute = Router();

newsRoute.post('/', authMiddleware, create);
newsRoute.get('/', findAll);
newsRoute.get('/last', findLast);
newsRoute.get('/search', searchByTitle);
newsRoute.get('/searchByUser', authMiddleware, searchByUser);
newsRoute.get('/:id', authMiddleware, findById);
newsRoute.patch('/:id', authMiddleware, update);
newsRoute.delete('/:id', authMiddleware, erase);
newsRoute.patch('/like/:id', authMiddleware, like);
newsRoute.patch('/comment/:id', authMiddleware, addComment);
newsRoute.patch('/comment/:idNews/:idComment', authMiddleware, removeComment);

export default newsRoute;