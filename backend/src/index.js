import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./utils/db.js";
import { router } from "./routes/userRoutes.js";
import propertyRouter from "./routes/propertyRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ origin: process.env.ORIGIN_ACCESS_URL, credentials: true }));
app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));
app.use(cookieParser());

const port = process.env.PORT || 8081;

// run database
connectDB();

// run routes
app.use("/api/v1/rent/user", router);
app.use("/api/v1/rent/listing", propertyRouter);

// connection
app.listen(port, () => {
  console.log(`App running on port: ${port}`);
});
