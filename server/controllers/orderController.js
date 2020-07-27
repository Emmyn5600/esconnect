import Order from "../models/orderModel";
import catchAsyncErr from "../utils/catchAsyncErr";
import AppError from "../utils/appError";

export const getOrder = catchAsyncErr(async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (!order) return next(new AppError(404, "No order found with that ID"));
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

export const getAllOrders = catchAsyncErr(async (req, res, next) => {
  const orders = await Order.find();
  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

export const updateOrder = catchAsyncErr(async (req, res, next) => {
  const order = await Order.findByIdAndUpdate(req.params.id, {
    new: true,
    runValidators: true,
  });
  if (!order) return next(new AppError(404, "No order found with that ID"));
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

export const deleteOrder = catchAsyncErr(async (req, res, next) => {
  const order = await Order.findByIdAndDelete(req.params.id);
  if (!order) return next(new AppError(404, "No order found with that ID"));
  res.status(204).json({
    status: "success",
    data: null,
  });
});
