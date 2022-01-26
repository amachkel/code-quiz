function createListEl(score, initial) {
  var scoreEl = document.createElement("li");
  scoreEl.setAttribute(
    "class",
    "list-group-item custom-list d-flex justify-content-between align-items-center"
  );
  scoreEl.textContent = initial;
  var spanEl = document.createElement("span");
  spanEl.setAttribute("class", "custom-badge badge badge-primary badge-pill");
  spanEl.textContent = score;
  scoreEl.appendChild(spanEl);
  var scoresListEl = document.getElementById("scores-list");

  scoresListEl.appendChild(scoreEl);
}

function renderScores() {
  var scoresListEl = document.getElementById("scores-list");
  scoresListEl.innerHTML = "";
  var savedScoresString = localStorage.getItem("scores");
  if (savedScoresString == null) {
      savedScoresString = JSON.stringify([]);
  }
  var scoreObj = JSON.parse(savedScoresString);

  for (var i = 0; i < scoreObj.length; i++) {
    createListEl(scoreObj[i].score, scoreObj[i].initials);
  }
}
renderScores();

var goBackBtn = document.getElementById("go-back");

goBackBtn.addEventListener("click", function () {
  window.location = "./index.html";
})

var clearBtn = document.getElementById("clear-btn");

clearBtn.addEventListener("click", function() {
  localStorage.clear();
  renderScores();
})