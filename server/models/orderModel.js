/* eslint-disable node/no-unsupported-features/es-syntax */
import moongose, { Schema } from "mongoose";

const orderSchema = new moongose.Schema(
  {
    // product: [
    //   {
    //     type: moongose.Schema.ObjectId,
    //     ref: "Product",
    //     required: [true, "Order must belong to a certain product"],
    //   },
    // ],
    // customer: [
    //   {
    //     type: moongose.Schema.ObjectId,
    //     ref: "Customer",
    //     required: [true, "Order must belong to a certain Customer"],
    //   },
    // ],
    customer: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    productId: String,
    price: {
      type: Number,
      required: [true, "Order must have a price"],
    },
    customerId: String,
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    orderStatus: {
      type: String,
      default: "Not paid",
    },
    shippingAddress: String,
    paymentMethod: {
      type: String,
      required: [true, "Please mention your payment method"],
    },
    shippingMethod: {
      type: String,
      required: [true, "Choose your shipping method"],
    },
    quantity: Number,
    productSize: String,
    productColor: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// orderSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: "customer",
//     select: "firstName lastName email telephone",
//   }).populate({
//     path: "product",
//     select: "name category price",
//   });
//   next();
// });

const Order = moongose.model("Order", orderSchema);

export default Order;
