/* eslint-disable node/no-unsupported-features/es-syntax */
import express from "express";
import verifyToken from '../middleware/auth'
import * as orderController from "../controllers/orderController";

const router = express.Router();
router.route("/").get(verifyToken, orderController.getAllOrders);
router
  .route("/:id")
  .post(verifyToken, orderController.createOrder)
  .get(verifyToken, orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

export default router;
