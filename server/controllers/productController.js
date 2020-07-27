import Product from "../models/productModel";
import catchAsyncErr from "../utils/catchAsyncErr";
import AppError from "../utils/appError";

export const createProduct = catchAsyncErr(async (req, res, next) => {
  const product = await Product.create(req.body);
  res.status(201).json({
    status: "success",
    message: "product Created successfully!",
    data: {
      product,
    },
  });
});

export const getProduct = catchAsyncErr(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError(404, "No product found with that ID"));
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

export const getAllProducts = catchAsyncErr(async (req, res, next) => {
  const products = await Product.find();
  res.status(200).json({
    status: "success",
    results: products.length,
    data: {
      products,
    },
  });
});

export const updateProduct = catchAsyncErr(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, {
    new: true,
    runValidators: true,
  });
  if (!product) return next(new AppError(404, "No product found with that ID"));
  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

export const deleteProduct = catchAsyncErr(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return next(new AppError(404, "No product found with that ID"));
  res.status(204).json({
    status: "success",
    data: null,
  });
});
