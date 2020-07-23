import moongose from "mongoose";
import validator from "validator";

const customerSchema = new moongose.Schema(
  {
    customerNames: {
      firstName: String,
      lastName: String,
    },
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    city: String,
    country: String,
    zipcode: {
      type: String,
      required: [true, "Provide zipcode"],
    },
    telephone: {
      type: String,
      unique: true,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = moongose.model("Product", customerSchema);

export default Product;
