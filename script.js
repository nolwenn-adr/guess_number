const rulesSection = document.getElementById("rules");
const guessSection = document.getElementById("guess");
const resultSection = document.getElementById("result");
const rangeSection = document.getElementById("range");
const maxAttemptsSection = document.getElementById("max-attempts");
const previousAttemptsSection = document.getElementById("previous-attempts");
const restartSection = document.getElementById("restart");
const playSection = document.getElementById("play")

const previousAttemptsMessage = document.getElementById("last-attempts");
const minRangeMessage = document.getElementById("min-range");
const maxRangeMessage = document.getElementById("max-range");
const validRange = document.getElementById("valid-range");

const inputField = document.getElementById("guessing");
const submitButton = document.getElementById("submit");
const guessingForm = document.getElementById("form");
const playButton = document.getElementById("play-button");
const restartButton = document.getElementById("restart-button");

// LANDING //

guessSection.style.display = "none";
resultSection.style.display = "none";
rangeSection.style.display = "none";
maxAttemptsSection.style.display = "none";
previousAttemptsSection.style.display = "none";
restartSection.style.display = "none";


// Génère nombre aléatoire 1-100 = le nombre a deviner.
var numberToGuess = 0;
const rNumber = (min, max) => {
    min = Math.ceil(1);
    max = Math.floor(100);
    numberToGuess = Math.floor(Math.random() * (max - min + 1)) + min;
}
rNumber();
console.log(numberToGuess);


//Initializing attempts: 
let previousAttempts = [];
let totalAttempts = 10;

//Initializing range message:
let minRange = 1;
let maxRange = 100;
minRangeMessage.innerText = "1";
maxRangeMessage.innerText = "100";

//Initialize range bar:
validRange.style.width = `100%`;
validRange.style.left = `0%`;
validRange.style.right = `100%`;


// PLAY //

//Start
function play() {
    rulesSection.style.display = "none";
    restartSection.style.display = "none";
    playSection.style.display = "none";
    guessSection.style.display = "";
    resultSection.style.display = "";
    rangeSection.style.display = "";
    maxAttemptsSection.style.display = "";
    previousAttemptsSection.style.display = "";
    updateAttempts();
}
playButton.addEventListener("click", play);

//Update la page selon le nombre de tentatives
function updateAttempts() {
    if (totalAttempts == 10) {
        previousAttemptsSection.style.display = "none";
        resultSection.style.display = "none";
        maxAttemptsSection.innerHTML = `<p id="full-attempt">You got <span class="number">10</span> attempts.</p>`;
    } else if (totalAttempts < 1) {
        maxAttemptsSection.innerHTML = `<p id="empty-attempt">You've got no attempts left? Ow... Well, I'm not <em>too</em> surprised.</p>`;
        previousAttemptsSection.style.display = "";
        restartSection.style.display = "";
        resultSection.style.display = "";
    } else {
        maxAttemptsSection.innerHTML = `<p id="current-attempts">You've got <span class="number">${totalAttempts}</span> attempts left.</p>`;
        previousAttemptsSection.style.display = "";
        resultSection.style.display = "";
    }
};


// Chope la valeur du joueur la compare au rNumber et la stock en array //
function compareNumbers() {
    const currentGuess = Number(inputField.value);
    inputField.value = "";
    if (totalAttempts > 1) {
        if (currentGuess < numberToGuess) {
            resultSection.innerHTML = `<p class="result"><span class="number">${currentGuess}</span> is too low!</p>`;
            previousAttempts.push(currentGuess);
            printPreviousattempts();
            printRangeMessageMin();
        } else if (currentGuess > numberToGuess) {
            resultSection.innerHTML = `<p class="result"><span class="number">${currentGuess}</span> is too high!</p>`;
            previousAttempts.push(currentGuess);
            printPreviousattempts();
            printRangeMessageMax();
        } else {
            resultSection.innerHTML = `<p class="result"><span class="number">${currentGuess}</span> was my number! Congrats!</p>`;
            restartSection.style.display = "";
            maxAttemptsSection.style.display = "none";
        }
    } else {
        resultSection.innerHTML = `<p class="result"><span class="number">${currentGuess}</span> is... Wait! That was your last attempt! Sorry, but I won. My number was <span class="number">${numberToGuess}</span>.</p>`;
    }
};


guessingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    compareNumbers();
    totalAttempts -= 1;
    updateAttempts();
});

// Mets en forme et montre les tentatives précédentes.
function printPreviousattempts() {
    previousAttemptsMessage.innerText = previousAttempts.join(", ");
};

// Mets en forme le range

let validRangeWidth = undefined;

function printRangeMessageMax() {
    const previousAttemptsSuperior = previousAttempts.filter((a) => {
        return a > numberToGuess? a : ""});
    maxRange = previousAttemptsSuperior.reduce((a, b) => {
        let aDiff = Math.abs(a - numberToGuess);
        let bDiff = Math.abs(b - numberToGuess);
        if (aDiff == bDiff) {
            return a < b ? a : b;
        } else {
            return bDiff < aDiff ? b : a;
        }
    });
    maxRangeMessage.innerText = `${maxRange}`;
    validRange.style.right = `${maxRange}%`;
    validRangeWidth = maxRange - minRange;
    validRange.style.width = `${validRangeWidth}%`;
    console.log("Max Range :" + maxRange);
}

function printRangeMessageMin() {
    const previousAttemptsInferior = previousAttempts.filter((a) => {
        return a < numberToGuess? a : ""});
    minRange = previousAttemptsInferior.reduce((a, b) => {
        let aDiff = Math.abs(a - numberToGuess);
        let bDiff = Math.abs(b - numberToGuess);
        if (aDiff == bDiff) {
            return a > b ? a : b;
        } else {
            return bDiff < aDiff ? b : a;
        }
    });
    minRangeMessage.innerText = `${minRange}`;
    validRange.style.left = `${minRange}%`;
    validRangeWidth = maxRange - minRange;
    validRange.style.width = `${validRangeWidth}%`;
    console.log("Min Range :" + minRange);
}

//Play Again
const restartGame = () => {
    location.reload();
};

restartButton.addEventListener("click", restartGame);