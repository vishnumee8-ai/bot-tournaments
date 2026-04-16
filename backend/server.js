const express = require("express");
const app = express();

console.log("🚀 Server starting...");
console.log("🔥 NEW VERSION DEPLOYED"); // 👈 FORCE CHECK

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

// 🔥 DIRECT TEST (ALWAYS WORK)
app.get("/api/test-direct", (req, res) => {
  res.send("DIRECT ROUTE WORKING ✅");
});

// 🔥 SIMPLE TEST (NO ROUTES FILE)
app.get("/api/test", (req, res) => {
  res.json({
    message: "API Working ✅",
    status: "success"
  });
});

// 🔥 LOAD ROUTES (OPTIONAL)
try {
  const routes = require("./routes");
  app.use("/api", routes);
  console.log("✅ ROUTES CONNECTED");
} catch (err) {
  console.log("❌ ROUTES ERROR:", err.message);
}

// 🔥 HOME ROUTE
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

// ❌ 404 HANDLER
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