const express = require("express");
const router = express.Router();

console.log("✅ ROUTES FILE LOADED"); // 🔥 DEBUG

const ai = require("./ai");
const points = require("./points");
const Player = require("./models/Player");


// =========================
// TEST API (CHECK SERVER)
// =========================
router.get("/test", (req, res) => {
  res.json({
    message: "API Working ✅",
    status: "success"
  });
});


// =========================
// SAVE RESULT API
// =========================
router.post("/result", async (req, res) => {
  try {
    const data = req.body;

    console.log("📥 Incoming Data:", data);

    if (!data.name || data.kills == null || data.position == null) {
      console.log("❌ Validation Failed");
      return res.status(400).json({
        message: "Missing required fields ❌"
      });
    }

    const calculatedPoints = points.calculate(data);
    const decision = ai.makeDecision(calculatedPoints);

    const newPlayer = new Player({
      name: data.name,
      kills: data.kills,
      position: data.position,
      points: calculatedPoints,
      matchId: data.matchId || "match1"
    });

    await newPlayer.save();

    console.log("💾 Player Saved");

    res.json({
      message: "Player Saved ✅",
      player: {
        name: data.name,
        kills: data.kills,
        position: data.position,
        points: calculatedPoints,
        result: decision
      }
    });

  } catch (error) {
    console.log("❌ ERROR:", error.message);

    res.status(500).json({
      message: "Server Error ❌",
      error: error.message
    });
  }
});


// =========================
// LEADERBOARD
// =========================
router.get("/leaderboard", async (req, res) => {
  try {
    const players = await Player.find()
      .sort({ points: -1 })
      .limit(10);

    res.json({
      message: "Leaderboard fetched ✅",
      data: players
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// =========================
// MATCH LEADERBOARD
// =========================
router.get("/leaderboard/:matchId", async (req, res) => {
  try {
    const players = await Player.find({
      matchId: req.params.matchId
    }).sort({ points: -1 });

    res.json({
      message: "Match leaderboard ✅",
      data: players
    });

  } catch (error) {
    res.status(500).json({
      message: "Server Error ❌"
    });
  }
});


// =========================
// ❌ UNKNOWN ROUTE HANDLER (IMPORTANT)
// =========================
router.use((req, res) => {
  console.log("❌ Route Not Found:", req.method, req.url);

  res.status(404).json({
    message: "Route Not Found ❌",
    path: req.originalUrl
  });
});

module.exports = router;