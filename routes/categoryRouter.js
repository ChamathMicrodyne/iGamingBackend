import express from 'express';
import { deleteCategoryitem, getCategoryitem, saveCategoryitem, updateCategoryitem } from '../controllers/categoryitemController.js';

const categoryitemRouter = express.Router();

categoryitemRouter.post("/", saveCategoryitem)
categoryitemRouter.get("/", getCategoryitem)
categoryitemRouter.delete("/:id", deleteCategoryitem)
categoryitemRouter.put("/:id", updateCategoryitem)

export default categoryitemRouter;