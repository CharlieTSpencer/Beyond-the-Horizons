function startGameIntro() {
    return new Promise((resolve) => { // Wrap in a Promise
        const blackScreen = document.getElementById('blackScreen');
        setTimeout(function () {
            blackScreen.style.opacity = '0';
            setTimeout(function () {
                blackScreen.style.display = 'none';
                resolve(); // Resolve the promise after the intro fades away
            }, 1000); // Wait for 1 second after opacity reaches 0
        }, 4000); // Initial delay before the fade starts
    });
}

const dialogTexts = [
    `There's a way to do it, for example, a method that uses sensitive infrared instruments from JWST, charmingly named "MEOW." However, it’s also worth mentioning the transit method, which has discovered over 4,000 of them!`,
    'Your presentation was indeed interesting Prof Cieslak, although I do have some questions.',
    'Well thank you and please go ahead.',
    'How exactly did Kingdom of Poland, of all countries, end up leading a mission to BD+14 4559b?',
    'Poland pioneered exoplanet exploration since ____!',
    'You must be thinking of 1995 discovery done by ______ _____ and Didier Queloz.',
    'Swiss Nobel prize winners for discovery of ______',
    'That’s where it gets interesting. You should remember the name ________ _______ and Dale Frail',
    'Those Polish and Canadian astronomers found two planets, Poltergeist and Phobetor, around _____',
    'While work of Mayor and Queloz brought us knowledge of planets around "normal" star like our sun and hope for extraterrestrial life',
    'Wolszczan’s discovery opened the door to a whole new kind of planetary science. Without that discovery, missions like ours wouldn’t even be possible.',
    "Besides BD+14 4559 and it's planetary system have been named after and alien-planet and pilot from works of greatest Polish science-fiction writer __________ ____ and referring to them by numbers seems excessive.",
    "Sure. ________ ___ _____",
    "And all of those options were considered to immortalize Polish herritage in exoplanetary exploration.",
    "What?"
];

const answers = [
    [],[],[],
    ['2009', '1992', '1983', '1995'],
    ['Michel Mayor','Michael Caprio', 'John F. Hall'],
    ['Trappist-1 e','Proxima Centauri b','51 Pegasi b'],
    ['Aleksander Wolszczan', 'option b', 'option c'],
    ['a Black Hole', 'a Quasar', 'a Brown Dwarf', 'a Pulsar'],
    [], [],
    ['option A', 'option B', 'Stanislaw Lem', 'option D'],
    ['Solaris and Pirx', 'Geralt and Siri', 'Polonium and Radium', 'Svarog and Veles'],
    [], []
];

const correctAnswers = [
    0,0,0,
    '1992',
    'Michel Mayor',
    '51 Pegasi b',
    'Aleksander Wolszczan',
    'a Pulsar',
    0,0,
    'Stanislaw Lem',
    'Solaris and Pirx',
    0,0
];
const shake = [
    0,1,0,1,0,0,1,1,1,1,1,0,1,0
]
const emoteRight = [
    './resources/rightMeow.png','./resources/right.png','./resources/rightTalk.png','./resources/right.png',
    './resources/rightTalk.png','./resources/right.png','./resources/right.png',
    './resources/rightClosedTalk.png','./resources/rightTalk.png','./resources/rightTalk.png',
    './resources/rightClosedTalk.png', './resources/rightClosedTalk.png','./resources/right.png',
    './resources/rightClosedTalk.png', './resources/right.png'
]
const emoteLeft = [
    './resources/leftDone.png','./resources/leftTalk.png', './resources/left.png', './resources/leftTalk.png',
    './resources/left.png', './resources/leftTalk.png', './resources/leftTalk.png',
    './resources/left.png', './resources/left.png', './resources/left.png',
    './resources/left.png', './resources/left.png', './resources/leftTalk.png',
    './resources/left.png', './resources/leftTalk.png'
]

let currentLineIndex = 0; //typewriter -1 button on click wrong
let currentQuestionIndex = 0; //button on click
let vignetteShown = false;
const characterLeft = document.getElementById('character-left');
    const characterRight = document.getElementById('character-right');
    characterLeft.innerHTML = `<img src="./resources/left.png"></img>`;
    characterRight.innerHTML = `<img src="./resources/right.png"></img>`;

// Wrap the main game logic in an async function
async function startGame() {
    // Wait for the intro to finish
    await startGameIntro();

    // After the intro, start the typewriter
    typeWriter(dialogTexts[currentLineIndex], 'dialog', 50, currentQuestionIndex);
    
}

function showButtons(currentQuestionIndex) {
    addVignette();
    const newOptionsContainer = document.createElement('div');
    newOptionsContainer.id = 'options-container';
    const currentAnswers = answers[currentQuestionIndex];
    currentAnswers.forEach((answer) => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = answer;
        button.onclick = function () {
            const buttons = document.querySelectorAll('#options-container .button');
            buttons.forEach(btn => {
                btn.disabled = true;
            });
            if (answer === correctAnswers[currentQuestionIndex]) {
                button.style.backgroundColor = '#6ccf44';
                currentQuestionIndex++;
                setTimeout(function () {
                    deleteVignette();
                    typeWriter(dialogTexts[currentLineIndex], 'dialog', 50, currentQuestionIndex);
                }, 1000);
            } else {
                currentLineIndex = currentLineIndex - 1;
                button.style.backgroundColor = '#d65d5d';
                setTimeout(function () {
                    deleteVignette();
                    typeWriter(dialogTexts[currentLineIndex], 'dialog', 50, currentQuestionIndex);
                }, 2000);
            }
        };
        newOptionsContainer.appendChild(button);
    });
    const vignetteDiv = document.querySelector('.vignette');
    if (vignetteDiv) {
        vignetteDiv.appendChild(newOptionsContainer);
    }
}

function typeWriter(text, elementId, delay, currentQuestionIndex) {
    const element = document.getElementById(elementId);
    let index = 0;
    element.textContent = '';
    if(shake[currentQuestionIndex] == 0){
        shakeElement(characterLeft)
    }else{
        shakeElement(characterRight)
    }
    characterRight.innerHTML = `<img src="`+emoteRight[currentQuestionIndex]+`"></img>`;
    characterLeft.innerHTML = `<img src="`+emoteLeft[currentQuestionIndex]+`"></img>`;
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, delay);
        } else {
            window.addEventListener('click', function () {
                console.log(currentQuestionIndex, " type");
                if (!vignetteShown && answers[currentQuestionIndex].length !== 0) {
                    showButtons(currentQuestionIndex);
                    vignetteShown = true;
                } else {
                    currentQuestionIndex++;
                    typeWriter(dialogTexts[currentLineIndex], 'dialog', 50, currentQuestionIndex);
                }
            }, { once: true });
        }
    }
    currentLineIndex = currentLineIndex + 1;
    type();
}

function shakeElement(e) {
    const element = e;
    element.classList.add('shake');
    setTimeout(function () {
        element.classList.remove('shake');
    }, 1000);
}

function addVignette() {
    const element = document.getElementById('console');
    const vignetteDiv = document.createElement('div');
    vignetteDiv.classList.add('vignette');
    element.appendChild(vignetteDiv);
}

function deleteVignette() {
    const element = document.getElementById('console');
    const vignetteDiv = element.querySelector('.vignette');
    if (vignetteDiv) {
        element.removeChild(vignetteDiv);
    }
    vignetteShown = false;
}

// Start the game
startGame();
