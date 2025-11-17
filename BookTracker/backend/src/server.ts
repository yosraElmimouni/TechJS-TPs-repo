import express from "express";
const cors = require("cors");
import { connectDB } from "./config/db";
import bookRoutes from "./routes/bookRoutes";

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// connect DB
connectDB();

// routes
app.use("/api/books", bookRoutes);

app.get("/", (req, res) => {
  res.send("Book Tracker API (TypeScript backend) is running...");
});

// start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
