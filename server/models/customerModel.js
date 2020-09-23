/* eslint-disable node/no-unsupported-features/es-syntax */
import moongose from "mongoose";
import validator from "validator";

const customerSchema = new moongose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required']
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required']
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      lowercase: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, 'Password should have atleast 6 characters']
    },
    city: String,
    country: String,
    zipcode: {
      type: String,
      required: [true, "zipcode is required"],
    },
    telephone: {
      type: String,
      required: [true, "Phone number is required"],
    },
  },
  // {
  //   toJSON: { virtuals: true },
  //   toObject: { virtuals: true },
  // }
);
// Virtual populate
// customerSchema.virtual("orders", {
//   ref: "Order",
//   foreignField: "customer",
//   localField: "_id",
// });
const Customer = moongose.model("Customer", customerSchema);

export default Customer;
