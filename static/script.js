let totalSeconds = 0;
let timerInterval;
let warningShown = false;
let isPaused = false;

// Audio for warning and final alarm
const warningSound = new Audio('/static/audio/new_alarm.mp3');
const alarmSound = new Audio('/static/audio/alarm.mp3');

// Preload the sounds
warningSound.load();
alarmSound.load();

// Update the display
function updateDisplay() {
    const display = document.getElementById('display');
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    // Only show countdown when <= 60 seconds
    if (totalSeconds <= 60) {
        display.textContent = `${minutes}:${seconds}`;
    }
}

// Start the timer
function startTimer() {
    if (isPaused) return; // If timer is paused, do nothing on start

    const hours = parseInt(document.getElementById('hours').value) || 0;
    const minutes = parseInt(document.getElementById('minutes').value) || 0;
    const seconds = parseInt(document.getElementById('seconds').value) || 0;

    totalSeconds = hours * 3600 + minutes * 60 + seconds;

    if (totalSeconds <= 0) return;  // Don't start if no valid time

    isPaused = false;
    clearInterval(timerInterval);

    warningShown = false; // Reset the warning flag when starting the timer

    timerInterval = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;  // Countdown by 1 second
            updateDisplay();

            // Show warning when 60 seconds are left
            if (totalSeconds === 60 && !warningShown) {
                document.getElementById('warning').style.display = 'block';
                warningSound.play().catch(err => console.error("Warning sound error:", err));
                warningShown = true;
            }
        } else {
            // Timer has finished
            clearInterval(timerInterval);
            updateDisplay();

            // Stop warning sound
            warningSound.pause();
            warningSound.currentTime = 0;

            // Play final alarm sound
            alarmSound.play().catch(err => console.error("Alarm sound error:", err));

            // Hide warning
            document.getElementById('warning').style.display = 'none';
        }
    }, 1000);  // Run the countdown every second
}

// Pause the timer
function pauseTimer() {
    isPaused = true;  // Just stop the countdown, not resetting the time
    clearInterval(timerInterval);  // Stop the interval
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);  // Stop the interval
    totalSeconds = 0;  // Reset time
    isPaused = false;
    warningShown = false;  // Reset the warning flag

    // Reset input fields
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';

    // Reset display and hide warning
    updateDisplay();
    document.getElementById('warning').style.display = 'none';

    // Stop the sounds
    warningSound.pause();
    warningSound.currentTime = 0;
    alarmSound.pause();
    alarmSound.currentTime = 0;
}
