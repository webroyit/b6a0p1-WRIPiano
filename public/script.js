const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

const recordButton = document.querySelector('.record-button');
const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

const keyMap = [...keys].reduce((map, key) => {
    map[key.dataset.note] = key;
    return map;
}, {}); // => { C: key[0], D: key[1] }

let recordingStartTime;
let songNotes;

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key));
});

recordButton.addEventListener('click', () => {
    toggleRecording();
})

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

function toggleRecording() {
    recordButton.classList.toggle('active');

    if (isRecording()) {
        startRecording();
    } else {
        stopRecording();
    }
}

function isRecording() {
    return recordButton != null && recordButton.classList.contains('active');
}

// Record the time and note
function startRecording() {
    recordingStartTime = Date.now();
    songNotes = [];
}

function stopRecording() {
    playSong();
}

function playSong() {
    if (songNotes.length === 0) return;
    songNotes.forEach(note => {
        setTimeout(() => {
            playNote(keyMap[note.key]);
        }, note.startTime)
    })
    console.log(songNotes);
}

// Play the audio
function playNote(key) {
    if (isRecording()) recordNote(key.dataset.note);
    const noteAudio = document.getElementById(key.dataset.note);
    noteAudio.currentTime = 0;      // Make the audio start from the beginning
    noteAudio.play();

    // Add animation
    key.classList.add('active');
    noteAudio.addEventListener('ended', () => {
        key.classList.remove('active');
    })
}

function recordNote(note) {
    songNotes.push({
        key: note,
        startTime: Date.now() - recordingStartTime
    })
}