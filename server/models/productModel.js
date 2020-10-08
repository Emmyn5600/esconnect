/* eslint-disable node/no-unsupported-features/es-syntax */
import moongose, { Schema } from "mongoose";

const productSchema = new moongose.Schema(
  {
    name: {
      type: String,
      required: [true, "product must have a name"],
    },
    description: String,
    thumbmail: Number,
    category: String,
    price: Number,
    images: Array,
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    stock: Number,
    size: String,
    productColor: String,
    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual populate

// productSchema.virtual("orders", {
//   ref: "Order",
//   foreignField: "product",
//   localField: "_id",
// });

const Product = moongose.model("Product", productSchema);

export default Product;
