let totalSeconds = 0;
let timerInterval;
let warningShown = false;
let isPaused = false;

// Get audio elements from the page
const warningSound = document.getElementById('warning-sound');
const alarmSound = document.getElementById('alarm-sound');

// Update the timer display
function updateDisplay() {
    const display = document.getElementById('display');
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    display.textContent = `${hours}:${minutes}:${seconds}`;
}

// Start the timer
function startTimer() {
    if (isPaused) return; // Prevent double-start if paused

    const hoursInput = parseInt(document.getElementById('hours').value) || 0;
    const minutesInput = parseInt(document.getElementById('minutes').value) || 0;
    const secondsInput = parseInt(document.getElementById('seconds').value) || 0;

    totalSeconds = hoursInput * 3600 + minutesInput * 60 + secondsInput;

    if (totalSeconds <= 0) return; // Don't start if zero

    isPaused = false;
    clearInterval(timerInterval); // Clear old interval if any
    warningShown = false; // Reset warning state

    updateDisplay(); // Show starting time immediately

    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateDisplay();

            // Show 1-minute warning
            if (totalSeconds === 60 && !warningShown) {
                // Show the warning
                const warningElement = document.getElementById('warning');
                warningElement.style.display = 'block'; // Make the warning visible
                warningSound.play().catch(err => console.error("Warning sound error:", err));
                warningShown = true;
            }
        } else {
            // Time ran out
            clearInterval(timerInterval);
            updateDisplay();

            warningSound.pause();
            warningSound.currentTime = 0;

            alarmSound.play().catch(err => console.error("Alarm sound error:", err));

            // Hide the warning when timer ends
            document.getElementById('warning').style.display = 'none';
        }
    }, 1000);
}

// Pause the timer
function pauseTimer() {
    isPaused = true;
    clearInterval(timerInterval);
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    isPaused = false;
    warningShown = false;

    // Clear input fields
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';

    updateDisplay();
    document.getElementById('warning').style.display = 'none'; // Hide warning on reset

    // Stop sounds
    warningSound.pause();
    warningSound.currentTime = 0;
    alarmSound.pause();
    alarmSound.currentTime = 0;
}
