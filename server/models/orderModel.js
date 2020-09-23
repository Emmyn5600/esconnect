/* eslint-disable node/no-unsupported-features/es-syntax */
import moongose from "mongoose";

const orderSchema = new moongose.Schema(
  {
    // product: [
    //   {
    //     type: moongose.Schema.ObjectId,
    //     ref: "Product",
    //     required: [true, "Order must belong to a certain product"],
    //   },
    // ],
    productId: String,
    // customer: [
    //   {
    //     type: moongose.Schema.ObjectId,
    //     ref: "Customer",
    //     required: [true, "Order must belong to a certain Customer"],
    //   },
    // ],
    customerId: String,
    price: {
      type: Number,
      required: [true, "Order must have a price"],
    },
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
