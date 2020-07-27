import moongose from "mongoose";

const productSchema = new moongose.Schema(
  {
    name: {
      type: String,
      required: [true, "product must have a name"],
    },
    description: String,
    image: String,
    thumbmail: Number,
    category: String,
    price: Number,
    createdDate: {
      type: Date,
      default: Date.now(),
    },
    stock: Number,
    size: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual populate

productSchema.virtual("orders", {
  ref: "Order",
  foreignField: "product",
  localField: "_id",
});

const Product = moongose.model("Product", productSchema);

export default Product;
