// when i open page i see a start button
// when i press start button, i see the game elements start and the timer starts counting down
  // game start function
  // timer function
  // some way to get the starting page to disappear


  // target buttons
var choicesSpan1 = document.querySelector('#choices-span1')
var choicesSpan2 = document.querySelector('#choices-span2')
var choicesSpan3 = document.querySelector('#choices-span3')
var choicesSpan4 = document.querySelector('#choices-span4')
var currentQuestion = {}
var correctAnswer
let startBtn = document.querySelector('.start-btn')
let timeLeft = 6
let questionIndex = 0
var score = 0;
var queCount = 0;
let questions = [
  {
    question: "Question goes here.",
    choices: ["Choice1", "Choice2", "Choice3", "Choice4"],
    answer: "Choice1"
  },
  {
    question: "Question goes here.",
    choices: ["Choice1", "Choice2", "Choice3", "Choice4"],
    answer: "Choice1"
  },
  {
    question: "Question goes here.",
    choices: ["Choice1", "Choice2", "Choice3", "Choice4"],
    answer: "Choice1"
  },
  {
    question: "Question goes here.",
    choices: ["Choice1", "Choice2", "Choice3", "Choice4"],
    answer: "Choice1"
  },
]


function renderQuestion() {
  let currentQuestionObject = questions [questionIndex]
  document.querySelector('.question-text').innerText = currentQuestionObject.question
  
}

// console.log('hello')

startBtn.addEventListener('click', function() {
  document.querySelector('#rules').style.display = "none"
  document.querySelector('#questions').classList.remove('hide')
  startTimer()
  renderQuestion()
}) 

function startTimer() {
  var timer = setInterval(function() {
    timeLeft--
    document.querySelector('#time-left').innerText = " Time Left: " + timeLeft
  }, 1000)
      if (timer === 0) clearInterval(timeLeft)
}

function renderQuestion() {
  currentQuestion = questions[index]
  questionDisplay.innerText = currentQuestion.question
  choicesSpan1.innerText = currentQuestion.answers[0]
  choicesSpan2.innerText = currentQuestion.answers[1]
  choicesSpan3.innerText = currentQuestion.answers[2]
  choicesSpan4.innerText = currentQuestion.answers[3]
  correctAnswer = currentQuestion.solution
}

function quizEnd(){
  quizBox.classList.add("hide");
  endBox.classList.remove("hide");
  const scoreText = document.querySelector(".score");
  let scoreTag = '<h3 class="score"> Your score was '+ score +' out of 10!</h3>';
  scoreText.innerHTML = scoreTag; 
}