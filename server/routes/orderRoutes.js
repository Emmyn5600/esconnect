import express from "express";
import * as orderController from "../controllers/orderController";

const router = express.Router();
router.route("/").get(orderController.getAllOrders);
router
  .route("/:id")
  .get(orderController.getOrder)
  .patch(orderController.updateOrder)
  .delete(orderController.deleteOrder);

export default router;
