const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  kills: {
    type: Number,
    default: 0
  },
  position: {
    type: Number,
    default: 0
  },
  points: {
    type: Number,
    default: 0
  },
  matchId: {
    type: String,
    default: "match1"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Player", playerSchema);