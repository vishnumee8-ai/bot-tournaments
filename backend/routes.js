const express = require("express");
const router = express.Router();

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
// SAVE RESULT API (DEBUG VERSION)
// =========================
router.post("/result", async (req, res) => {
  try {
    const data = req.body;

    console.log("📥 Incoming Data:", data);

    // validation
    if (!data.name || data.kills == null || data.position == null) {
      console.log("❌ Validation Failed");
      return res.status(400).json({
        message: "Missing required fields ❌"
      });
    }

    const calculatedPoints = points.calculate(data);
    const decision = ai.makeDecision(calculatedPoints);

    console.log("🧮 Points:", calculatedPoints);
    console.log("🤖 AI Result:", decision);

    const newPlayer = new Player({
      name: data.name,
      kills: data.kills,
      position: data.position,
      points: calculatedPoints,
      matchId: data.matchId || "match1"
    });

    await newPlayer.save();

    console.log("💾 Player Saved in DB");

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
    console.log("❌ ERROR OCCURRED:");
    console.log("━━━━━━━━━━━━━━━━");
    console.log(error.message);
    console.log("━━━━━━━━━━━━━━━━");

    res.status(500).json({
      message: "Server Error ❌",
      error: error.message
    });
  }
});


// =========================
// LEADERBOARD API (TOP 10)
// =========================
router.get("/leaderboard", async (req, res) => {
  try {
    const players = await Player.find()
      .sort({ points: -1 })
      .limit(10);

    console.log("📊 Leaderboard requested");

    res.json({
      message: "Leaderboard fetched ✅",
      count: players.length,
      data: players
    });

  } catch (error) {
    console.log("❌ Leaderboard Error:", error.message);

    res.status(500).json({
      message: "Server Error ❌",
      error: error.message
    });
  }
});


// =========================
// MATCH WISE LEADERBOARD
// =========================
router.get("/leaderboard/:matchId", async (req, res) => {
  try {
    const matchId = req.params.matchId;

    const players = await Player.find({ matchId })
      .sort({ points: -1 });

    console.log(`📊 Match Leaderboard: ${matchId}`);

    res.json({
      message: `Leaderboard for ${matchId} ✅`,
      count: players.length,
      data: players
    });

  } catch (error) {
    console.log("❌ Match Leaderboard Error:", error.message);

    res.status(500).json({
      message: "Server Error ❌",
      error: error.message
    });
  }
});

module.exports = router;