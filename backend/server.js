const express = require("express");
const app = express();

console.log("🚀 Server starting...");

app.use(express.json());

// 🔥 REQUEST LOGGER
app.use((req, res, next) => {
  console.log(`➡ ${req.method} ${req.url}`);
  next();
});

// 🔥 DB CONNECT
try {
  require("./db");
  console.log("🔌 DB file loaded");
} catch (err) {
  console.log("❌ DB ERROR:", err.message);
}

// 🔥 DIRECT TEST (IMPORTANT - ABOVE ROUTES)
app.get("/api/test-direct", (req, res) => {
  res.send("DIRECT ROUTE WORKING ✅");
});

// 🔥 ROUTES LOAD CHECK
let routes;
try {
  routes = require("./routes");
  console.log("✅ ROUTES FILE LOADED");
} catch (err) {
  console.log("❌ ROUTES LOAD ERROR:", err.message);
}

// 🔥 ROUTES USE
if (routes) {
  app.use("/api", routes);
  console.log("✅ ROUTES CONNECTED AT /api");
}

// 🔥 HOME ROUTE
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

// ❌ 404 HANDLER (VERY IMPORTANT)
app.use((req, res) => {
  res.status(404).json({
    message: "Route Not Found ❌",
    path: req.originalUrl
  });
});

// 🔥 SERVER START
app.listen(3000, "0.0.0.0", () => {
  console.log("🌐 Server running on port 3000");
});