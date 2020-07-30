import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import globalErrorHandler from "./controllers/errorController";
import AppError from "./utils/appError";
import customerRouter from "./routes/customerRoutes";
import productRouter from "./routes/productRoutes";
import orderRouter from "./routes/orderRoutes";
import cors from 'cors';

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api/v1/customers", customerRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/orders", orderRouter);

app.all("*", (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server😔`));
});

app.use(globalErrorHandler);
export default app;
