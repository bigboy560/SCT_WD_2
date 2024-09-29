let startTime = 0;
let elapsedTime = 0;
let timerInterval;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStopBtn");
const resetBtn = document.getElementById("resetBtn");
const lapBtn = document.getElementById("lapBtn");
const lapsList = document.getElementById("laps");

let isRunning = false;

// Pad single digit numbers with a leading zero
function pad(number) {
  return number < 10 ? `0${number}` : number;
}

// Update the display with elapsed time
function updateTime() {
  elapsedTime = Date.now() - startTime;

  const seconds = Math.floor((elapsedTime / 1000) % 60);
  const minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  const hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  
  // Add visible class for smooth fade-in effect
  display.classList.remove("visible");
  setTimeout(() => display.classList.add("visible"), 10);
}

// Start or stop the stopwatch
startStopBtn.addEventListener("click", () => {
  if (!isRunning) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTime, 1000);
    startStopBtn.textContent = "Stop";
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  } else {
    clearInterval(timerInterval);
    startStopBtn.textContent = "Start";
  }
  isRunning = !isRunning;
});

// Reset the stopwatch
resetBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  isRunning = false;
  elapsedTime = 0;
  display.textContent = "00:00:00";
  startStopBtn.textContent = "Start";
  resetBtn.disabled = true;
  lapBtn.disabled = true;
  lapsList.innerHTML = "";  // Clear the laps
});

// Record lap time
lapBtn.addEventListener("click", () => {
  const lapTime = display.textContent;
  const li = document.createElement("li");
  li.textContent = lapTime;
  lapsList.appendChild(li);

  // Trigger slide-in animation for new lap
  setTimeout(() => li.classList.add("visible"), 10);
});
