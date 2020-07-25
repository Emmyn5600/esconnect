import express from "express";
import * as customerController from "../controllers/customerController";

const router = express.Router();

router
  .route("/:id")
  .post(customerController.createCustomer)
  .get(customerController.getCustomer);

export default router;
