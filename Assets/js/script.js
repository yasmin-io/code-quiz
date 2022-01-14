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
//
//(finish this)!!!!
//
//
//
var questionIndex = 0;
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

// This function is what is triggered after you click the start game button
function startGame(event) {
  event.preventDefault();

  startPage.setAttribute("class", "hide");
  questionPage.removeAttribute("class");

  //set timer

  nextQuestion();
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
  //FINISH THIS
  if (this.value !== quizQuestions[questionIndex].correctAnswer) {
    console.log("User selected the incorrect answer");
    // remove time from timer
    // REMOVE STUFF FROM TIMER USING TIMER INTERVAL
  } else {
    console.log("User selected the correct answer");
    //add to the users score
  }

  // Move to the next question
  questionIndex++;

  // If the current question is the last question available then run the endQuiz function but
  // if not, then the game hasn't. Run the nextQuestion function and display a new question.
  if (questionIndex === quizQuestions.length) {
    endQuiz();
  } else {
    nextQuestion();
  }
}

function endQuiz() {
  console.log("Quiz finished");

  //clear interval

  //hide questions section
  questionPage.setAttribute("class", "hide");
  endPage.removeAttribute("class");

  //show end page which inclues an input box and submit button

  //on click of that submit button calls saveHighscore
  //
}

function saveHighscore() {
  //the score would be saved to local storage
  endPage.setAttribute("class", "hide");
  highscorePage.removeAttribute("class");
}

function goBack() {
  // The backButton will reload the page bringing you back to the starting page
  location.reload();
}

backButton.addEventListener("click", goBack);
submitButton.addEventListener("click", saveHighscore);
startButton.addEventListener("click", startGame);
