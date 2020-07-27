import express from "express";
import * as productController from "../controllers/productController";

const router = express.Router();

router
  .route("/")
  .post(productController.createProduct)
  .get(productController.getAllProducts);

router
  .route("/:id")
  .get(productController.getProduct)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
