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

var startButton = document.querySelector(".start-button");

function startGame(event) {
  event.preventDefault();
  console.log("Game Started");
}

function nextQuestion() {}

function selectAnswer() {}

startButton.addEventListener("click", startGame);
