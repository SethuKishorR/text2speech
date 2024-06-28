// Selecting HTML elements and storing them in variables
const textarea = document.querySelector("textarea"); // Selecting a <textarea> element
const button = document.querySelector("button"); // Selecting a <button> element

// Initializing a boolean variable
let isSpeaking = true;

/* speechSynthesis: speechSynthesis is one of the APIs available within the window object. It represents the Web Speech API, which allows web applications to perform text-to-speech (TTS) synthesis. This API provides methods and properties for working with speech synthesis, such as converting text to spoken words.
So, by assigning const synth = window.speechSynthesis;, you're creating a convenient reference to the Web Speech API, allowing you to use it to perform text-to-speech operations in your JavaScript code. 
API stands for Application Programming Interface. */

// Function for text-to-speech conversion

const textToSpeech = () => {
    // Access the browser's speech synthesis API
    const synth = window.speechSynthesis;

    // Get the text from the <textarea>
    const text = textarea.value;

    // Check if speech synthesis is not currently speaking and there is text to speak
    if (!synth.speaking && text) {
        // Create a new SpeechSynthesisUtterance object with the text
        const utterance = new SpeechSynthesisUtterance(text);

        // Start speaking the text using the speech synthesis API
        synth.speak(utterance);
    }

    // Check if the length of the text is greater than 50 characters
    if (text.length > 30) {
        // If speech synthesis is speaking and the "isSpeaking" flag is true
        if (synth.speaking && isSpeaking) {
            // Change the text of the <button> to "Pause"
            button.innerText = "Pause";

            // Resume the speech synthesis (if paused)
            synth.resume();

            // Set the "isSpeaking" flag to false
            isSpeaking = false;
        } else {
            // If not speaking or "isSpeaking" is false
            // Change the text of the <button> to "Resume"
            button.innerText = "Resume";

            // Pause the speech synthesis (if speaking)
            synth.pause();

            // Set the "isSpeaking" flag to true
            isSpeaking = true;
        }
    }

    else {
        // If the text length is not greater than 30 characters
        // Set the "isSpeaking" flag to false
        isSpeaking = false;

        // Change the text of the <button> to "Speaking"
        button.innerText = "Speaking...";
    }

    // Set an interval to continuously check if speech synthesis has finished
    setInterval(() => {
        // If speech synthesis is not speaking and "isSpeaking" is false
        if (!synth.speaking && !isSpeaking) {
            // Set the "isSpeaking" flag to true
            isSpeaking = true;

            // Change the text of the <button> to "Convert to Speech"
            button.innerText = "Convert to Speech";
        }
    });
};

// Add a click event listener to the <button> element
button.addEventListener("click", textToSpeech);


/* When isSpeaking is set to true, it typically means that speech synthesis is active or in progress.
When isSpeaking is set to false, it usually means that speech synthesis is not active or has finished.*/