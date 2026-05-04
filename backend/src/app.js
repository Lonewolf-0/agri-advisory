import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import farmRoutes from "./routes/farmRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Agri Advisory API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/farm", farmRoutes);

export default app;
