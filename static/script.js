let totalSeconds = 0;
let timerInterval;
let warningShown = false;
let isPaused = false;
let displaySeconds = false;  // Flag to control when seconds are visible

// Get audio elements from the page
const warningSound = document.getElementById('warning-sound');
const alarmSound = document.getElementById('alarm-sound');

// Get the warning message element
const warningMessage = document.getElementById('warning-message');

// Update the timer display
function updateDisplay() {
    const display = document.getElementById('display');
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    // If seconds should be hidden, don't show them
    if (displaySeconds) {
        display.textContent = `${hours}:${minutes}:${seconds}`;
    } else {
        display.textContent = `${hours}:${minutes}:--`;  // Hide seconds until 30 left
    }
}

// Start or resume the timer
function startTimer() {
    const hoursInput = parseInt(document.getElementById('hours').value) || 0;
    const minutesInput = parseInt(document.getElementById('minutes').value) || 0;
    const secondsInput = parseInt(document.getElementById('seconds').value) || 0;

    totalSeconds = hoursInput * 3600 + minutesInput * 60 + secondsInput;

    // Check if the set time is less than 30 seconds
    if (totalSeconds < 30) {
        alert("Please enter a time greater than or equal to 30 seconds.");
        return;  // Stop the function if the time is invalid
    }

    if (isPaused) {
        // If the timer was paused, just resume
        isPaused = false;
        timerInterval = setInterval(countdown, 1000);  // Restart the interval
        return;
    }

    if (totalSeconds <= 0) return; // Don't start if zero

    clearInterval(timerInterval); // Clear old interval if any
    warningShown = false; // Reset warning state
    displaySeconds = false; // Start with seconds hidden

    updateDisplay(); // Show starting time immediately

    timerInterval = setInterval(countdown, 1000); // Start the interval
}

// Countdown logic
function countdown() {
    if (totalSeconds > 0) {
        totalSeconds--;
        updateDisplay();

        // Show seconds countdown starting at 30 seconds left
        if (totalSeconds === 30) {
            displaySeconds = true;  // Allow seconds to show
            updateDisplay(); // Update the display with seconds
        }

        // Show 60-second warning (only once)
        if (totalSeconds === 60 && !warningShown) {
            console.log("Warning triggered at 60 seconds"); // Debugging line
            warningSound.play().catch(err => console.error("Warning sound error:", err));
            warningMessage.textContent = "Warning: 1 minute remaining!";  // Display the custom message
            warningMessage.style.color = "red";  // Change message color to red
            warningShown = true; // Mark warning as shown
        }

    } else {
        // Time ran out
        clearInterval(timerInterval);
        updateDisplay();

        warningSound.pause();
        warningSound.currentTime = 0;

        alarmSound.play().catch(err => console.error("Alarm sound error:", err));

        // Reset the warning message after the alarm
        warningMessage.textContent = "";
    }
}

// Pause the timer
function pauseTimer() {
    if (!isPaused) {
        clearInterval(timerInterval);  // Stop the interval
        isPaused = true;  // Set the flag to paused

        // Stop the warning sound when the timer is paused
        warningSound.pause();
        warningSound.currentTime = 0;
    }
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);  // Clear the interval when resetting
    totalSeconds = 0;  // Reset totalSeconds
    isPaused = false;  // Ensure it starts unpaused after reset
    warningShown = false;  // Reset warning state
    displaySeconds = false;  // Hide seconds initially after reset

    // Clear input fields
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';

    updateDisplay();  // Update display to show reset time (00:00:00)

    // Stop sounds
    warningSound.pause();
    warningSound.currentTime = 0;
    alarmSound.pause();
    alarmSound.currentTime = 0;

    // Reset the warning message
    warningMessage.textContent = "";
}
