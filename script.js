// Countdown até 07/07/2026 às 23:59
const TARGET = new Date('2026-07-07T23:59:00');

function pad(n) {
  return String(n).padStart(2, '0');
}

function updateCountdown() {
  const now = new Date();
  const diff = TARGET - now;

  if (diff <= 0) {
    // Countdown bar
    document.getElementById('cd-days').textContent  = '00';
    document.getElementById('cd-hours').textContent = '00';
    document.getElementById('cd-mins').textContent  = '00';
    document.getElementById('cd-secs').textContent  = '00';

    // Inline countdown
    document.getElementById('ic-days').textContent  = '00';
    document.getElementById('ic-hours').textContent = '00';
    document.getElementById('ic-mins').textContent  = '00';
    document.getElementById('ic-secs').textContent  = '00';

    clearInterval(timer);
    return;
  }

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  // Countdown bar
  document.getElementById('cd-days').textContent  = pad(days);
  document.getElementById('cd-hours').textContent = pad(hours);
  document.getElementById('cd-mins').textContent  = pad(mins);
  document.getElementById('cd-secs').textContent  = pad(secs);

  // Inline countdown
  document.getElementById('ic-days').textContent  = pad(days);
  document.getElementById('ic-hours').textContent = pad(hours);
  document.getElementById('ic-mins').textContent  = pad(mins);
  document.getElementById('ic-secs').textContent  = pad(secs);
}

// Roda imediatamente e depois a cada 1 segundo
updateCountdown();
const timer = setInterval(updateCountdown, 1000);