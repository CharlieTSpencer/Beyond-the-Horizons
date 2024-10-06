
function startGameIntro() {
    const blackScreen = document.getElementById('blackScreen');
    setTimeout(function() {
      blackScreen.style.opacity = '0';
      setTimeout(function() {
        blackScreen.style.display = 'none';
      }, 1000);
    }, 500);
  }
  startGameIntro();

const dialogTexts = [
    'Najpierw musimy sięgnąć pamięcią do roku ____',
    'testowe z pytaniem',
    'testowe bez',
    'testowe z'
]

const answers = [
    ['1983', '1992', '2005', '1995'],
    ['1','2','3'],
    [],
    ['1']
];
const correctAnswers = [
    '1992',
    '2',
    0,
    '1'
]


let currentLineIndex = 0; //typewriter -1 button on click wrong
let currentQuestionIndex = 0; //button on click
let vignetteShown = false; 

typeWriter(dialogTexts[currentLineIndex], 'dialog', 50, currentQuestionIndex);
const characterLeft = document.getElementById('character-left')
const characterRight = document.getElementById('character-right')
characterLeft.innerHTML = `<img src="./resources/left.png"</img>`
characterRight.innerHTML = `<img src="./resources/right.png" </img>`

function showButtons(currentQuestionIndex) {
    addVignette();
    const newOptionsContainer = document.createElement('div');
    newOptionsContainer.id = 'options-container';
    const currentAnswers = answers[currentQuestionIndex];
    currentAnswers.forEach((answer) => {
        const button = document.createElement('button');
        button.classList.add('button');
        button.textContent = answer;
        button.onclick = function() {
            const buttons = document.querySelectorAll('#options-container .button');
            buttons.forEach(btn => {
                btn.disabled = true;
            });
            if (answer === correctAnswers[currentQuestionIndex]) {
                button.style.backgroundColor = '#6ccf44';
                currentQuestionIndex++
                console.log(currentQuestionIndex)
                setTimeout(function() {
                    deleteVignette();
                    typeWriter(dialogTexts[currentLineIndex], 'dialog', 50, currentQuestionIndex);
                }, 1000);
            } else {
                currentLineIndex = currentLineIndex - 1
                button.style.backgroundColor = '#d65d5d';
                setTimeout(function() {
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
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, delay);
        } else {
            window.addEventListener('click', function() {
                console.log(currentQuestionIndex, " type")
                if (!vignetteShown && answers[currentQuestionIndex].length!=0) {
                    showButtons(currentQuestionIndex);
                    vignetteShown = true;
                }else{
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
    setTimeout(function() {
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