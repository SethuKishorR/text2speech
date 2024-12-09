const textarea = document.querySelector("textarea");
const convertButton = document.getElementById("convertButton");
const stopButton = document.getElementById("stopButton");
const voiceSelect = document.getElementById("voiceSelect");
const loadingSpinner = document.getElementById("loadingSpinner"); // Spinner element

// Initialize variables
let isSpeaking = false;
let voices = [];
let currentUtterance = null; // Variable to store the current utterance

// Function to populate voices in the dropdown
const populateVoices = () => {
    voices = window.speechSynthesis.getVoices(); // Fetch available voices
    voiceSelect.innerHTML = ""; // Clear the existing dropdown options

    // Filter out Google voices
    const filteredVoices = voices.filter(voice => !voice.name.toLowerCase().includes('google'));

    // Populate the dropdown with non-Google voices
    filteredVoices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index; // Use index as value
        option.textContent = `${voice.name} (${voice.lang})`; // Display voice name and language
        voiceSelect.appendChild(option);
    });

    // Set default voice to the first option if available
    if (filteredVoices.length) {
        voiceSelect.selectedIndex = 0;
    }
};

// Load voices on page load and when voices are changed
window.speechSynthesis.onvoiceschanged = populateVoices;

// Function for text-to-speech conversion
const textToSpeech = () => {
    const synth = window.speechSynthesis;
    const text = textarea.value;
    const selectedVoiceIndex = voiceSelect.value;

    // Ensure text is not empty and speech synthesis isn't currently speaking or paused
    if (text && !synth.speaking && !synth.paused) {
        currentUtterance = new SpeechSynthesisUtterance(text); // Create utterance object

        // Set the selected voice
        currentUtterance.voice = voices[selectedVoiceIndex];
        voiceSelect.disabled = true;

        // Show the spinner while audio is being processed
        loadingSpinner.style.display = "inline-block"; // Show spinner
        convertButton.disabled = true; // Disable the button to prevent further clicks

        // Set up event listeners to handle when speech starts and ends
        currentUtterance.onstart = () => {
            isSpeaking = true;
            convertButton.innerText = "Pause";
            loadingSpinner.style.display = "none"; // Hide spinner when speech starts
            convertButton.disabled = false; // Enable the button again
        };

        currentUtterance.onend = () => {
            isSpeaking = false;
            convertButton.innerText = "Convert to Speech";
            voiceSelect.disabled = false;
        };

        currentUtterance.onerror = (e) => {
            console.error("Speech synthesis error:", e);
            convertButton.innerText = "Convert to Speech"; // Reset button text
            voiceSelect.disabled = false;
            loadingSpinner.style.display = "none"; // Hide spinner on error
            convertButton.disabled = false; // Enable the button again
        };

        // Cancel previous speech if any, before starting a new one
        synth.cancel(); // Cancel any ongoing speech

        // Start speaking the text
        synth.speak(currentUtterance);
    }
};

// Function to pause/resume speech synthesis
const toggleSpeech = () => {
    const synth = window.speechSynthesis;

    if (synth.speaking && !synth.paused) {
        synth.pause();
        convertButton.innerText = "Resume";
    } else if (synth.paused) {
        synth.resume();
        convertButton.innerText = "Pause";
    }
};

// Function to stop speech synthesis
const stopSpeech = () => {
    window.speechSynthesis.cancel(); // Cancel any ongoing speech
    convertButton.innerText = "Convert to Speech"; // Reset button text
    isSpeaking = false; // Update flag
    loadingSpinner.style.display = "none"; // Hide spinner when stopped
};

// Add event listener to "Convert to Speech" button
convertButton.addEventListener("click", () => {
    if (isSpeaking) {
        toggleSpeech(); // Pause/resume if speaking
    } else {
        textToSpeech(); // Start speech synthesis
    }
});

// Add event listener to "Stop" button
stopButton.addEventListener("click", stopSpeech);

// Initial voice population after page load
document.addEventListener("DOMContentLoaded", () => {
    // Ensure voices are loaded before any speech happens
    if (window.speechSynthesis.getVoices().length === 0) {
        setTimeout(populateVoices, 100); // Retry after 100ms if voices aren't available yet
    } else {
        populateVoices();
    }
    stopSpeech();
});
