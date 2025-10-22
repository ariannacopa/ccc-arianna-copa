async function updateColors() {
  const isRightSide = await window.API.getWindowPosition();
  document.body.classList.toggle('inverted', isRightSide);
}

async function updateStats() {
  try {
    await updateColors();
    const isRightSide = await window.API.getWindowPosition();

    const battery = window.API && window.API.getBattery ? await window.API.getBattery() : { hasBattery: false, percent: 0 };
    const cpuLoad = window.API && window.API.getCpuLoad ? await window.API.getCpuLoad() : { currentLoad: 0 };
    const mem = window.API && window.API.getMemory ? await window.API.getMemory() : { active: 0, total: 1 };
    const timeInfo = window.API && window.API.getTimeInfo ? await window.API.getTimeInfo() : { uptime: 0 };

    // cpu
    let cpuPercent = 0;
    if (cpuLoad && typeof cpuLoad.currentLoad !== "undefined") {
      cpuPercent = parseFloat(Number(cpuLoad.currentLoad).toFixed(1));
    }

    const cpuElem = document.getElementById("cpu");
    if (cpuElem) cpuElem.innerText = String(cpuPercent);

    // ram
    const ramElem = document.getElementById("ram");
    const ramPercent = mem && mem.total ? ((mem.active / mem.total) * 100).toFixed(1) : "0.0";
    if (ramElem) ramElem.innerText = String(ramPercent);

    // battery
    const batteryElem = document.getElementById("battery");
    const batteryPercent = battery && battery.hasBattery && typeof battery.percent === "number" ? battery.percent : null;
    if (batteryElem) {
      batteryElem.innerText = batteryPercent !== null ? String(Math.round(batteryPercent)) : "N/A";
    }

    // uptime
    const uptimeElem = document.getElementById("uptime");
    if (uptimeElem) uptimeElem.innerText = formatTime(timeInfo.uptime || 0);

    // opacità shapes
    if (!isRightSide) {
      const batteryLevel = batteryPercent !== null ? batteryPercent / 100 : 0.5;
      setShapesOpacity(batteryLevel);
    } else {
      const cpuOpacity = 1 - (cpuPercent / 100);
      setShapesOpacity(cpuOpacity);
    }

    // shape-battery
    const shapeBattery = document.getElementById("shape-battery");
    if (shapeBattery && batteryPercent !== null) {
      if (!isRightSide) {
        const size = Math.max(4, Math.round(batteryPercent));
        shapeBattery.style.width = size + "px";
        shapeBattery.style.height = size + "px";
      } else {
        shapeBattery.style.width = "4px";
        shapeBattery.style.height = "4px";
      }
    }

    // shape-cpu rotazione
    const cpuShape = document.getElementById("shape-cpu");
    if (cpuShape) {
      if (!isRightSide) {
        const rotation = (cpuPercent / 100) * 90;
        cpuShape.style.transform = `rotate(${rotation}deg)`;
      } else {
        // reset rotazione
        cpuShape.style.transform = 'rotate(0deg)';
      }
    }

    // shape-ram resize
    const ramShape = document.getElementById("shape-ram");
    if (ramShape) {
      if (!isRightSide) {
        const ramScale = 1 + ((ramPercent / 100) * 2);
        ramShape.style.transform = `rotate(90deg) scale(${ramScale})`;
      } else {
        // reset scala
        ramShape.style.transform = 'rotate(90deg) scale(1)';
      }
    }

    // cpu-thermometer
    const thermo = document.getElementById("cpu-thermometer-label");
    if (thermo) thermo.innerText = cpuPercent + "%";

  } catch (err) {
    console.error("Errore nel caricamento statistiche:", err);
  }
}


async function showMouseCoords() {
  try {
    const pos = window.API && window.API.getMousePosition ? await window.API.getMousePosition() : { x: 0, y: 0 };
    const screen = window.API && window.API.getScreenSize ? await window.API.getScreenSize() : { width: 1920, height: 1080 };
    const isRightSide = await window.API.getWindowPosition();
    const timeInfo = window.API && window.API.getTimeInfo ? await window.API.getTimeInfo() : { uptime: 0 };
    
    // dimensioni del widget
    const container = document.querySelector('.col-1');
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    
    // dimensioni shape-mouse
    const mouthWidth = 200;
    const mouthHeight = 95;
    
    //movimento massimo per toccare esattamente i bordi
    const maxMoveX = (containerRect.width - mouthWidth) / 1.8;
    const maxMoveY = (containerRect.height - mouthHeight) / 2;
    
    //centra perfettamente shape-mouse
    const centerOffset = 5;
    
    // mappa le coordinate dello schermo al widget, considerando i limiti di shape-mouse
    const xMovement = ((pos.x / screen.width) * 2 - 1) * maxMoveX + centerOffset;
    const yMovement = ((pos.y / screen.height) * 2 - 1) * maxMoveY;
    
    // movimento shape-mouse
    const mouseShape = document.getElementById("shape-mouse");
    if (mouseShape) {
      let rotation = 0;
      if (isRightSide) {
        const maxRotation = 180;
        const twelveHours = 43200;
        rotation = Math.min((timeInfo.uptime / twelveHours) * maxRotation, maxRotation);
      }
      
      // traslare e ruotare
      mouseShape.style.transform = `translate(${xMovement}px, ${yMovement}px) rotate(${rotation}deg)`;
    }

    document.getElementById("mouse-coords").innerText = `X: ${pos.x}, Y: ${pos.y}`;
  } catch (err) {
    console.error("showMouseCoords error:", err);
  }
}

function formatTime(seconds) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  return `${hrs.toString().padStart(2, "0")}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const batteryLabel = document.getElementById('battery');
const shapeIds = ['shape-cpu', 'shape-ram', 'shape-mouse'];
const shapes = shapeIds.map(id => document.getElementById(id)).filter(Boolean);

function setShapesOpacity(level) {
  const opacity = Math.max(0, Math.min(1, level));
  shapes.forEach(s => { if (s) s.style.opacity = String(opacity); });
}

// batteria
if ('getBattery' in navigator) {
  navigator.getBattery().then(battery => {
    function updateBatteryInfo() {
      const pct = Math.round(battery.level * 100);
      if (batteryLabel) batteryLabel.textContent = String(pct);
      setShapesOpacity(battery.level);
    }
    updateBatteryInfo();
    battery.addEventListener('levelchange', updateBatteryInfo);
    battery.addEventListener('chargingchange', updateBatteryInfo);
  }).catch(() => {
    if (batteryLabel) batteryLabel.textContent = 'n/a';
    setShapesOpacity(0.5);
  });
} else {
  if (batteryLabel) batteryLabel.textContent = 'n/a';
  setShapesOpacity(0.5);
}

function startManualCpuTest() {
  let t = 0;
  setInterval(() => {
    t = (t + 5) % 105;
    const cpuShape = document.getElementById("shape-cpu");
    if (cpuShape) {
      const rotation = (t / 100) * 90;
      cpuShape.style.transform = `rotate(${rotation}deg)`;
      document.getElementById("cpu").innerText = String(t);
      document.getElementById("cpu-thermometer-label").innerText = t + "%";
    }
  }, 300);
}


setInterval(showMouseCoords, 500);
setInterval(updateStats, 1000);

showMouseCoords();
updateStats();
