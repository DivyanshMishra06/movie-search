const quizData = [
    {
        question: "Capital of India?",
        options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
        correct: 1
    },
    {
        question: "CSS is used for?",
        options: ["Structure", "Styling", "Database", "Logic"],
        correct: 1
    },
    {
        question: "JavaScript runs in?",
        options: ["Browser", "Server", "Both", "None"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");

function startTimer() {
    timeLeft = 15;
    timerEl.textContent = "Time: " + timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = "Time: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function loadQuestion() {
    clearInterval(timer);
    startTimer();

    const current = quizData[currentQuestion];
    questionEl.textContent = current.question;
    optionsEl.innerHTML = "";

    current.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => selectAnswer(index, btn);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(index, button) {
    clearInterval(timer);
    const correctIndex = quizData[currentQuestion].correct;

    const buttons = optionsEl.querySelectorAll("button");

    buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctIndex) {
            btn.classList.add("correct");
        }
    });

    if (index === correctIndex) {
        score++;
    } else {
        button.classList.add("wrong");
    }
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

function showResult() {
    quizContainer = document.querySelector(".quiz-container");
    quizContainer.innerHTML = `
        <h2>Quiz Completed 🎉</h2>
        <p>Your Score: ${score}/${quizData.length}</p>
        <button onclick="location.reload()">Restart</button>
    `;
}

nextBtn.addEventListener("click", nextQuestion);

loadQuestion();