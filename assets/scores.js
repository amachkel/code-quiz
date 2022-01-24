
var submit = document.getElementById("submit");

submit.addEventListener("click", function(e) {
    e.preventDefault();

    var scoreEl = document.createElement("li");
    var scoresListEl = document.getElementById("scores-list");
    var initials = document.getElementById("initials");

    scoresListEl.appendChild(scoreEl);
    scoreEl.textContent = initials.value;
    
})



//localStorage.getItem("score", score) must make #score equal to time left

