var startBtn = document.querySelector("#start-btn");
var highscoreBtn = document.querySelector("#highscores-btn");
var homeBtn = document.querySelector("#home-btn");
var highScoreContainer = document.querySelector("#highscores-container");
// var loser = document.querySelector("#loser");
var solutionText = document.querySelector("#solution-text");
var endQuizContainer = document.querySelector("#end-quiz-container");
var time;
var timer = 60;
var timerElement = document.querySelector("#timer");
var timerContainer = document.querySelector("#timer-container");
var questionContainer = document.querySelector("#question-container");
var questionText = document.querySelector("#questions-text");
var playerName = document.querySelector("#player-name");
var answerBtns = Array.from(document.getElementsByClassName("answer-btn"));
var submitBtn = document.querySelector("#submit-btn");
var header = document.querySelector("#homepage");
var body = document.body;
var answerContainer = document.querySelector("#answer-container");
var answer1 = document.querySelector("#answer1");
var answer2 = document.querySelector("#answer2");
var answer3 = document.querySelector("#answer3");
var answer4 = document.querySelector("#answer4");
var correctAnswer;
var scoreInput = document.querySelector("#score-input");
var scoresList = document.querySelector("#highscores-list");
var scoresList;
var score;
var index = 0;
var unansweredQuestions = [];
var currentQuestion = {};
var questionsList = [
  {
    question: "Where did chili con carne (chili with meat) likely originate?",
    answers: ["Mexico", "Texas", "New Mexico", "Arizona"],
    solution: "Texas",
  },

  {
    question:
      "What was the main ingredient in the chili con carne served at the 1893 World's Fair in Chicago?",
    answers: ["Beef", "Venison", "Buffalo", "Alligator"],
    solution: "Buffalo",
  },

  {
    question:
      "Which American president was known to be a fan of chili con carne and often served it at the White House?",
    answers: [
      "Franklin D. Roosevelt",
      "Lyndon B. Johnson",
      "Richard Nixon",
      "Ronald Reagan",
    ],
    solution: "Lyndon B. Johnson",
  },

  {
    question: "What was the main controversy surrounding chili?",
    answers: [
      "Whether it should be served with beans or without",
      "Whether it should be made with tomatoes or not",
      "Whether it was appropriate to eat in public",
      "Whether it was too spicy for most people",
    ],
    solution: "Whether it should be served with beans or without",
  },

  {
    question:
      "Which city in Texas is considered by many to be the birthplace of the modern chili cook-off?",
    answers: ["San Antonio", "Houston", "Dallas", "Fort Worth"],
    solution: "San Antonio",
  },
];

startBtn.addEventListener("click", startGame);
highscoreBtn.addEventListener("click", showScores);
submitBtn.addEventListener("click", submit);

function startGame(e) {
  e.stopPropagation();
  header.setAttribute("class", "hidden");
  questionContainer.setAttribute("class", "visible");
  timerContainer.setAttribute("class", "visible");
  index = 0;
  unansweredQuestions = [...questionsList];
  startTimer();
  displayQuestion();
}

function displayQuestion() {
  currentQuestion = questionsList[index];
  console.log(currentQuestion);
  questionText.innerText = currentQuestion.question;
  answer1.innerText = currentQuestion.answers[0];
  answer2.innerText = currentQuestion.answers[1];
  answer3.innerText = currentQuestion.answers[2];
  answer4.innerText = currentQuestion.answers[3];
  correctAnswer = currentQuestion.solution;
}

answerBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log(button.textContent);
    if (button.textContent !== correctAnswer) {
      timer -= 15;
      solutionText.innerText = "Wrong";
    } else {
      solutionText.innerText = "Right";
    }
    ++index;
    if (index < questionsList.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  });
});

if (localStorage.getItem("highScores")) {
  scoresList = JSON.parse(localStorage.getItem("highScores"));
} else {
  scoresList = [];
}

function showScores() {
  header.setAttribute("class", "hidden");
  highScoreContainer.setAttribute("class", "visible");
  printHighscores();
}

function startTimer() {
  time = setInterval(function () {
    timer--;
    timerElement.textContent = "Time Remaining: " + timer;

    if (timer <= 0) {
      clearInterval(time);
      endQuiz();
    }
  }, 1000);
}

// function lose() {
//   timerContainer.setAttribute("class", "hidden");
//   loser.setAttribute("class", "visible");
//   questionContainer.setAttribute("class", "hidden");
// }

function endQuiz() {
  clearInterval(time);
  score = timer;
  if (score <= 0) {
    window.location.reload();
  } else {
    console.log(score);
    questionContainer.setAttribute("class", "hidden");
    endQuizContainer.setAttribute("class", "visible");
    scoreInput.innerText = "Your final score: " + score;
    timerContainer.setAttribute("class", "hidden");
  }
}

function submit(e) {
  e.preventDefault();
  index++;
  if (playerName.value.trim() == "") {
    alert("Please insert at least 1 character.");
    return;
  } else {
    var newScore = {
      name: playerName.value.trim(),
      score: timer,
    };
    scoresList.push(newScore);

    scoresList.sort(function (a, b) {
      return b.score - a.score;
    });
    localStorage.setItem("highScores", JSON.stringify(scoresList));
  }
  printHighscores();
}

var scoresPull = JSON.parse(localStorage.getItem("highScores"));

function printHighscores() {
  for (var i = 0; i < scoresList.length; i++) {
    let li = document.createElement("li");
    li.textContent = `${scoresList[i].name} ${scoresList[i].score}`;
    scoresList.append(li);
  }
  highScoreContainer.setAttribute("class", "visible");
  victoryContainer.setAttribute("class", "hidden");
}
