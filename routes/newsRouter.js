import express from 'express';
import { deleteNews, getNews, saveNews, updateNews, getNewsById } from '../controllers/newsController.js';

const newsRouter = express.Router();

newsRouter.post("/", saveNews)
newsRouter.get("/", getNews)
newsRouter.get("/:id", getNewsById)

newsRouter.delete("/:id", deleteNews)
newsRouter.put("/:id", updateNews)

export default newsRouter;