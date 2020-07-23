import moongose from "mongoose";

const orderSchema = new moongose.Schema(
  {
    product: [
      {
        type: moongose.Schema.ObjectId,
        ref: "Product",
        required: [true, "Order must belong to a certain product"],
      },
    ],
    customer: [
      {
        type: moongose.Schema.ObjectId,
        ref: "Customer",
        required: [true, "Order must belong to a certain Customer"],
      },
    ],
    price: {
      type: Number,
      required: [true, "Order must have a price"],
    },
    orderDate: {
      type: Date,
      default: Date.now(),
    },
    orderStatus: Boolean,
    orderAddress: String,
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

const Order = moongose.model("Order", orderSchema);

export default Order;
