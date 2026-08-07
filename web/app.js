/* ==========================================================================
   Industrial Cyber-Amber Telemetry Dashboard - Canvas Chart & Hazard Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const valTemp = document.getElementById('val-temp');
  const valHumid = document.getElementById('val-humid');
  const valGas = document.getElementById('val-gas');

  const svgBarTemp = document.getElementById('svg-bar-temp');
  const svgBarHumid = document.getElementById('svg-bar-humid');
  const svgBarGas = document.getElementById('svg-bar-gas');

  const sysStatus = document.getElementById('sys-status');
  const statusText = document.getElementById('status-text');
  const hazardBtn = document.getElementById('hazard-btn');
  const logBox = document.getElementById('log-box');
  const clearLogBtn = document.getElementById('clear-log-btn');

  const indSafe = document.getElementById('ind-safe');
  const indAlert = document.getElementById('ind-alert');
  const indBuzzer = document.getElementById('ind-buzzer');

  const canvas = document.getElementById('telemetry-chart');
  const ctx = canvas ? canvas.getContext('2d') : null;

  let isHazard = false;
  let historyData = [180, 185, 178, 190, 182, 185, 188];

  function addLog(msg, type = 'info') {
    if (!logBox) return;
    const time = new Date().toLocaleTimeString();
    const div = document.createElement('div');
    div.className = `log-line ${type}`;
    div.textContent = `[${time}] ${msg}`;
    logBox.appendChild(div);
    logBox.scrollTop = logBox.scrollHeight;
  }

  function updateGauges(temp, humid, gas) {
    if (valTemp) valTemp.textContent = temp.toFixed(1);
    if (valHumid) valHumid.textContent = humid.toFixed(1);
    if (valGas) valGas.textContent = Math.round(gas);

    // SVG dashoffset logic (314 total circumference)
    if (svgBarTemp) {
      const offset = 314 - (temp / 50) * 314;
      svgBarTemp.style.strokeDashoffset = Math.max(0, offset);
    }
    if (svgBarHumid) {
      const offset = 314 - (humid / 100) * 314;
      svgBarHumid.style.strokeDashoffset = Math.max(0, offset);
    }
    if (svgBarGas) {
      const offset = 314 - (gas / 600) * 314;
      svgBarGas.style.strokeDashoffset = Math.max(0, offset);
      if (gas > 400) {
        svgBarGas.style.stroke = "#ef4444";
      } else {
        svgBarGas.style.stroke = "#eab308";
      }
    }
  }

  function drawCanvasChart() {
    if (!ctx || !canvas) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const width = canvas.width;
    const height = canvas.height;

    // Draw Grid Lines
    ctx.strokeStyle = '#292524';
    ctx.lineWidth = 1;

    for (let y = 20; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw Telemetry Data Line
    ctx.strokeStyle = isHazard ? '#ef4444' : '#f97316';
    ctx.lineWidth = 3;
    ctx.beginPath();

    const step = width / (historyData.length - 1);
    historyData.forEach((val, idx) => {
      const x = idx * step;
      const y = height - (val / 600) * height;
      if (idx === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });

    ctx.stroke();

    // Fill Gradient under line
    const grad = ctx.createLinearGradient(0, 0, 0, height);
    grad.addColorStop(0, isHazard ? 'rgba(239,68,68,0.3)' : 'rgba(249,115,22,0.3)');
    grad.addColorStop(1, 'rgba(12,10,9,0)');
    ctx.fillStyle = grad;
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.fill();
  }

  // Periodic Telemetry Loop
  setInterval(() => {
    if (!isHazard) {
      const t = 23.5 + (Math.random() * 2 - 1);
      const h = 57.0 + (Math.random() * 4 - 2);
      const g = 180 + Math.floor(Math.random() * 20 - 10);

      updateGauges(t, h, g);

      historyData.push(g);
      if (historyData.length > 15) historyData.shift();
      drawCanvasChart();

      addLog(`TELEMETRY: Temp ${t.toFixed(1)}°C | Humidity ${h.toFixed(1)}% | Gas ${g} PPM`);
    }
  }, 3500);

  // Hazard Button Handler
  if (hazardBtn) {
    hazardBtn.addEventListener('click', () => {
      isHazard = !isHazard;

      if (isHazard) {
        hazardBtn.textContent = "RESET SAFE TELEMETRY STANDBY";
        hazardBtn.style.background = "#22c55e";

        if (sysStatus) { sysStatus.className = "system-status hazard"; }
        if (statusText) { statusText.textContent = "CRITICAL HAZARD BREACH ALARM!"; }

        if (indSafe) indSafe.className = "ind-dot green-off";
        if (indAlert) indAlert.className = "ind-dot red-on";
        if (indBuzzer) indBuzzer.className = "ind-dot amber-on";

        const t = 39.2;
        const h = 82.0;
        const g = 540;

        updateGauges(t, h, g);
        historyData.push(g);
        if (historyData.length > 15) historyData.shift();
        drawCanvasChart();

        addLog("CRITICAL ALARM: Methane/Gas leakage detected (540 PPM)! ATmega328P Interrupt Triggered!", "hazard");
      } else {
        hazardBtn.textContent = "TRIGGER METHANE HAZARD ALARM";
        hazardBtn.style.background = "#ef4444";

        if (sysStatus) { sysStatus.className = "system-status normal"; }
        if (statusText) { statusText.textContent = "SYSTEM STANDBY (NORMAL)"; }

        if (indSafe) indSafe.className = "ind-dot green";
        if (indAlert) indAlert.className = "ind-dot red-off";
        if (indBuzzer) indBuzzer.className = "ind-dot amber-off";

        const t = 24.5;
        const h = 58.0;
        const g = 185;

        updateGauges(t, h, g);
        historyData.push(g);
        if (historyData.length > 15) historyData.shift();
        drawCanvasChart();

        addLog("SYSTEM RESTORE: Hazards cleared. Microcontroller standby active.", "info");
      }
    });
  }

  if (clearLogBtn) {
    clearLogBtn.addEventListener('click', () => {
      if (logBox) logBox.innerHTML = '';
    });
  }

  updateGauges(24.5, 58.0, 185);
  drawCanvasChart();
});
