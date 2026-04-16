async function calculatePoints() {
  const res = await fetch('http://localhost:3000/calculate');
  const data = await res.json();

  document.getElementById("result").innerHTML = JSON.stringify(data);
}