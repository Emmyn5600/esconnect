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
      required: [true, "Please provide your phone number"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// Virtual populate
customerSchema.virtual("orders", {
  ref: "Order",
  foreignField: "customer",
  localField: "_id",
});
const Customer = moongose.model("Customer", customerSchema);

export default Customer;
