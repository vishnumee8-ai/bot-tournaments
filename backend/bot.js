const axios = require("axios");

// 🔥 IMPORTANT: apna EXACT Render URL
const API = "https://ts-api.onrender.com/api";

async function sendResult() {
  try {
    const data = {
      name: "Player_" + Math.floor(Math.random() * 100),
      kills: Math.floor(Math.random() * 10),
      position: Math.floor(Math.random() * 100),
      matchId: "match1"
    };

    console.log("📤 Sending:", data);

    const res = await axios.post(`${API}/result`, data);

    console.log("✅ BOT SUCCESS:", res.data);

  } catch (err) {
    console.log("❌ ERROR STATUS:", err.response?.status);
    console.log("❌ ERROR DATA:", err.response?.data);
    console.log("❌ ERROR MSG:", err.message);
  }
}

// 🔁 10 sec loop
setInterval(sendResult, 10000);