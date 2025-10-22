(function () {
  const clockEl = document.getElementById("clock");
  const pacmanEl = document.getElementById("pacman");
  const counterEl = document.getElementById("special-pellet-counter");
  if (!clockEl || !pacmanEl || !counterEl) return;

  const pacmanSVG_Open = `
    <svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.5664 2.76928V1.3843H12.731V0H5.66182V1.3843H2.82711V2.76928H1.3928V4.15358V5.53857H0.00622711V6.92287V8.30785H0V9.69215H0.00622711V11.0771V12.4614H1.3928V13.8464V15.2307H2.82711V16.6157H5.66182V18H12.731V16.6157H15.5664V15.2307H17V13.8464V12.4614H14.1321V11.0771H9.94953V9.69215H5.66182V8.30785H9.94953V6.92287H14.1321V5.53857H17V4.15358V2.76928H15.5664Z" fill="#A0A09F"/>
    </svg>`;

  const pacmanSVG_Closed = `
    <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.9936 8.77289V7.31146V5.85076H17.5621V4.38933V2.92862H17.5507V2.92213H16.0813V1.46792H16.0706V1.46071H13.1548V0.00648883H13.1434V0H5.84522V1.46071H2.91868V2.92213H1.43791V4.38284V5.84427H0.00642881V7.30497V8.7664H0V10.2271H0.00642881V11.6885V13.1492H1.43791V14.6107V16.0714H1.44863V16.0779H2.91868V17.5328H2.9294V17.5393H5.84522V18.9935H5.85593V19H13.1548V17.5393H16.0813V16.0779H17.5621V14.6172V13.1557H18.9936V11.695V10.2336H19V8.77289H18.9936Z" fill="#A0A09F"/>
    </svg>`;

  const specialPelletSVG = `
<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.83288 17.3328H10.1665V18.6664H15.4999V17.3328H16.8335V11.9964H15.4999V10.6628H10.1665V11.9964H8.83288V17.3328Z" fill="#A0A09F"/>
<path d="M7.49928 17.3288L3.50047 17.3328V15.9992H2.16687V10.6628H3.50047V9.32922H8.83288V11.9964L7.49928 11.9954V17.3288Z" fill="#A0A09F"/>
<path d="M8.83288 11.9954H7.49928V17.3278H8.83288V11.9954Z" fill="#A0A09F"/>
<path d="M18.1671 11.9964H16.8335V17.3288H18.1671V11.9964Z" fill="#A0A09F"/>
<path d="M15.4999 10.6628V9.32922H10.1695V10.6628H15.4999Z" fill="#A0A09F"/>
<path d="M15.4999 20V18.6664H10.1695V20H15.4999Z" fill="#A0A09F"/>
<path d="M10.1665 10.6628H8.83288V11.9964H10.1665V10.6628Z" fill="#A0A09F"/>
<path d="M10.1665 17.3328H8.83288V18.6664H10.1665V17.3328Z" fill="#A0A09F"/>
<path d="M16.8335 17.3328H15.4999V18.6664H16.8335V17.3328Z" fill="#A0A09F"/>
<path d="M16.8335 10.6628H15.4999V11.9964H16.8335V10.6628Z" fill="#A0A09F"/>
<path d="M11.5001 13.329H10.1685V16.0002H11.5001V13.329Z" fill="#A0A09F"/>
<path d="M12.8327 16.0002H11.5001V17.3328H12.8327V16.0002Z" fill="#A0A09F"/>
<path d="M2.16687 10.6628H0.833275V15.9952H2.16687V10.6628Z" fill="#A0A09F"/>
<path d="M8.83288 9.32922V7.99562H3.50246V9.32922H8.83288Z" fill="#A0A09F"/>
<path d="M8.83288 18.6664V17.3328H3.50246V18.6664H8.83288Z" fill="#A0A09F"/>
<path d="M3.50047 9.32922H2.16687V10.6628H3.50047V9.32922Z" fill="#A0A09F"/>
<path d="M3.50047 15.9992H2.16687V17.3328H3.50047V15.9992Z" fill="#A0A09F"/>
<path d="M10.1665 9.32922H8.83288V10.6628H10.1665V9.32922Z" fill="#A0A09F"/>
<path d="M4.83407 11.9954H3.50246V14.6666H4.83407V11.9954Z" fill="#A0A09F"/>
<path d="M6.16668 14.6666H4.83407V15.9992H6.16668V14.6666Z" fill="#A0A09F"/>
<path d="M8.83387 5.3334H7.50027V6.667H8.83387V5.3334Z" fill="#A0A09F"/>
<path d="M10.1675 4.01274H8.83387V5.34634H10.1675V4.01274Z" fill="#A0A09F"/>
<path d="M12.8337 2.68312H11.5001V4.01672H12.8337V2.68312Z" fill="#A0A09F"/>
<path d="M16.8335 2.69904H15.4999V4.03264H16.8335V2.69904Z" fill="#A0A09F"/>
<path d="M15.5009 3.99979H12.8337V5.33339H15.5009V3.99979Z" fill="#A0A09F"/>
<path d="M14.1673 1.34952H12.8337V2.68312H14.1673V1.34952Z" fill="#A0A09F"/>
<path d="M18.1671 1.34952H16.8335V2.68312H18.1671V1.34952Z" fill="#A0A09F"/>
<path d="M18.1671 0H14.1673V1.3336H18.1671V0Z" fill="#A0A09F"/>
<path d="M8.83387 2.68312H6.16667V4.01672H8.83387V2.68312Z" fill="#A0A09F"/>
<path d="M6.16767 1.3336H4.83407V2.6672H6.16767V1.3336Z" fill="#A0A09F"/>
<path d="M10.1675 0H4.83407V1.3336H10.1675V0Z" fill="#A0A09F"/>
<path d="M11.5001 1.3336H10.1665V3.9998H11.5001V1.3336Z" fill="#A0A09F"/>
<path d="M12.8337 3.99979H11.5001V9.3312H12.8337V3.99979Z" fill="#A0A09F"/>
<path d="M7.50027 6.66699H6.16667V8.01452H7.50027V6.66699Z" fill="#A0A09F"/>
<path d="M8.83387 4.01573L10.1665 3.99981V1.3336H6.16767V2.6672L8.83387 2.68313V4.01573Z" fill="#A0A09F"/>
<path d="M12.8337 2.68313V3.99981H15.4999V2.69905L16.8335 2.68313V1.34953L14.1673 1.3336V2.68313H12.8337Z" fill="#A0A09F"/>
</svg>
`;

const ghostSVG = `
  <svg viewBox="0 0 18 20" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path d="M16.5281 9.23077V4.61538H15.408V3.07692H13.7918V1.53846H11.2564V0H6.74356V1.53846H4.2082V3.07692H2.59198V4.61538H1.47191V9.23077H0.333336V20H1.99361V18.4615H2.98238V15.3846H4.2082V16.9231H5.167V20H7.81692V15.3846H10.184V20H12.833V16.9231H13.7918V15.3846H15.0176V18.4615H16.0064V20H17.6667V9.23077H16.5281ZM7.28817 6.8298V9.04781H6.33906V10.1573H4.38269V9.05052H5.39084V6.8325H3.43446V5.72124H4.38357V4.61178H6.33995V5.72124H7.28905V6.8307L7.28817 6.8298ZM13.1917 6.8298V9.04781H12.2426V10.1573H10.2862V9.05052H11.2943V6.8325H9.33796V5.72124H10.2871V4.61178H12.2434V5.72124H13.1926V6.8307L13.1917 6.8298Z" fill="#A0A09F"/>
  </svg>`;

const ghostSVG1 = `
<svg viewBox="0 0 18 20" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" fill="none">
  <path d="M16.5281 9.23077V4.61538H15.408V3.07692H13.7918V1.53846H11.2564V0H6.74356V1.53846H4.2082V3.07692H2.59198V4.61538H1.47191V9.23077H0.333336V20H1.99361V18.4615H2.98238V15.3846H4.2082V16.9231H5.167V20H7.81692V15.3846H10.184V20H12.833V16.9231H13.7918V15.3846H15.0176V18.4615H16.0064V20H17.6667V9.23077H16.5281ZM7.28817 6.8298V9.04781H6.33906V10.1573H4.38269V9.05052H5.39084V6.8325H3.43446V5.72124H4.38357V4.61178H6.33995V5.72124H7.28905V6.8307L7.28817 6.8298ZM13.1917 6.8298V9.04781H12.2426V10.1573H10.2862V9.05052H11.2943V6.8325H9.33796V5.72124H10.2871V4.61178H12.2434V5.72124H13.1926V6.8307L13.1917 6.8298Z" fill="#A0A09F"/>
</svg>`;

const ghostSVG2 = `
<svg width="18" height="20" viewBox="0 0 18 20" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1.47191 9.23077V4.61538H2.59199V3.07692H4.2082V1.53846H6.74356V0H11.2564V1.53846H13.7918V3.07692H15.408V4.61538H16.5281V9.23077H17.6667V20H16.0064V18.4615H15.0176V15.3846H13.7918V16.9231H12.833V20H10.1831V15.3846H7.81604V20H5.167V16.9231H4.2082V15.3846H2.98238V18.4615H1.99362V20H0.333338V9.23077H1.47191ZM10.7118 6.8298V9.04781H11.6609V10.1573H13.6173V9.05052H12.6092V6.8325H14.5655V5.72124H13.6164V4.61178H11.6601V5.72124H10.711V6.8307L10.7118 6.8298ZM4.80833 6.8298V9.04781H5.75744V10.1573H7.71382V9.05052H6.70567V6.8325H8.66204V5.72124H7.71294V4.61178H5.75656V5.72124H4.80745V6.8307L4.80833 6.8298Z" fill="#A0A09F"/>
</svg>`;

  let rotationAngle = 0;
  let lastRotationAngle = 0;
  let pelletsEatenInHour = new Date().getMinutes();
  let lastMinute = -1;
  let currentBatteryPercent = 100;
  let blinkSpeed = 2;

  function buildGrid() {
    const cells = [];
    for (let h = 0; h < 6; h++) {
      const row = document.createElement("div");
      row.className = "row";
      clockEl.appendChild(row);
      const rowCells = [];
      for (let m = 0; m < 10; m++) {
        const idx = h * 10 + m;
        const cell = document.createElement("div");
        cell.className = "cell";
        cell.dataset.index = idx;
        row.appendChild(cell);
        rowCells.push(cell);
      }
      if (h % 2 !== 0) {
        rowCells.reverse();
      }
      cells.push(...rowCells);
    }
    return cells;
  }

  const cells = buildGrid();

  const lastCell = cells[59];
  if (lastCell) {
    lastCell.classList.add('special-pellet');
    const now = new Date();
    const currentMinute = now.getMinutes();
    if (currentMinute === 59) {
      lastCell.innerHTML = ghostSVG;
    } else {
      lastCell.innerHTML = specialPelletSVG;
    }
  }

  function updatePelletCounter() {
    const now = new Date();
    const currentHour = now.getHours();
    const ghostIconHTML = `<span class="counter-icon ghost-icon">${ghostSVG}</span>`; 
    const pelletIconHTML = `<span class="counter-icon pellet-icon">${specialPelletSVG}</span>`; 
    const formattedHour = currentHour.toString().padStart(2, '0');
    const formattedMinutes = pelletsEatenInHour.toString().padStart(2, '0');
    counterEl.innerHTML = `
      <div class="counter-item hour-counter">
        ${ghostIconHTML} x ${formattedHour}
      </div>
      <div class="counter-divider">|</div>
      <div class="counter-item minute-counter">
        ${pelletIconHTML} x ${formattedMinutes}
      </div>
    `;
  }

  function updateBlinkSpeed(percentage) {
    currentBatteryPercent = percentage;
    blinkSpeed = Math.max(0.1, 2 - (1.9 * (100 - percentage) / 100));
    document.querySelectorAll('.cell').forEach(cell => {
      if (cell.style.opacity !== '0') {
        cell.style.animationDuration = `${blinkSpeed}s`;
      }
    });
  }

  function refreshCells() {
    const now = new Date();
    const currentSecond = now.getSeconds();
    const currentMinute = now.getMinutes();
    const lastCell = cells[59];

    if (lastCell) {
      if (currentMinute === 59) {
        lastCell.innerHTML = currentSecond % 2 === 0 ? ghostSVG1 : ghostSVG2;
      } else {
        lastCell.innerHTML = specialPelletSVG;
      }
    }

    cells.forEach((cell, i) => {
      cell.style.transition = 'all 0.5s ease-in-out';
      if (i >= currentSecond) {
        cell.style.opacity = '1';
        cell.style.animationDuration = `${blinkSpeed}s`;
      } else {
        cell.style.opacity = '0';
        cell.style.animationDuration = '0s';
      }
    });

    if (currentSecond === 0 && cells[0]) {
      setTimeout(() => {
        cells[0].style.transition = 'none';
        cells[0].style.opacity = '0';
        cells[0].style.animationDuration = '0s';
        setTimeout(() => {
          cells[0].style.transition = 'all 0.5s ease-in-out';
        }, 50);
      }, 10);
    }
  }

  function updatePacman() {
    const now = new Date();
    const second = now.getSeconds();
    const minute = now.getMinutes();

    if (minute !== lastMinute) {
      if (lastMinute !== -1) { 
        pelletsEatenInHour = minute; 
        if (minute === 0) {
          pelletsEatenInHour = 0;
        }
      } else {
        pelletsEatenInHour = minute; 
      }
      lastMinute = minute;
      updatePelletCounter();
    }

    const targetCell = cells[second];
    const prevIndex = second === 0 ? null : second - 1;
    const prevCell = prevIndex !== null ? cells[prevIndex] : null;
    if (!targetCell) return;

    if (second === 0) {
      refreshCells();
      rotationAngle = 0;
      lastRotationAngle = 0;
      pacmanEl.style.transform = `translate(-50%, -50%) rotate(0deg)`;
      pacmanEl.innerHTML = pacmanSVG_Open;
    }

    if (prevCell) {
      prevCell.style.transition = 'none';
      prevCell.style.opacity = '0';
      prevCell.style.animationDuration = '0s';
      setTimeout(() => {
        prevCell.style.transition = 'all 0.5s ease-in-out';
      }, 50);
    }

    const rect = targetCell.getBoundingClientRect();
    const prevRect = prevCell ? prevCell.getBoundingClientRect() : null;

    const targetCenterX = rect.left + rect.width / 2;
    const targetCenterY = rect.top + rect.height / 2;
    let deltaX = 0, deltaY = 0;
    if (prevRect) {
      const prevCenterX = prevRect.left + prevRect.width / 2;
      const prevCenterY = prevRect.top + prevRect.height / 2;
      deltaX = targetCenterX - prevCenterX;
      deltaY = targetCenterY - prevCenterY;
    }

    if (prevRect && second !== 59) {
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 5) {
        rotationAngle = deltaY > 0 ? 90 : -90;
      } else if (Math.abs(deltaX) > 5) {
        rotationAngle = deltaX > 0 ? 0 : 180;
      }
      lastRotationAngle = rotationAngle;
    } else if (second === 59) {
      rotationAngle = lastRotationAngle;
    }

    pacmanEl.innerHTML = pacmanSVG_Open;
    pacmanEl.style.left = `${targetCenterX}px`;
    pacmanEl.style.top = `${targetCenterY}px`;
    pacmanEl.style.transform = `translate(-50%, -50%) rotate(${rotationAngle}deg)`;

    setTimeout(() => {
      pacmanEl.innerHTML = pacmanSVG_Closed;

      if (targetCell) {
        targetCell.style.transition = 'none';
        targetCell.style.opacity = '0';
        targetCell.style.animationDuration = '0s';
        setTimeout(() => {
          targetCell.style.transition = 'all 0.5s ease-in-out';
        }, 50);
      }

      setTimeout(() => {
        pacmanEl.innerHTML = pacmanSVG_Open;
      }, 75);
    }, 300);
  }

  function showClock() {
    refreshCells();
    updatePelletCounter();
  }

  showClock();
  
  window.addEventListener('batteryUpdate', (event) => {
    updateBlinkSpeed(event.detail);
  });

  setTimeout(() => {
    updatePacman();
    setInterval(() => {
      refreshCells();
      updatePacman();
    }, 1000);
  }, 700);

})();