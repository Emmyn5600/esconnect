import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

router.route("/").post(productController.createProduct);

export default router;
