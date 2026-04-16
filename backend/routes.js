const express = require("express");
const router = express.Router();

console.log("✅ ROUTES FILE LOADED");

const ai = require("./ai");
const points = require("./points");
const Player = require("./models/Player");


// =========================
// TEST API
// =========================
router.get("/test", (req, res) => {
  res.json({
    message: "API Working ✅",
    status: "success"
  });
});


// =========================
// 🤖 AI COMMAND SYSTEM
// =========================
router.post("/command", async (req, res) => {
  try {
    const { command } = req.body;

    console.log("🤖 Command:", command);

    // 🏆 MATCH CREATE
    if (command.toLowerCase().includes("match create")) {
      const matchId = "match_" + Date.now();

      return res.json({
        message: "Match Created ✅",
        matchId
      });
    }

    // 🎯 POINT SYSTEM MATCH
    if (command.toLowerCase().includes("point system")) {
      return res.json({
        message: "Point System Match Created ✅",
        system: "Kills + Position auto calculation"
      });
    }

    // 🧮 AUTO RESULT CALCULATE
    if (command.toLowerCase().includes("calculate")) {
      const players = await Player.find();

      const updated = [];

      for (let p of players) {
        const pts = points.calculate(p);

        p.points = pts;
        await p.save();

        updated.push({
          name: p.name,
          points: pts
        });
      }

      return res.json({
        message: "Results Calculated ✅",
        data: updated
      });
    }

    // ❌ UNKNOWN COMMAND
    res.json({
      message: "Unknown command ❌"
    });

  } catch (error) {
    console.log("❌ COMMAND ERROR:", error.message);

    res.status(500).json({
      message: "Server Error ❌",
      error: error.message
    });
  }
});


// =========================
// SAVE RESULT
// =========================
router.post("/result", async (req, res) => {
  try {
    const data = req.body;

    console.log("📥 Incoming Data:", data);

    if (!data.name || data.kills == null || data.position == null) {
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
      message: "Server Error ❌"
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
// ❌ UNKNOWN ROUTE
// =========================
router.use((req, res) => {
  console.log("❌ Route Not Found:", req.method, req.url);

  res.status(404).json({
    message: "Route Not Found ❌",
    path: req.originalUrl
  });
});

module.exports = router;