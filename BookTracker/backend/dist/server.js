"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors = require("cors");
const db_1 = require("./config/db");
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const app = (0, express_1.default)();
// middleware
app.use(cors());
app.use(express_1.default.json());
// connect DB
(0, db_1.connectDB)();
// routes
app.use("/api/books", bookRoutes_1.default);
app.get("/", (req, res) => {
    res.send("Book Tracker API (TypeScript backend) is running...");
});
// start server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
