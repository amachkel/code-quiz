var questionsArray = [
  {
    question: `Inside which HTML element do we put the JavaScript?`,
    options: [
      `<script>`,
      `<javascript>`,
      `<scripting>`,
      `<js>`,
    ],
    correctAnswer: 0,
  },
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
//all questions are buttons
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
  //if quiz has already started, start button does nothing.
  if (userQuestionIndex != 0) return;
  //start button renders first question and starts timer.
  renderQuestion(userQuestionIndex);
  startTimer();
}
var timerCount;
var timer;

function startTimer() {
  timerCount = 30;
  timer = setInterval(function () {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount === 0) {
      rightOrWrongEl.textContent = "You ran out of time. Please refresh page to play again.";
      clearInterval(timer);
    }
  }, 1000);
}

function renderQuestion(questionIndex) {
  //doesn't render question when it reaches the last object in the questionsArray
  if (questionIndex >= questionsArray.length) return;
  var questionEl = document.getElementById("question");
  var optionsEl = document.getElementsByClassName("button");
  //loops through questionsArray options and displays them as buttons for the respective questions
  questionEl.textContent = questionsArray[questionIndex].question;
  for (var i = 0; i < optionsEl.length; i++) {
    
    var currentButton = optionsEl[i];
    currentButton.textContent = questionsArray[questionIndex].options[i];
  }
  //first question(questionIndex[0]) stays hidden until start button is pressed
  if (questionIndex == 0) {
    var cardEl = document.getElementById("card");
    cardEl.setAttribute(
      "class",
      "card custom-card shadow d-flex flex-column align-items-center justify-content-between my-3 mx-5 p-5"
    );
    cardEl.style.display = "flex";
  }

  userQuestionIndex++;
}
//compares userAnswer to correctAnswer. If incorrect, timerCount is decremented.
function evaluateAnswer(userAnswer, correctAnswer) {
  if (userAnswer === correctAnswer) {
    rightOrWrongEl.textContent = "Correct!";
  } else {
    rightOrWrongEl.textContent = "Incorrect";
    if (timerCount > 0) {
      timerCount = Math.floor(timerCount / 1.5);
    }
  }
  //if last question answered, stop timer and end game
  if (userQuestionIndex === questionsArray.length) {
    endGame();

  }
  renderQuestion(userQuestionIndex);
}
var finalScore;
function endGame() {
  //stops timer
  clearInterval(timer);
  //display remaining time as final score w/ button linked to new html page.
  var submitEl = document.getElementById("submit-score");
  var headerEl = document.getElementById("header");
  var cardwrapEl = document.getElementById("card-wrapper");
  //hides questions and answers card and displays submit element
  cardwrapEl.style.display = "none";
  submitEl.style.display = "flex";
  finalScore = timerCount;

  submitEl.setAttribute(
    "class",
    "d-flex flex-column align-items-center justify-content-between my-3 mx-auto p-5"
  );
  headerEl.textContent = "Submit your score: " + finalScore;
  scoreInput(finalScore);
}

function scoreInput(finalScore) {
  var submit = document.getElementById("button-addon2");
  var initials = document.getElementById("initials");

  submit.addEventListener("click", function (e) {
    e.preventDefault();
    var savedScores;
    var savedScoresString = localStorage.getItem("scores");
    //if nothing has been saved yet, give savedScores an empty array
    if (savedScoresString == null) {
      savedScores = [];
    } else {
      savedScores = JSON.parse(savedScoresString);
    }
    var initialsVal = initials.value;
    var scoreObj = {
      score: finalScore,
      initials: initialsVal,
    };
    if (!initialsVal) {
      alert("Error! Please enter your initials to submit your score.");
      return;
    } else {
      savedScores.push(scoreObj);
      localStorage.setItem("scores", JSON.stringify(savedScores));
      window.location = "./scores.html";
    }
  });
}