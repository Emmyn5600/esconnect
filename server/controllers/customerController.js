/* eslint-disable node/no-unsupported-features/es-syntax */
import _ from "lodash";
import bcrypt from 'bcrypt'
import User from "../models/customerModel";
import Order from "../models/orderModel";
import Product from "../models/productModel";
import catchAsyncErr from "../utils/catchAsyncErr";
import AppError from "../utils/appError";
import formatErrors from "../utils/validationErrorsHandling";
import { tokenGenerator } from "../utils/tokenGenerator";

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

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    city,
    country,
    zipcode,
    telephone,
  });

  const customer = newUser._id;
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
      newUser,
    },
    order: {
      order,
    },
  });
});

export const createNewUser = async (req, res) => {
  try{
    const {
    firstName,
    lastName,
    email,
    password,
    userType,
    city,
    country,
    telephone,
  } = req.body;

  const emailExist = await User.find({ email });

  if(emailExist.length > 0){
    return res.status(409).json({
      status: 409,
      error: 'Email already exist'
    })
  }

  let status;

  if(userType === 'customer'){
    status = 'active'
  }
  
  if(userType === 'seller') {
    status = 'pending'
  }

  if(userType === 'admin'){
    return res.status(403).json({
      status: 403,
      error: "You can't make yourself an Admin"
    })
  }

  bcrypt.hash(password, 10, async(err, hash) => {
    if(err) {
      return res.status(500).json({
        status: 500,
        errors: err
      })
    }
      const user = new User({
        firstName,
        lastName,
        email,
        userType,
        password: hash,
        city,
        country,
        telephone,
        status
      })

      const newUser = await user.save()

      const payload  = {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        userType: newUser.userType
      }

      const token = await tokenGenerator(payload)
      return res.status(201).json({
        status: 201,
        message: 'User created successfully',
        token,
        data: _.pick(newUser, ['firstName', 'lastName', 'email', 'city', 'country', 'telephone', 'status'])
      })
    
    })
  }catch (err) {
    res.status(400).json({
      status: 400,
      error: formatErrors(err.message)
    })
  }
}

export const loginUser = async(req, res) => {
  const{ email, password } = req.body
  const user = await User.findOne({ email });
  if(!user){
    return res.status(401).json({
      status: 401,
      message: 'Invalid username or password'
    })
  }

  bcrypt.compare(password, user.password, async(err, result) => {
    if(err) {
      return res.status(401).json({
        status: 401,
        message: 'Invalid username or password'
      })
    }

    if(result) {
      const payload  = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType
      }

      const token = await tokenGenerator(payload)
      return res.status(200).json({
        status: 200,
        token,
        message: 'Logged in successfully'
      })
    }
  })
}

export const getCustomer = catchAsyncErr(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return next(new AppError(404, "No user found with that ID"));
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const getAllCustomers = catchAsyncErr(async (req, res, next) => {
  const users = await User.find();
  res.status(200).json({
    status: "success",
    results: users.length,
    data: {
      users,
    },
  });
});

export const updateCustomer = catchAsyncErr(async (req, res, next) => {
  const user = await User.findByIdAndUpdate(req.params.id, {
    new: true,
    runValidators: true,
  });
  if (!user)
    return next(new AppError(404, "No user found with that ID"));
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const deleteCustomer = catchAsyncErr(async (req, res, next) => {
  const user = await User.findByIdAndDelete(req.params.id);
  await Order.updateMany(
    {},
    { $pull: { user: { $in: [req.params.id] } } },
    { multi: true }
  );
  if (!user)
    return next(new AppError(404, "No user found with that ID"));
  res.status(204).json({
    status: "success",
    data: null,
  });
});
