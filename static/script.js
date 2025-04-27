let totalSeconds = 0;
let timerInterval;
let warningShown = false;
let isPaused = false;
let displaySeconds = false;

// Get audio elements
const warningSound = document.getElementById('warning-sound');
const alarmSound = document.getElementById('alarm-sound');

// Get warning message element
const warningMessage = document.getElementById('warning-message');

// Update the timer display
function updateDisplay() {
    const display = document.getElementById('display');
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    if (displaySeconds) {
        display.textContent = `${hours}:${minutes}:${seconds}`;
    } else {
        display.textContent = `${hours}:${minutes}:--`;
    }
}

// Start or resume the timer
function startTimer() {
    if (!timerInterval) {
        if (!isPaused) {
            const hoursInput = parseInt(document.getElementById('hours').value) || 0;
            const minutesInput = parseInt(document.getElementById('minutes').value) || 0;
            const secondsInput = parseInt(document.getElementById('seconds').value) || 0;

            totalSeconds = hoursInput * 3600 + minutesInput * 60 + secondsInput;

            if (totalSeconds < 30) {
                alert("Please enter a time greater than or equal to 30 seconds.");
                return;
            }

            if (totalSeconds <= 0) return;

            warningShown = false;
            displaySeconds = false;
        }

        timerInterval = setInterval(countdown, 1000);
    }

    isPaused = false;
    updateDisplay();

    // Resume warning sound if we are already in warning state
    if (warningShown && totalSeconds <= 60 && totalSeconds > 0) {
        warningSound.play().catch(err => console.error("Warning sound resume error:", err));
    }
}

// Countdown logic
function countdown() {
    if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();

        if (totalSeconds === 30) {
            displaySeconds = true;
            updateDisplay();
        }

        if (totalSeconds === 60 && !warningShown) {
            console.log("Warning triggered at 60 seconds");
            warningSound.currentTime = 0;
            warningSound.play().catch(err => console.error("Warning sound error:", err));
            warningMessage.textContent = "Warning: 1 minute remaining!";
            warningMessage.style.color = "red";
            warningShown = true;
        }

    } else {
        clearInterval(timerInterval);
        timerInterval = null;
        updateDisplay();

        warningSound.pause();
        warningSound.currentTime = 0;

        alarmSound.play().catch(err => console.error("Alarm sound error:", err));
        warningMessage.textContent = "";
    }
}

// Pause the timer
function pauseTimer() {
    if (!isPaused) {
        clearInterval(timerInterval);
        timerInterval = null;
        isPaused = true;

        warningSound.pause();
        warningSound.currentTime = 0;  // Reset so it starts from beginning later
    }
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    timerInterval = null;
    totalSeconds = 0;
    isPaused = false;
    warningShown = false;
    displaySeconds = false;

    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';

    updateDisplay();

    warningSound.pause();
    warningSound.currentTime = 0;
    alarmSound.pause();
    alarmSound.currentTime = 0;

    warningMessage.textContent = "";
}
