import express from "express";
import dotenv from "dotenv";
import goalRoutes from "./routes/goalRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";
import { connectDB } from "./config/db.js";

dotenv.config();

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api/goals", goalRoutes);
app.use("/api/users", userRoutes);
app.use(errorHandler);

const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log("Server running on port: ", port);
});
