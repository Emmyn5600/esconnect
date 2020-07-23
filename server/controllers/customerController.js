import Customer from "../models/customerModel";
import catchAsyncErr from "../utils/catchAsyncErr";
import AppError from "../utils/appError";

export const createCustomer = catchAsyncErr(async (req, res, next) => {
  const newCustomer = await Customer.create(req.body);
  res.status(201).json({
    status: "success",
    message: "customer created successfully",
    data: {
      newCustomer,
    },
  });
});

export const getAllCustomers = catchAsyncErr(async (req, res, next) => {
  const customers = await Customer.find();
  res.status(200).json({
    status: "success",
    data: {
      customers,
    },
  });
});
