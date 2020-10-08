/* eslint-disable node/no-unsupported-features/es-syntax */
import moongose, { Schema } from "mongoose";
import validator from "validator";

const userSchema = new moongose.Schema(
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
    telephone: {
      type: String,
      required: [true, "Phone number is required"],
    },

    userType: {
      type: String,
      default: 'customer'
    },

    products: [{
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }]
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
const User = moongose.model("User", userSchema);

export default User;
