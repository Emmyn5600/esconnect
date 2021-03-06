/* eslint-disable radix */
/* eslint-disable node/no-unsupported-features/es-syntax */
import Order from "../models/orderModel";
import Product from "../models/productModel"
import catchAsyncErr from "../utils/catchAsyncErr";
import AppError from "../utils/appError";
import formatErrors from "../utils/validationErrorsHandling";

export const createOrder = async(req, res) => {
  try {
    const {
      paymentMethod,
      shippingMethod,
      productColor,
      quantity,
      size
    } = req.body

    const product = await Product.findById(req.params.id)
    if(!product){
      res.status(404).json({
        status: 404,
        error: 'Product not Found'
      })
    }

    const orderedProduct = product.stock.find(item => {
      return item.productColor.toLowerCase() === productColor.toLowerCase() && item.size.toLowerCase() === size.toLowerCase()
    })

    if(orderedProduct && (parseInt(orderedProduct.quantity) < parseInt(quantity)) ){
      return res.status(413).json({
        status: 413,
        error: `We have ${orderedProduct.quantity} ${orderedProduct.size} ${orderedProduct.productColor} ${product.name} in stock`
      })
    }

    const index = product.stock.indexOf(orderedProduct)
    const { id } = req.user;

    const newOrder = await Order.create({
      price: (quantity * product.price),
      paymentMethod,
      shippingMethod,
      quantity,
      orderStatus: 'pending',
      customerId: id,
      productId: req.params.id,
      productSize: product.stock[index].size,
      productColor
    })
    const productQuantity = (parseInt(product.stock[index].quantity) - parseInt(quantity))
    await Product.findOneAndUpdate({_id: req.params.id}, {stock:[ {...product.stock[index], quantity: productQuantity}]})

    const order = await newOrder.save();

    res.status(201).json({
      status: 201,
      message: "Order created successfully",
      data: order
    })
  } catch (error) {
    res.status(400).json({
      error: formatErrors(error.message)
    })
    
  }
}

export const getOrder = catchAsyncErr(async (req, res, next) => {
  const { id } = req.user;
  const order = await Order.find({ _id: req.params.id, customerId: id });
  if (!order) return next(new AppError(404, "No order found with that ID"));
  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

export const getAllOrders = catchAsyncErr(async (req, res, next) => {
  const { id, userType } = req.user;
  let orders;
  if(userType === 'admin'){
    orders = await Order.find();
  }else{
    orders = await Order.find({customerId: id});
  }
  
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
