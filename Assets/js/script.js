// Array object to store the questions and answers that will be used in the quiz game
var quizQuestions = [
  {
    question: "Question 1",
    answers: ["A", "B", "C", "D", "E"],
    correctAnswer: "A",
  },
  {
    question: " Q 2",
    answers: ["A", "B", "C", "D", "E"],
    correctAnswer: "B",
  },
  {
    question: "Question 3",
    answers: ["A", "B", "C", "D", "E"],
    correctAnswer: "C",
  },
  {
    question: " Q 4",
    answers: ["A", "B", "C", "D", "E"],
    correctAnswer: "D",
  },
];

// Setting the index to 0 on the global scope so that the value
var questionIndex = 0;
// Setting these values on the gloabl scope to make available to all functions
var timeLeft = 20;
var amountLost = 5;
var countDown;
var correctAnswers = 3;

// Variable for the different Pages
var startPage = document.getElementById("start-page");
var questionPage = document.getElementById("questions-page");
var endPage = document.getElementById("end-page");
var highscorePage = document.getElementById("highscore-page");

// Other variables to for elements and such
var backButton = document.getElementById("go-back-button");
var startButton = document.getElementById("start-quiz-button");
var submitButton = document.getElementById("submit-initials-button");
var questionTitle = document.getElementById("question-title");
var questionAnswersSection = document.getElementById("question-answers");
var scoreInput = document.getElementById("initials-input");
var highscoreList = document.getElementById("highscore-list");
var timerEl = document.getElementById("timer");
var highscoreLink = document.getElementById("highscore-link");

//LOCAL STORAGE
var highscore = localStorage.getItem("highscores");
//var score = highscore.score;
//var initials = highscore.initials;

// This function is what is triggered after you click the start game button
function startGame(event) {
  event.preventDefault();
  // Setting previous content to hide and new content to be visible to the user
  startPage.setAttribute("class", "hide");
  questionPage.removeAttribute("class");

  // add true and false value count

  // Triggers next question & Starts timer
  nextQuestion();
  quizTimer();
}

function quizTimer() {
  // Decrement the value of timeLeft and display the updated text
  countDown = setInterval(function () {
    timeLeft--;
    timerEl.innerText = timeLeft;
    // Once the timer reaches a value of 0, I want to end the timer
    if (timeLeft <= 0) {
      clearInterval(countDown);
      timerEl.innerHTML = "0";
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
    console.log("User selected the incorrect answer");
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

  console.log("Quiz finished");
}

function highscoreObject() {
  if (highscore) {
    // This variable turns the string back into an object
    var parsedHighscore = JSON.parse(highscore);

    for (var i = 0; i < parsedHighscore.length; i++) {
      var highscore = highscore[i];

      //var score = highscore.score;
      //var initials = highscore.initials;
    }
  }
}

function saveHighscore(event) {
  event.preventDefault();

  //the score would be saved to local storage
  endPage.setAttribute("class", "hide");
  highscorePage.removeAttribute("class");
  highscoreLink.setAttribute("class", "hide");

  // Using Local Storage to render a highscore board
  // highscore = localStorage.getItem("highscores");

  // this variable is what the user typed into the input box
  var userInitials = scoreInput.value;
  if (!highscore) {
    // Turning the string back into an array
    var parsedHighscore = JSON.parse(highscore);

    // push the new score into the object
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

// Event listeners for all buttons in my quiz
backButton.addEventListener("click", goBack);
submitButton.addEventListener("click", saveHighscore);
startButton.addEventListener("click", startGame);
