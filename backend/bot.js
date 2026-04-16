const axios = require("axios");

// 🔥 APNA REAL URL (ye change karna zaroori hai)
const API = "https://bot-tournaments-1.onrender.com/api";

// ==========================
// 🎮 SEND RANDOM RESULT
// ==========================
async function sendResult() {
  try {
    const data = {
      name: "Player_" + Math.floor(Math.random() * 100),
      kills: Math.floor(Math.random() * 10),
      position: Math.floor(Math.random() * 100),
      matchId: "match1"
    };

    console.log("📤 Sending Result:", data);

    const res = await axios.post(`${API}/result`, data);

    console.log("✅ RESULT SENT:", res.data.message);

  } catch (err) {
    console.log("❌ RESULT ERROR:", err.response?.data || err.message);
  }
}

// ==========================
// 🤖 SEND AI COMMAND
// ==========================
async function sendCommand(command) {
  try {
    console.log("🤖 Sending Command:", command);

    const res = await axios.post(`${API}/command`, {
      command: command
    });

    console.log("🧠 AI RESPONSE:", res.data);

  } catch (err) {
    console.log("❌ COMMAND ERROR:", err.response?.data || err.message);
  }
}

// ==========================
// 🔁 AUTO RESULT LOOP
// ==========================
setInterval(sendResult, 10000); // har 10 sec

// ==========================
// ⚡ DEMO COMMANDS (AUTO RUN)
// ==========================
setTimeout(() => {
  sendCommand("match create");
}, 3000);

setTimeout(() => {
  sendCommand("point system match create");
}, 6000);

setTimeout(() => {
  sendCommand("calculate result");
}, 15000);