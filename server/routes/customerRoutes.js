import express from "express";
import * as customerController from "../controllers/customerController";

const router = express.Router();

router.route("/").get(customerController.getAllCustomers);
router
  .route("/:id")
  .post(customerController.createCustomer)
  .get(customerController.getCustomer)
  .patch(customerController.updateCustomer)
  .delete(customerController.deleteCustomer);

export default router;
