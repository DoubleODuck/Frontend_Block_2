const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const questionContainer = document.getElementById('question-container');
const questionTag = document.getElementById('question');
const answersContainer = document.getElementById('answer-btns')
const answerBtns = document.querySelectorAll(".answer");

startBtn.addEventListener('click', startGame);
let shuffledQuestions, totalScore, valuePerQuestion, index;

nextBtn.addEventListener('click', () => {
    index++;
    setNextQuestion()
})


function startGame() {
    totalScore = 0;
    valuePerQuestion = +(100 / questions.length).toFixed(2);
    startBtn.classList.add("hide")
    questionTag.classList.remove('hide')
    answersContainer.classList.remove('result')
    questionContainer.classList.remove("hide")
    nextBtn.classList.remove("hide")
    shuffledQuestions = questions.sort(() => Math.random() - .5);
    index = 0;
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[index])
}

function selectAnswer(event) {
    const target = event.target;
    if(target.hasAttribute('data-correct')) {
        totalScore += valuePerQuestion;
        target.style.backgroundColor = 'green'
    } else {
        target.style.backgroundColor = 'red'
    }

    if(questions.length > index + 1) {
        answersContainer.classList.add('block')
        nextBtn.classList.remove('hide')
    } else {
        startBtn.innerText = 'Reset'
        startBtn.classList.remove('hide')
        questionTag.classList.add('hide')
        answersContainer.classList.add('result')
        answersContainer.innerHTML = `
        <h2>Your score: ${totalScore}%</h2>
        <progress max=${100} value=${totalScore}>
        `
    }
}

function showQuestion(question) {
    questionTag.textContent = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.textContent = answer.answer;
        button.classList.add('btn')
        if(answer.isCorrect) {
            button.setAttribute('data-correct', true)
        }
        answersContainer.appendChild(button);
        button.addEventListener('click', selectAnswer);
    })
}

function resetState() {
    nextBtn.classList.add('hide')
    answersContainer.classList.remove('block')
    if (answersContainer.firstChild) {
        answersContainer.innerHTML = ''
    }
}

const questions = [
    {
        "question": "Яка всесвітньо відома ігрова франшиза була започаткована в 1985 році?",
        "answers": [
            {"answer": "Sonic the Hedgehog", "isCorrect": false},
            {"answer": "Super Mario", "isCorrect": true},
            {"answer": "Metal Gear", "isCorrect": false},
            {"answer": "Castlevania", "isCorrect": false}
        ]
    },
    {
        "question": "Як називалась перша ігрова консоль Nintendo на якій вийшли культові ігри як Super Mario Bros, Mega Man та ін.?",
        "answers": [
          {"answer": "NES", "isCorrect": true},
          {"answer": "Dendy", "isCorrect": false},
          {"answer": "Atari 2600", "isCorrect": false},
          {"answer": "Family Computer", "isCorrect": true}
        ]
      },
      {
        "question": "В якому році розвалився Радянський Союз?",
        "answers": [
          {"answer": "1921", "isCorrect": false},
          {"answer": "1998", "isCorrect": false},
          {"answer": "1991", "isCorrect": true},
          {"answer": "1988", "isCorrect": false}
        ]
      },
      {
        "question": "Яка мова має найбільше носіїв?",
        "answers": [
          {"answer": "Español", "isCorrect": false},
          {"answer": "普通话", "isCorrect": false},
          {"answer": "English", "isCorrect": true},
          {"answer": "Français", "isCorrect": false}
        ]
      },
      {
        "question": "Яка мова вважається найтяжчою для вивчення?",
        "answers": [
          {"answer": "Finnish", "isCorrect": false},
          {"answer": "English", "isCorrect": false},
          {"answer": "普通话", "isCorrect": false},
          {"answer": "Magyar", "isCorrect": true}
        ]
      }
]