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

var questionIndex = 0;

var startPage = document.getElementById("start-page");
var questionPage = document.getElementById("questions-page");
var endPage = document.getElementById("end-page");

var startButton = document.getElementById("start-quiz-button");
var questionTitle = document.getElementById("question-title");
var questionAnswersSection = document.getElementById("question-answers");

function startGame(event) {
  event.preventDefault();
  console.log("Game Started");

  startPage.setAttribute("class", "hide");
  questionPage.removeAttribute("class");

  //set timer

  nextQuestion();
}

function nextQuestion() {
  var questionObject = quizQuestions[questionIndex];

  console.log(questionObject);

  questionTitle.textContent = questionObject.question;

  questionObject.answers.forEach(function (answer) {
    var answerButton = document.createElement("button");
    answerButton.setAttribute("value", answer);

    answerButton.textContent = answer;
    console.log(answerButton);
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
  nextQuestion();
}

startButton.addEventListener("click", startGame);
