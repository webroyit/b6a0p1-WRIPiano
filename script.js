const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key));
});

// Play the piano on the keyboard
document.addEventListener('keydown', e => {
    // e.repeat return true if the same key is pressedzc
    if (e.repeat) return;
    const key = e.key;
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key);

    if (whiteKeyIndex > -1) {
        playNote(whiteKeys[whiteKeyIndex]);
    }
    if (blackKeyIndex > -1) {
        playNote(blackKeys[blackKeyIndex]);
    }
})

// Play the audio
function playNote(key) {
    const noteAudio = document.getElementById(key.dataset.note);
    noteAudio.currentTime = 0;      // Make the audio start from the beginning
    noteAudio.play();

    // Add animation
    key.classList.add('active');
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active');
    })
}