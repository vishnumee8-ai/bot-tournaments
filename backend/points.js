function calculate(data) {
  let total = 0;

  // Kill points
  total += data.kills * 2;

  // Position points
  if (data.position === 1) total += 20;
  else if (data.position <= 5) total += 10;
  else if (data.position <= 10) total += 5;

  return total;
}

module.exports = { calculate };