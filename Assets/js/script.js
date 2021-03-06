// Array object to store the questions and answers that will be used in the quiz game
var quizQuestions = [
  {
    question: "1. Which company developed JavaScript?",
    answers: [
      "Microsoft",
      "Netscape",
      "Netscape",
      "Landscape",
      "Internet Explorer",
    ],
    correctAnswer: "Netscape",
  },
  {
    question: "2. Which one isn't a JavaScript Data Type?",
    answers: ["Number", "Boolean", "Flex", "String", "Object"],
    correctAnswer: "Flex",
  },
  {
    question: "3. What is this keyword in JavaScript?",
    answers: [
      "The object from where it was called",
      "It creates an element",
      "It begins a timer",
      "It stands for Heading",
      "Refering to the <script> tag",
    ],
    correctAnswer: "The object from where it was called",
  },
  {
    question: "4. Which symbol is used for single line comments in Javascript?",
    answers: ["//", "<!--", "/*", "<!-", "//*"],
    correctAnswer: "//",
  },
];

var questionIndex = 0;
// Setting these values on the gloabl scope to make available to all functions
var timeLeft = 20;
var amountLost = 5;
var countDown;
var correctAnswers = 0;

// Variables for the different Pages
var startPage = document.getElementById("start-page");
var questionPage = document.getElementById("questions-page");
var endPage = document.getElementById("end-page");
var highscorePage = document.getElementById("highscore-page");

var backButton = document.getElementById("go-back-button");
var startButton = document.getElementById("start-quiz-button");
var submitButton = document.getElementById("submit-initials-button");
var questionTitle = document.getElementById("question-title");
var questionAnswersSection = document.getElementById("question-answers");
var scoreInput = document.getElementById("initials-input");
var highscoreList = document.getElementById("highscore-list");
var timerEl = document.getElementById("timer");
var highscoreLink = document.getElementById("highscore-link");
var correctClick = document.getElementById("correct-click");
var incorrectClick = document.getElementById("incorrect-click");

// Local Storage variables
var highscore = localStorage.getItem("highscores");

// This function is what is triggered after you click the start game button
function startGame(event) {
  event.preventDefault();
  // Setting previous content to hide and new content to be visible to the user
  startPage.setAttribute("class", "hide");
  questionPage.removeAttribute("class");

  // Triggers next question & Starts timer
  nextQuestion();
  quizTimer();
}

function quizTimer() {
  // Decrement the value of timeLeft and display the updated text
  countDown = setInterval(function () {
    timeLeft--;
    timerEl.innerText = " " + timeLeft + " Seconds";
    // Once the timer reaches a value of 0, I want to end the timer
    if (timeLeft <= 0) {
      clearInterval(countDown);
      timerEl.innerHTML = "00:00";
      endQuiz();
    }
  }, 1000);
}

// This function is what plays the next question
function nextQuestion() {
  var questionObject = quizQuestions[questionIndex];

  // Change the Questions text content to the value of the property from the object
  questionTitle.textContent = questionObject.question;

  // Stating that the innerHTML is blank stops the new set of questions from reprinting
  // next to the previous ones
  questionAnswersSection.innerHTML = "";

  // For each of the answers in questionObject create buttons with the question Answers
  // inside them as options
  questionObject.answers.forEach(function (answer) {
    var answerButton = document.createElement("button");
    answerButton.setAttribute("value", answer);

    answerButton.textContent = answer;

    // 'On Click' on any of the answer buttons we want to run selectAnswer and clear the
    // previous questions listed
    answerButton.onclick = selectAnswer;
    questionAnswersSection.appendChild(answerButton);
  });
}

function selectAnswer() {
  // If the current value of 'this' does not equal the current questions correct answer then
  // do................
  if (this.value !== quizQuestions[questionIndex].correctAnswer) {
    // time is deducted every question answered wrong
    timeLeft = timeLeft - amountLost;
  } else {
    console.log("User selected the correct answer");
    //add to the users score
  }

  // Move to the next question
  questionIndex++;

  // If the current question is the last question available then run the endQuiz function but
  // if not, then the game hasn't ended. Run the nextQuestion function and display a new question.
  if (questionIndex === quizQuestions.length) {
    endQuiz();
    // and we want to stop the timer
    clearInterval(countDown);
  } else {
    nextQuestion();
  }
}

function endQuiz() {
  // Hide questions page
  questionPage.setAttribute("class", "hide");
  endPage.removeAttribute("class");
}

function saveHighscore(event) {
  event.preventDefault();

  // The score would be saved to local storage
  endPage.setAttribute("class", "hide");
  highscorePage.removeAttribute("class");
  highscoreLink.setAttribute("class", "hide");

  // Using Local Storage to render a highscore board
  // Currently, it only displays the highscore in the local storage

  // This variable is what the user typed into the input box
  var userInitials = scoreInput.value;
  if (!highscore) {
    // Turning the string back into an array
    var parsedHighscore = JSON.parse(highscore);

    // Push the new score into the object
    parsedHighscore.push({
      initials: userInitials,
      score: correctAnswers,
    });
    // Then we are updating the local storage with this new information
    localStorage.setItem("highscore", JSON.stringify(parsedHighscore));
  } else {
    //If this is the first time the user has played, we need to create the array
    localStorage.setItem(
      "highscore",
      JSON.stringify({
        initials: userInitials,
        score: correctAnswers,
      })
    );
  }
}

// The backButton will reload the page bringing you back to the starting page
function goBack() {
  location.reload();
}

backButton.addEventListener("click", goBack);
submitButton.addEventListener("click", saveHighscore);
startButton.addEventListener("click", startGame);
