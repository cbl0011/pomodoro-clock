const DEFAULT_SESSION_MINUTES = 25;
const DEFAULT_BREAK_MINUTES = 5;

let sessionSeconds = DEFAULT_SESSION_MINUTES * 60;
let breakSeconds = DEFAULT_BREAK_MINUTES * 60;

let currentSection = 'Session';
let currentTimeRemaining = sessionSeconds;

var timerInterval;

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// Clock display

const sectionTitle = document.getElementById('section-title');
const sectionLength = document.getElementById('section-length');
function changeDisplay(title, seconds) {
    minutes = parseInt(seconds / 60).toString();
    seconds = (seconds % 60).toString();
    if (minutes < 10) {
        if (minutes == '0') {
            minutes = '00';
        } else {
            minutes = '0' + minutes;
        }
    }
    if (seconds < 10) {
        if (seconds == '0') {
            seconds = '00';
        } else {
            seconds = '0' + seconds;
        }
    }

    sectionTitle.textContent = title;
    sectionLength.textContent = minutes + ":" + seconds;
}

function updateDisplay() {
    changeDisplay(currentSection, --currentTimeRemaining);
    if (currentTimeRemaining == 0) {
        if (currentSection == 'Session') {
            currentSection = 'Break';
            currentTimeRemaining = breakSeconds;
        } else {
            currentSection = 'Session';
            currentTimeRemaining = sessionSeconds;
        }
    }
}

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// Session 

const sessionSubtractButton = document.getElementById('session-sub')
const sessionAddButton = document.getElementById('session-add');
const sessionLength = document.getElementById('session-time');

sessionSubtractButton.addEventListener('click', () => {
    let min = parseInt(sessionLength.textContent) - 1;
    if (min > 0) {
        sessionLength.textContent = min.toString();
        sessionSeconds = min * 60;
        currentTimeRemaining = sessionSeconds;
    }

    if (!timerInterval) {
        changeDisplay('Session', sessionSeconds);
    }
});

sessionAddButton.addEventListener('click', () => {
    let min = parseInt(sessionLength.textContent) + 1;
    if (min < 31) {
        sessionLength.textContent = min.toString();
        sessionSeconds = min * 60;
        currentTimeRemaining = sessionSeconds;
    }

    if (!timerInterval) {
        changeDisplay('Session', sessionSeconds);
    }
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// Break

const breakSubtractButton = document.getElementById('break-sub')
const breakAddButton = document.getElementById('break-add');
const breakLength = document.getElementById('break-time');

breakSubtractButton.addEventListener('click', () => {
    let min = parseInt(breakLength.textContent) - 1;
    if (min > 0) {
        breakLength.textContent = min.toString();
        breakSeconds = min * 60;
    }
});

breakAddButton.addEventListener('click', () => {
    let min = parseInt(breakLength.textContent) + 1;
    if (min < 31) {
        breakLength.textContent = min.toString();
        breakSeconds = min * 60;
    }
});

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// Buttons
const playButton = document.getElementById('play');
const pauseButton = document.getElementById('pause');
const stopButton = document.getElementById('stop');
const refreshButton = document.getElementById('refresh');

playButton.addEventListener('click', () => {
    if (!timerInterval) {
        timerInterval = setInterval(updateDisplay, 1000);
    }
});

pauseButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
});

stopButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    currentSection = 'Session';
    currentTimeRemaining = sessionSeconds;
    changeDisplay(currentSection, currentTimeRemaining);
});

refreshButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    timerInterval = null;
    sessionSeconds = DEFAULT_SESSION_MINUTES * 60;
    breakSeconds = DEFAULT_BREAK_MINUTES * 60;
    currentSection = 'Session';
    currentTimeRemaining = sessionSeconds;
    changeDisplay(currentSection, currentTimeRemaining);
    sessionLength.textContent = sessionSeconds / 60;
    breakLength.textContent = breakSeconds / 60;
});

function short() {
    clearInterval(timerInterval);
    timerInterval = null;
    sessionSeconds = 10;
    breakSeconds = 5;
    currentSection = 'Session';
    currentTimeRemaining = sessionSeconds;
    changeDisplay(currentSection, currentTimeRemaining);
    sessionLength.textContent = '10s';
    breakLength.textContent = '5s';
}