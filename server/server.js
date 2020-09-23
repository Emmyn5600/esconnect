/*eslint-disable*/
import dotenv from "dotenv";
import app from "./app";
import mongoose from "mongoose";

dotenv.config();

// process.on("uncaughtException", (error) => {
//   console.log("UNCAUGHT EXCEPTION 💥💥, shutting down...");
//   console.log(error.name, error.stack);
//   process.exit(1);
// });

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);
console.log(DB);
mongoose
  .connect(DB, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected successfully!.");
  });

const port =  process.env.PORT || 5000;
const server =  app.listen(port, () => console.log(`Listerning on port ${port}....\n*****************\n`));

// process.on("unhandledRejection", (err) => {
//   console.log("UNHANDLED REJECTION 💥💥 Shutting down...");
//   console.log(err.stack);
//   server.close(() => {
//     process.exit(1);
//   });
// });
