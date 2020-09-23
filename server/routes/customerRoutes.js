/* eslint-disable node/no-unsupported-features/es-syntax */
import express from "express";
import * as customerController from "../controllers/customerController";

const router = express.Router();

router.route("/").get(customerController.getAllCustomers);
router.post('/signup', customerController.createNewCustomer);
router
  .route("/:id")
  .post(customerController.createCustomer)
  .get(customerController.getCustomer)
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

export default router;
