import express from "express";
import * as customerController from "../controllers/customerController";

const router = express.Router();

router
  .route("/")
  .post(customerController.createCustomer)
  .get(customerController.getAllCustomers);

export default router;
