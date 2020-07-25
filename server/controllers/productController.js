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
