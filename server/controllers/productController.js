/* eslint-disable radix */
/* eslint-disable node/no-unsupported-features/es-syntax */
import * as fs from 'fs'
import _ from 'lodash'
import Product from "../models/productModel";
import User from '../models/customerModel';
import Order from "../models/orderModel";
import catchAsyncErr from "../utils/catchAsyncErr";
import AppError from "../utils/appError";
import formatErrors from '../utils/validationErrorsHandling'
import uploads from '../utils/cloudinary'

export const createProduct = async (req, res, next) => {
  try{
    const { id, userType, status } = req.user;
    if(userType === 'admin' || (userType === 'seller' && status === 'active')){
      const uploader = async (path) => await uploads(path, 'Images')
      const urls = []
      if(req.method === 'POST'){
        const {files} = req

        // eslint-disable-next-line no-restricted-syntax
        for (const file of files) {
            const { path } = file

            // eslint-disable-next-line no-await-in-loop
            const newPath = await uploader(path)
            urls.push(newPath)
            fs.unlinkSync(path)
        }
      }
      const {
          name,
          description,
          category,
          price,
          quantity,
          size,
          productColor
      } = req.body

      const quantityInt = parseInt(quantity);
      
      const product = new Product({
          name,
          description,
          category,
          price,
          stock: [{ productColor, size, quantity: quantityInt }],
          images: urls,
      });
      const user  = await  User.findById(id)

      product.seller = user
      const newProduct = await product.save()

      user.products.push(newProduct)
      await user.save()

      return res.status(201).json({
        status: "success",
        message: "product Created successfully!",
        data: _.pick(newProduct, ['name', 'size', 'price', 'stock', 'description', 'images', 'productColor', 'category'])
      });
    }
    return res.status(401).json({
      status: 401,
      error: 'You are not allowed to create a product'
    })

  }catch(err) {
    res.status(400).json({
      status: 400,
      error: formatErrors(err.message)
    })
  }
  
};

export const addProductInStock = catchAsyncErr(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) return next(new AppError(404, "No product found with that ID"));

  const{ size, productColor, quantity } = req.body
  const quantityInt = parseInt(quantity);

  const orderedProduct = product.stock.find(item => {
    return item.productColor.toLowerCase() === productColor.toLowerCase() && item.size.toLowerCase() === size.toLowerCase()
  })

  if (orderedProduct){
    const index = product.stock.indexOf(orderedProduct)
    const productQuantity = (parseInt(product.stock[index].quantity) + quantityInt)
    await Product.findOneAndUpdate({_id: req.params.id}, {stock:[ {...product.stock[index], quantity: productQuantity}]})

    return res.status(200).json({
      status: 200,
      data: product
    });
  }

  const newItem = { size, productColor, quantity: quantityInt }
  product.stock.push(newItem)
  await product.save()

  return res.status(200).json({
    status: 200,
    data: product
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
  await Order.updateMany(
    {},
    { $pull: { product: { $in: [req.params.id] } } },
    { multi: true }
  );
  if (!product) return next(new AppError(404, "No product found with that ID"));
  res.status(204).json({
    status: "success",
    data: null,
  });
});
