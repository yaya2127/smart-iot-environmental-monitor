/* ==========================================================================
   IoT Telemetry Dashboard - Interactive Logic & Hazard Simulation
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

  const logBox = document.getElementById('log-box');
  const simBtn = document.getElementById('trigger-sim-btn');

  const valTemp = document.getElementById('val-temp');
  const valHumid = document.getElementById('val-humid');
  const valGas = document.getElementById('val-gas');

  const barTemp = document.getElementById('bar-temp');
  const barHumid = document.getElementById('bar-humid');
  const barGas = document.getElementById('bar-gas');

  const gasBadge = document.getElementById('gas-badge');
  const tempBadge = document.getElementById('temp-badge');

  let isSimulatingHazard = false;

  function addLog(msg, isHazard = false) {
    if (!logBox) return;
    const time = new Date().toLocaleTimeString();
    const div = document.createElement('div');
    div.className = `log-line ${isHazard ? 'hazard' : ''}`;
    div.textContent = `[${time}] ${msg}`;
    logBox.appendChild(div);
    logBox.scrollTop = logBox.scrollHeight;
  }

  // Periodic Telemetry Update Simulation
  setInterval(() => {
    if (!isSimulatingHazard) {
      const temp = (23 + Math.random() * 3).toFixed(1);
      const humid = (55 + Math.random() * 5).toFixed(1);
      const gas = Math.floor(170 + Math.random() * 40);

      valTemp.textContent = temp;
      valHumid.textContent = humid;
      valGas.textContent = gas;

      barTemp.style.width = `${(temp / 50) * 100}%`;
      barHumid.style.width = `${humid}%`;
      barGas.style.width = `${(gas / 600) * 100}%`;

      addLog(`TELEMETRY: Temp ${temp}°C | Humidity ${humid}% | Gas ${gas} PPM`);
    }
  }, 4000);

  if (simBtn) {
    simBtn.addEventListener('click', () => {
      isSimulatingHazard = !isSimulatingHazard;

      if (isSimulatingHazard) {
        simBtn.textContent = "Reset Normal Telemetry";
        simBtn.style.background = "#10b981";

        valTemp.textContent = "38.5";
        valGas.textContent = "520";
        barTemp.style.width = "77%";
        barGas.style.width = "86%";

        if (tempBadge) { tempBadge.textContent = "HIGH WARNING"; tempBadge.style.background = "rgba(239,68,68,0.2)"; tempBadge.style.color = "#ef4444"; }
        if (gasBadge) { gasBadge.textContent = "GAS BREACH ALARM!"; gasBadge.style.background = "rgba(239,68,68,0.2)"; gasBadge.style.color = "#ef4444"; }

        addLog("CRITICAL ALARM: Methane/Gas leakage detected (520 PPM)! Buzzer & Red LED Activated!", true);
      } else {
        simBtn.textContent = "Simulate Hazard Trigger";
        simBtn.style.background = "#dc2626";

        valTemp.textContent = "24.5";
        valGas.textContent = "185";
        barTemp.style.width = "45%";
        barGas.style.width = "25%";

        if (tempBadge) { tempBadge.textContent = "Normal"; tempBadge.style.background = "rgba(16,185,129,0.15)"; tempBadge.style.color = "#10b981"; }
        if (gasBadge) { gasBadge.textContent = "Clean"; gasBadge.style.background = "rgba(16,185,129,0.15)"; gasBadge.style.color = "#10b981"; }

        addLog("SYSTEM RESTORE: Hazards cleared. Microcontroller returned to normal standby mode.");
      }
    });
  }

});
