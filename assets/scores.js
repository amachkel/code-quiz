
 var scoreEl = document.createElement("li");
 var scoresListEl = document.getElementById("scores-list");
 
 scoresListEl.appendChild(scoreEl);
 scoreEl.textContent = initials.value;

//localStorage.getItem("score", score) must make #score equal to time left

