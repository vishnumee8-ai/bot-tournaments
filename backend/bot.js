const axios = require("axios");

const API = "https://ts-api.onrender.com/api";
// Render ke liye yaha apna live URL daal dena

async function sendResult() {
  try {
    const data = {
      name: "Player_" + Math.floor(Math.random() * 100),
      kills: Math.floor(Math.random() * 10),
      position: Math.floor(Math.random() * 100),
      matchId: "match1"
    };

    const res = await axios.post(`${API}/result`, data);

    console.log("✅ BOT SENT:", res.data);

  } catch (err) {
    console.log("❌ BOT ERROR:", err.message);
  }
}

// Har 10 sec me run hoga
setInterval(sendResult, 10000);