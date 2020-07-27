import Customer from "../models/customerModel";
import Order from "../models/orderModel";
import Product from "../models/productModel";
import catchAsyncErr from "../utils/catchAsyncErr";
import AppError from "../utils/appError";

export const createCustomer = catchAsyncErr(async (req, res, next) => {
  let {
    firstName,
    lastName,
    email,
    city,
    country,
    zipcode,
    telephone,
    productSize,
    productColor,
    paymentMethod,
    shippingMethod,
    shippingAddress,
  } = req.body;
  const newCustomer = await Customer.create({
    firstName,
    lastName,
    email,
    city,
    country,
    zipcode,
    telephone,
  });

  const customer = newCustomer._id;
  const good = await Product.findById(req.params.id);
  const product = good._id;
  const price = good.price;
  const order = await Order.create({
    product,
    customer,
    price,
    productSize,
    productColor,
    paymentMethod,
    shippingMethod,
    shippingAddress,
  });

  res.status(201).json({
    status: "success",
    message: "Order created successfully",
    data: {
      newCustomer,
    },
    order: {
      order,
    },
  });
});

export const getCustomer = catchAsyncErr(async (req, res, next) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return next(new AppError(404, "No customer found with that ID"));
  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
});

export const getAllCustomers = catchAsyncErr(async (req, res, next) => {
  const customers = await Customer.find();
  res.status(200).json({
    status: "success",
    results: customers.length,
    data: {
      customers,
    },
  });
});

export const updateCustomer = catchAsyncErr(async (req, res, next) => {
  const customer = await Customer.findByIdAndUpdate(req.params.id, {
    new: true,
    runValidators: true,
  });
  if (!customer)
    return next(new AppError(404, "No customer found with that ID"));
  res.status(200).json({
    status: "success",
    data: {
      customer,
    },
  });
});

export const deleteCustomer = catchAsyncErr(async (req, res, next) => {
  const customer = await Customer.findByIdAndDelete(req.params.id);
  if (!customer)
    return next(new AppError(404, "No customer found with that ID"));
  res.status(204).json({
    status: "success",
    data: null,
  });
});
