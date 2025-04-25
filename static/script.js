let warningShown = false;
let timerInterval;
let totalSeconds = 0;
let isPaused = false;

const warningSound = new Audio('/static/audio/new_alarm.mp3');  // Direct path to static files
const alarmSound = new Audio('/static/audio/alarm.mp3');  // Direct path to static files


// Make sure audio files are loaded before the start of the timer
warningSound.load();  // Preload warning sound
alarmSound.load();    // Preload alarm sound

// Update the display function to show time
function updateDisplay() {
    const display = document.getElementById('display');
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');

    if (totalSeconds <= 60) {
        display.textContent = `${hours}:${minutes}:${seconds}`;
    } else {
        display.textContent = `${hours}:${minutes}`;
    }
}


// Start the timer
function startTimer() {
    if (!isPaused) {
        const hours = parseInt(document.getElementById('hours').value) || 0;
        const minutes = parseInt(document.getElementById('minutes').value) || 0;
        const seconds = parseInt(document.getElementById('seconds').value) || 0;

        totalSeconds = hours * 3600 + minutes * 60 + seconds;
        if (totalSeconds <= 0) return;  // If no valid time is entered, return
    }

    isPaused = false;
    clearInterval(timerInterval);

    timerInterval = setInterval(() => {
       if (!isPaused && totalSeconds > 0) {
            totalSeconds--;

            // Play warning sound when 60 seconds are left
            if (totalSeconds === 60 && !warningShown) {
                document.getElementById('warning').style.display = 'block';
                warningSound.play().catch(err => console.error("Warning sound error:", err));
                warningShown = true;
            }

            updateDisplay();
        } else if (totalSeconds <= 0) {
            // Time is up
            clearInterval(timerInterval);
            updateDisplay();
            
            // Stop warning sound if it's playing
            warningSound.pause();
            warningSound.currentTime = 0;


            // Then play final alarm
            alarmSound.play().catch(err => console.error("Alarm error:", err));  // Play time-up alarm sound

            // The alarm will stop after some time
           // setTimeout(() => {
               // clearInterval(timerInterval);  // Stop the timer
              //  console.log("Timer stopped after alarm finished.");
           // }, 15000);  // 15 seconds timeout

            // Reset warning message
            document.getElementById('warning').style.display = 'none';
            warningShown = false;
        }
    }, 1000);
}

// Pause the timer
function pauseTimer() {
    isPaused = true;
}

// Reset the timer
function resetTimer() {
    clearInterval(timerInterval);
    totalSeconds = 0;
    isPaused = false;
    warningShown = false;

    // Reset input fields
    document.getElementById('hours').value = '';
    document.getElementById('minutes').value = '';
    document.getElementById('seconds').value = '';

    // Reset display and warning
    updateDisplay();
    document.getElementById('warning').style.display = 'none';

    // Stop and reset sounds
    warningSound.pause();
    warningSound.currentTime = 0;
    alarmSound.pause();
    alarmSound.currentTime = 0;
}
