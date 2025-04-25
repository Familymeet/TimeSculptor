# TimeSculptor

TimeSculptor is a sleek, minimal, and responsive countdown timer for productivity, built using Flask (Python), HTML, CSS, and JavaScript. It allows users to set a custom countdown, receive a visual and audio warning when one minute remains, and an alarm when time is up.

---

## Features

- Custom Input: Enter hours, minutes, and seconds manually.
- Dark Mode: Clear, readable UI designed in dark mode.
- Audio Alerts:
  - Warning sound at 60 seconds remaining.
  - Final alarm when countdown hits zero.
- Controls:
  - Start, pause, and reset buttons.
- Responsive Design: Mobile and desktop friendly.

---

## Installation

1. Clone the repository:
   git clone https://github.com/Familymeet/TimeSculptor.git
   cd TimeSculptor

2. Set up a virtual environment (optional but recommended):
   python -m venv venv

   Windows:
   venv\Scripts\activate

   macOS/Linux:
   source venv/bin/activate

3. Install the dependencies:
   pip install flask

   Or use a requirements.txt file if provided:
   pip install -r requirements.txt

---

## Running the App Locally

1. Set the Flask app:

   PowerShell:
   $env:FLASK_APP = "app.py"

   macOS/Linux:
   export FLASK_APP=app.py

2. Run the app:
   flask run

3. Open your browser at http://127.0.0.1:5000

---

## Hosting on GitHub Pages

GitHub Pages only supports static content, so you cannot run a Flask app directly on GitHub Pages.

However, you can:

- Host your actual Flask app using a service like Render.
- Create a static landing page on GitHub Pages that links to your hosted Flask site.

Steps to link:
1. Create a gh-pages branch (or a new repository for your static site).
2. Add an index.html that links to your deployed Flask app.
3. Enable GitHub Pages in your repository settings.

---

## Project Structure

TimeSculptor/
├── app.py               # Main Flask app  
├── static/  
│   ├── style.css        # CSS for layout and dark mode  
│   ├── script.js        # JavaScript timer logic  
│   ├── audio/  
│   │   ├── new_alarm.mp3  
│   │   └── alarm.mp3  
│   └── images/  
│       └── warning.png  # Warning icon  
└── templates/  
    └── index.html       # Frontend template

---

## Customization

- Style: Tweak static/style.css to match your preferences.
- Sounds: Replace .mp3 files in static/audio/ with your own.

---

## Contributing

1. Fork the repository.
2. Create a new branch for your changes.
3. Push the branch and open a Pull Request.

All contributions are welcome!

---

## License

This project is licensed under the GNU License — see the LICENSE file for full details.
TimeSculptor is a sleek, minimal, and responsive countdown timer for productivity, built using Flask (Python), HTML, CSS, and JavaScript. It allows users to set a custom countdown, receive a visual and audio warning when one minute remains, and an alarm when time is up.

---

## Features

- Custom Input: Enter hours, minutes, and seconds manually.
- Dark Mode: Clear, readable UI designed in dark mode.
- Audio Alerts:
  - Warning
