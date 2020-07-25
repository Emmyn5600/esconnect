import moongose from "mongoose";

delete moongose.connection.models["Product"];
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

const Product = moongose.model("Product", productSchema);

export default Product;
