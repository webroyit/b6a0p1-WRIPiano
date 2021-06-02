const keys = document.querySelectorAll('.key');

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key));
});

// Play the audio
function playNote(key) {
    const noteAudio = document.getElementById(key.dataset.note);
    noteAudio.currentTime = 0;      // Make the audio start from the beginning
    noteAudio.play();
}