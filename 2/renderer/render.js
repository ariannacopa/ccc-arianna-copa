function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs.toString().padStart(2, "0")}:${mins
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

// font variabile
const font = document.getElementById("font");
let fontWeight = 32,
  fontSlant = 0,
  fontWidth = 100;

async function updateStats() {
  try {
    const battery = await window.API.getBattery();
    const cpuLoad = await window.API.getCpuLoad();
    const mem = await window.API.getMemory();
    const cpuInfo = await window.API.getCpuInfo();
    const processes = await window.API.getProcesses();
    const timeInfo = await window.API.getTimeInfo();

    //inviare a clock il  valore
    window.dispatchEvent(new CustomEvent("batteryUpdate", { detail: battery.percent })); 
    
    // batteria
    document.getElementById("batteria").innerText = battery.hasBattery
      ? battery.percent.toFixed(0)
      : "N/A";

    let timeNow = new Date();
    document.getElementById("time").innerText = formatTime(
      timeNow.getHours() * 3600 +
        timeNow.getMinutes() * 60 +
        timeNow.getSeconds()
    );
  } catch (err) {
    console.error("Errore nel caricamento statistiche:", err);
  }
}

//create
function mapRange(value, a, b, c, d) {
  value = (value - a) / (b - a);
  return c + value * (d - c);
}

setInterval(showMouseCoords, 10);
setInterval(updateStats, 500);
updateStats();
render.js