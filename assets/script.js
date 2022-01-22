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

for (var i = 0; i < buttonsEl.length; i++) {
  buttonsEl[i].addEventListener("click", function(e){
    var userAnswer = e.target.textContent;
    console.log(userAnswer);
    var currentQuestion = questionsArray[userQuestionIndex -1];
    var correctAnswer = currentQuestion.options[currentQuestion.correctAnswer];
    console.log(correctAnswer);
    evaluateAnswer(userAnswer, correctAnswer);
  });
}

function evaluateAnswer(userAnswer,correctAnswer) {
  var rightOrWrongEl = document.getElementById("right-wrong");
  if (userAnswer === correctAnswer) {
    rightOrWrongEl.textContent = "Correct!";
  } else {
    rightOrWrongEl.textContent = "Incorrect";
  }
  renderQuestion(userQuestionIndex);
}
var startButtonEl = document.getElementById("start-button");

startButtonEl.addEventListener("click", onStartButtonClick);

function onStartButtonClick() {
  if (userQuestionIndex != 0) return;
  renderQuestion(userQuestionIndex);
}

function renderQuestion(questionIndex) {
  if (questionIndex >= questionsArray.length) return;
  var questionEl = document.getElementById("question");
  var optionsEl = document.getElementsByClassName("button");
  questionEl.textContent = questionsArray[questionIndex].question;
  for (var i =0; i < optionsEl.length; i++) {
      var currentButton = optionsEl[i];
      currentButton.textContent = questionsArray[questionIndex].options[i];
  }
  if (questionIndex == 0) {
    var cardEl = document.getElementById("card");
    cardEl.style.display = "block";
  }
  userQuestionIndex++;
}
