require("dotenv").config();
const express = require("express");
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const policyRoutes = require("./routes/policyRoutes");
const cors = require("cors");
const app = express();
const dashboardRoutes = require("./routes/dashboardRoutes");
app.use(cors());
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

// Middleware to read JSON data from requests
app.use(express.json());
app.use("/policies", policyRoutes);
app.use("/users", userRoutes);
app.use("/dashboard", dashboardRoutes);

// Test Route
app.get("/test", (req, res) => {
    res.send("Test Working");
});

// Home Route
app.get("/", (req, res) => {
    res.send("Insurance Management System Started Successfully!");
});

// Server Port
const PORT = 3000;

// Start Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});