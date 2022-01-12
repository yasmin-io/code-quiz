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

var startPage = document.getElementById("start-page");
var questionPage = document.getElementById("questions-page");
var endPage = document.getElementById("end-page");

var startButton = document.getElementById("start-quiz-button");
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

  // Stating that the innerHTML is blank stops the new set of questions from reprinting next to the previous ones
  questionAnswersSection.innerHTML = "";
  // For each of the answers in questionObject create buttons with the question Answers inside them as options
  questionObject.answers.forEach(function (answer) {
    var answerButton = document.createElement("button");
    answerButton.setAttribute("value", answer);

    answerButton.textContent = answer;
    // 'On Click' on any of the answer buttons we want to run selectAnswer and clear the previous questions listed
    // ready for the next set
    answerButton.onclick = selectAnswer;
    questionAnswersSection.appendChild(answerButton);
  });
}

function selectAnswer() {
  console.log("Button clicked: ", this.value);
  if (this.value !== quizQuestions[questionIndex].correctAnswer) {
    console.log("User selected the incorrect answer");
    // remove time from timer
  } else {
    console.log("User selected the correct answer");
    //add to the users score
  }

  questionIndex++;

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

  //show end page which inclues an input box and submit button

  //on click of that submit button calls saveHighscore
  //
}

function saveHighscore() {
  //the score would be saved to local storage
}

startButton.addEventListener("click", startGame);
