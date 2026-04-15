function makeDecision(points) {
  if (points > 50) {
    return "Winner 🏆";
  } else if (points > 30) {
    return "Qualified ✅";
  } else {
    return "Eliminated ❌";
  }
}

module.exports = { makeDecision };