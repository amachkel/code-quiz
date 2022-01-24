var questionsArray = [
  {
    question: `How do you write "Hello W3docs" in an alert box?`,
    options: [
      `alertBox("Hello W3docs")`,
      `alert("Hello W3docs");`,
      `modal("Hello W3docs")`,
      `msgBox("Hello W3docs");`,
    ],
    correctAnswer: 1,
  },
  {
    question: `Which is the correct way to write a comment in JavaScript?`,
    options: [`{# ... #}`, `<!--- .... ---!>`, `// ....`, `\\\\ ...`],
    correctAnswer: 3,
  },
  {
    question: `How do you declare a new date in JavaScript?`,
    options: [
      `var date = Date();`,
      `var date = date('now');`,
      `var date = new Date();`,
      `var date = date().current();`,
    ],
    correctAnswer: 2,
  },
  {
    question: `What is JavaScript?`,
    options: [`a pizza`, `programming language`, `a function`, `a method`],
    correctAnswer: 1,
  },
];

var userQuestionIndex = 0; // start on first question in array
var buttonsEl = document.getElementsByClassName("button");
var rightOrWrongEl = document.getElementById("right-wrong");
var userAnswer;
var correctAnswer;

for (var i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener("click", function (e) {
    //renderQuestion() increments question index before event listener fires,
    //so we have to look back 1 index in the questions array.
    var currentQuestion = questionsArray[userQuestionIndex - 1];
    correctAnswer = currentQuestion.options[currentQuestion.correctAnswer];
    userAnswer = e.target.textContent;

    evaluateAnswer(userAnswer, correctAnswer);
  });
}

var startButtonEl = document.getElementById("start-button");

startButtonEl.addEventListener("click", onStartButtonClick);

var timerEl = document.getElementById("timer");

function onStartButtonClick() {
  if (userQuestionIndex != 0) return;
  renderQuestion(userQuestionIndex);

  startTimer();
}
var timerCount;

function startTimer() {
  timerCount = 120;
  var timer = setInterval(function () {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount === 0) {
      rightOrWrongEl.textContent = "You ran out of time.";
      clearInterval(timer);
    }
  }, 1000);
}

function evaluateAnswer(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    rightOrWrongEl.textContent = "Correct!";
  } else {
    rightOrWrongEl.textContent = "Incorrect";
    if (timerCount > 0) {
      timerCount = Math.floor(timerCount / 2);
    }
  }

  renderQuestion(userQuestionIndex);
}

function renderQuestion(questionIndex) {
  if (questionIndex >= questionsArray.length) return;
  var questionEl = document.getElementById("question");
  var optionsEl = document.getElementsByClassName("button");
  questionEl.textContent = questionsArray[questionIndex].question;
  for (var i = 0; i < optionsEl.length; i++) {
    var currentButton = optionsEl[i];
    currentButton.textContent = questionsArray[questionIndex].options[i];
  }
  if (questionIndex == 0) {
    var cardEl = document.getElementById("card");
    cardEl.style.display = "block";
  }
  userQuestionIndex++;
}

// function endGame(questionIndex, currentButton) {
// if (questionIndex >= questionsArray.length) && (currentButton) {

// }
// }

//if (last question answered) {stop timer and end game}
