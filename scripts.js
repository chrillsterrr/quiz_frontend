
// here are out quiz questions, anwers and the options.
const quizzes = {
    capitals: [
        { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Rome"], answer: "Paris" },
        { question: "What is the capital of Germany?", options: ["Berlin", "Vienna", "Brussels", "Amsterdam"], answer: "Berlin" },
        { question: "What is the capital of Italy?", options: ["Madrid", "Rome", "Lisbon", "Athens"], answer: "Rome" },
        { question: "What is the capital of Spain?", options: ["Madrid", "Barcelona", "Lisbon", "Paris"], answer: "Madrid" },
        { question: "What is the capital of Canada?", options: ["Toronto", "Vancouver", "Ottawa", "Montreal"], answer: "Ottawa" }
    ],
    languages: [
        { question: "What language is spoken in Brazil?", options: ["Spanish", "Portuguese", "French", "Italian"], answer: "Portuguese" },
        { question: "What is the official language of Japan?", options: ["Chinese", "Korean", "Japanese", "Thai"], answer: "Japanese" },
        { question: "What is the primary language spoken in Egypt?", options: ["Arabic", "Hebrew", "Persian", "Turkish"], answer: "Arabic" },
        { question: "Which language is predominantly spoken in Mexico?", options: ["English", "Spanish", "Portuguese", "French"], answer: "Spanish" },
        { question: "What language is primarily spoken in Russia?", options: ["Ukrainian", "Polish", "Russian", "Czech"], answer: "Russian" }
    ],
    hardQuiz: [
        { question: "What is the longest river in the world?", options: ["Nile", "Amazon", "Yangtze", "Mississippi"], answer: "Amazon" },
        { question: "Who was the first woman to win a Nobel Prize?", options: ["Marie Curie", "Rosalind Franklin", "Ada Lovelace", "Barbara McClintock"], answer: "Marie Curie" },
        { question: "Which element has the atomic number 92?", options: ["Uranium", "Plutonium", "Thorium", "Radium"], answer: "Uranium" },
        { question: "What is the only country that does not have a rectangular flag?", options: ["Switzerland", "Nepal", "Vatican City", "Bhutan"], answer: "Nepal" },
        { question: "Who developed the theory of general relativity?", options: ["Albert Einstein", "Isaac Newton", "Nikola Tesla", "Max Planck"], answer: "Albert Einstein" },
        { question: "What is the capital of Mongolia?", options: ["Ulaanbaatar", "Astana", "Tashkent", "Bishkek"], answer: "Ulaanbaatar" },
        { question: "Which of the following is the rarest blood type?", options: ["Rh-null", "O-negative", "AB-negative", "A-positive"], answer: "Rh-null" },
        { question: "What year did the Titanic sink?", options: ["1912", "1905", "1898", "1920"], answer: "1912" },
        { question: "Which of the following is the largest moon of Saturn?", options: ["Titan", "Ganymede", "Callisto", "Io"], answer: "Titan" }
    ]
};

// Our variables
let currentQuiz = [];
let currentQuestionIndex = 0;
let correctAnswers = 0;
let userAnswers = [];
let timer;
let timeLeft;
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultScreen = document.getElementById("result-screen");
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultElement = document.getElementById("result");
const reviewElement = document.getElementById("review");

// Function to start the quiz when pressing a "topic"
function startQuiz(topic) {
    currentQuiz = quizzes[topic];
    currentQuestionIndex = 0;
    correctAnswers = 0;
    userAnswers = [];
    shuffleQuestions();
    startScreen.style.display = "none";
    quizScreen.style.display = "block";
    resultScreen.style.display = "none";
    loadQuestion();
}

// Function to shuffle the questions
function shuffleQuestions() {
    // Shuffle the questions array
    currentQuiz = currentQuiz.sort(() => Math.random() - 0.5);
    // Shuffle the options for each question
    currentQuiz.forEach(question => {
        question.options = question.options.sort(() => Math.random() - 0.5);
    });
}

// Function for our timer
function startTimer() {
    timeLeft = 10;
    document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `Time Left: ${timeLeft}s`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            submitAnswer(true); // Automatically submit if the timer runs out
        }
    }, 1000);
}

// Function to load a question
function loadQuestion() {
    if (currentQuestionIndex < currentQuiz.length) {
        clearInterval(timer);
        startTimer();
        const currentQuestion = currentQuiz[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = ""; // Clear previous options
        currentQuestion.options.forEach(option => {
            const li = document.createElement("li");
            li.innerHTML = `<label><input type='radio' name='quiz' value='${option}'> ${option}</label>`;
            li.onclick = () => li.querySelector("input").checked = true;
            optionsElement.appendChild(li);
        });
    } else {
        showResults();
    }
}

// Function to submit an answer
function submitAnswer(autoSubmit = false) {
    clearInterval(timer);
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (!selectedOption && !autoSubmit) {
        alert("Please select an answer before submitting.");
        return; // Forces an answer before moving forward
    }
    const answerValue = selectedOption ? selectedOption.value : "(No answer)";
    userAnswers.push({
        question: currentQuiz[currentQuestionIndex].question,
        selected: answerValue,
        correct: currentQuiz[currentQuestionIndex].answer
    });
    if (answerValue === currentQuiz[currentQuestionIndex].answer) {
        correctAnswers++;
    }
    currentQuestionIndex++;
    loadQuestion(); // Check the answer and then call the loadQuestion function
}

// Function to show the results at the end
function showResults() {
    quizScreen.style.display = "none";
    resultScreen.style.display = "block";
    resultElement.textContent = `You got ${correctAnswers} out of ${currentQuiz.length} correct (${((correctAnswers / currentQuiz.length) * 100).toFixed(2)}%)!`;

    reviewElement.innerHTML = "<h3>Review Your Answers:</h3>";
    userAnswers.forEach(answer => {
        const p = document.createElement("p");
        p.innerHTML = `<strong>${answer.question}</strong><br>Your Answer: ${answer.selected} <br> Correct Answer: ${answer.correct}`;
        p.style.color = answer.selected === answer.correct ? "green" : "red"; // Styling for correct or wrong answers
        reviewElement.appendChild(p);
    });
}

// Function to cancel the quiz
function cancelQuiz() {
    clearInterval(timer);
    quizScreen.style.display = "none";
    startScreen.style.display = "block";
}

// Function to go back to the start screen
function goBackToStart() {
    resultScreen.style.display = "none";
    startScreen.style.display = "block";
}