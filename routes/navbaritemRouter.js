import express from 'express';
import { deleteNavbaritem, getNavbaritem, saveNavbaritem, updateNavbaritem } from '../controllers/navbaritemController.js';

const navbaritemRouter = express.Router();

navbaritemRouter.post("/", saveNavbaritem)
navbaritemRouter.get("/", getNavbaritem)
navbaritemRouter.delete("/:id", deleteNavbaritem)
navbaritemRouter.put("/:id", updateNavbaritem)

export default navbaritemRouter;