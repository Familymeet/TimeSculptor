@echo off
REM Create virtual environment if it doesn't exist
IF NOT EXIST "venv" (
    python -m venv venv
)

REM Activate the virtual environment
call venv\Scripts\activate.bat

REM Upgrade pip and install dependencies
python -m pip install --upgrade pip
pip install -r requirements.txt

REM Set environment variables
set FLASK_APP=app.py
set FLASK_ENV=development

REM Run Flask
python -m flask run

pause
