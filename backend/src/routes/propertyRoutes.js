import express, { Router } from "express";
import { getProperties, getProperty } from "../controllers/propertyController.js";

const propertyRouter = Router();

propertyRouter.route("/").get(getProperties);
propertyRouter.route("/:id").get(getProperty);

export default propertyRouter;
