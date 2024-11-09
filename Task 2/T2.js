let timer;
let isRunning = false;
let time = 0;
let laps = [];

const timerDisplay = document.querySelector('.timer-display');
const startPauseButton = document.querySelector('.start-pause');
const lapButton = document.querySelector('.lap');
const resetButton = document.querySelector('.reset');
const lapsList = document.querySelector('.laps-list');

function formatTime(time) {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = time % 60;
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num < 10 ? '0' + num : num;
}

function startPause() {
    if (isRunning) {
        clearInterval(timer);
        startPauseButton.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            time++;
            timerDisplay.textContent = formatTime(time);
        }, 1000);
        startPauseButton.textContent = 'Pause';
    }
    isRunning = !isRunning;
    lapButton.disabled = !isRunning;
    resetButton.disabled = !isRunning && time === 0;
}

function lap() {
    laps.push(formatTime(time));
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${laps.length}: ${formatTime(time)}`;
    lapsList.appendChild(lapItem);
}

function reset() {
    clearInterval(timer);
    time = 0;
    timerDisplay.textContent = formatTime(time);
    laps = [];
    lapsList.innerHTML = '';
    startPauseButton.textContent = 'Start';
    isRunning = false;
    lapButton.disabled = true;
    resetButton.disabled = true;
}

startPauseButton.addEventListener('click', startPause);
lapButton.addEventListener('click', lap);
resetButton.addEventListener('click', reset);
