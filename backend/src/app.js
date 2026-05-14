import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import farmRoutes from "./routes/farmRoutes.js";
import weatherRoutes from "./routes/weatherRoutes.js";
import advisoryRoutes from "./routes/advisoryRoutes.js";
import { errorLogger } from "./middlewares/errorLogger.js";
import { requestLogger } from "./middlewares/requestLogger.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Agri Advisory API is running",
  });
});

app.use(requestLogger);

app.use("/api/auth", authRoutes);
app.use("/api/farm", farmRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/advisory", advisoryRoutes);

app.use(errorLogger);

export default app;
