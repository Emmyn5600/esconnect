/* eslint-disable node/no-unsupported-features/es-syntax */
import express from "express";
import * as productController from "../controllers/productController";
import verifyToken from '../middleware/auth'
import multer from '../middleware/multer';

const router = express.Router();

router
  .route("/")
  .post(verifyToken, multer.array('image'), productController.createProduct)
  .get(productController.getAllProducts);

router
  .route("/:id")
  .get(productController.getProduct)
  .post(verifyToken, productController.addProductInStock)
  .patch(productController.updateProduct)
  .delete(productController.deleteProduct);

export default router;
