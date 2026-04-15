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

// 🔥 ROUTES
const routes = require("./routes");
app.use("/api", routes);

// 🔥 HOME ROUTE
app.get("/", (req, res) => {
  res.send("API Running ✅");
});

// 🔥 SERVER START
app.listen(3000, "0.0.0.0", () => {
  console.log("🌐 Server running on port 3000");
});