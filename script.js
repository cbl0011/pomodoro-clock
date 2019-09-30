const DEFAULT_SESSION_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;
let sessionSeconds = DEFAULT_SESSION_MINUTES * 60;
let breakSeconds = DEFAULT_BREAK_MINUTES * 60;

let currentSection = 'Session';
let currentTimeRemaining = sessionSeconds;

// Clock display
const sectionTitle = document.getElementById('section-title');
const sectionLength = document.getElementById('section-length');
function changeDisplay(title, seconds) {
    minutes = parseInt(seconds / 60).toString();
    seconds = (seconds % 60).toString();
    if (minutes == '0') {
        minutes = '00';
    }
    if (seconds == '0') {
        seconds = '00';
    }

    sectionTitle.textContent = title;
    sectionLength.textContent = minutes + ":" + seconds;
}

// Buttons
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const refreshButton = document.getElementById('refresh');

// Session
const sessionSubtractButton = document.getElementById('session-sub')
const sessionAddButton = document.getElementById('session-add');
const sessionLength = document.getElementById('session-time');

sessionSubtractButton.addEventListener('click', () => {
    let min = parseInt(sessionLength.textContent) - 1;
    if (min > 0) {
        sessionLength.textContent = min.toString();
    }
});

sessionAddButton.addEventListener('click', () => {
    let min = parseInt(sessionLength.textContent) + 1;
    if (min < 31) {
        sessionLength.textContent = min.toString();
    }
});

// Break
const breakSubtractButton = document.getElementById('break-sub')
const breakAddButton = document.getElementById('break-add');
const breakLength = document.getElementById('break-time');

breakSubtractButton.addEventListener('click', () => {
    let min = parseInt(breakLength.textContent) - 1;
    if (min > 0) {
        breakLength.textContent = min.toString();
    }
});

breakAddButton.addEventListener('click', () => {
    let min = parseInt(breakLength.textContent) + 1;
    if (min < 31) {
        breakLength.textContent = min.toString();
    }
});