import "dotenv/config";
import cors from "cors";
import express from "express";
import mainRoutes from "./routes/index.js";
import { connectDB } from "./models/dbConnection.js";

connectDB();

const app = express();
const port = process.env.PORT || 8800;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/v1", mainRoutes);

app.listen(port, function () {
  console.log(`Serving on http://localhost:${port}/api/v1/`);
});
