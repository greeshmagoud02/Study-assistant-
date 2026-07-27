import express from "express";
import cors from "cors";
import { env } from "./config/env.js";
import generateRoutes from "./routes/generateRoutes.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { AppError } from "./utils/AppError.js";

const app = express();

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || env.clientOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new AppError("Not allowed by CORS.", 403, "CORS_ERROR"));
    },
  })
);

app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => {
  res.status(200).json({ success: true, status: "ok" });
});

app.use("/api", generateRoutes);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
