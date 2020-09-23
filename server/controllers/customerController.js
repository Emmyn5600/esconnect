/* eslint-disable node/no-unsupported-features/es-syntax */
import Customer from "../models/customerModel";
import Order from "../models/orderModel";
import Product from "../models/productModel";
import catchAsyncErr from "../utils/catchAsyncErr";
import AppError from "../utils/appError";
import formatErrors from "../utils/validationErrorsHandling";

export const createCustomer = catchAsyncErr(async (req, res, next) => {
  const {
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
  const {price} = good;
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

export const createNewCustomer = async (req, res) => {
  try{
    const {
    firstName,
    lastName,
    email,
    city,
    country,
    zipcode,
    telephone,
  } = req.body;

  const customer = new Customer({
    firstName,
    lastName,
    email,
    city,
    country,
    zipcode,
    telephone,
  })

  const customers = await Customer.find();
  const emailExist = customers.find(e => e.email === email)

  if(emailExist){
    return res.status(409).json({
      status: 409,
      error: 'Email already exist'
    })
  }
  
  const newCustomer = await customer.save();
  return res.status(201).json({
    status: 201,
    message: 'customer created successfully',
    data: newCustomer
  })
  }catch (err) {
    res.status(400).json({
      status: 400,
      errors: formatErrors(err.message)
    })
  }
  

}

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
  await Order.updateMany(
    {},
    { $pull: { customer: { $in: [req.params.id] } } },
    { multi: true }
  );
  if (!customer)
    return next(new AppError(404, "No customer found with that ID"));
  res.status(204).json({
    status: "success",
    data: null,
  });
});
