Text-to-Speech Web App Readme
Overview
This repository contains a simple web application that utilizes the Web Speech API to convert text entered into a <textarea> element into speech. The application allows users to play, pause, resume, and stop speech synthesis.

Features
Text-to-Speech Conversion: Converts text entered into the <textarea> element into audible speech using the Web Speech API.
Play/Pause Functionality: Allows users to control speech playback with a toggle button (<button>).
Dynamic Button Text: The button text changes based on the current state of speech synthesis (Playing, Paused, or Finished).
How It Works
Selecting HTML Elements: The <textarea> and <button> elements are selected using document.querySelector() and stored in variables for easy access.

SpeechSynthesis API:

The window.speechSynthesis object is utilized for text-to-speech operations.
An interval is set to check if speech synthesis has finished to update the UI accordingly.
Functionality:

textToSpeech(): This function retrieves the text from the <textarea>, creates a SpeechSynthesisUtterance object, and utilizes methods of speechSynthesis to start, pause, resume, and monitor speech synthesis.
The button toggles between "Convert to Speech", "Pause", "Resume", and "Speaking..." based on the current state of speech synthesis and the length of the entered text.
Event Listener:

A click event listener is added to the <button> element to trigger the textToSpeech() function when clicked.
Usage
To use this application:

Clone the repository to your local machine.
Open index.html in a web browser.
Enter text into the <textarea> and click the <button> to hear the text spoken aloud.
Use the button to control playback (Pause, Resume, Stop).
Note
Ensure your browser supports the Web Speech API for proper functionality.
Adjustments may be needed based on your specific use case or UI requirements.
Credits
This application was created with reference to the Web Speech API documentation and tutorials available online.
