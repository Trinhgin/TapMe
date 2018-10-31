// ========= Create a Timer, remember playername, send playername and score to server with AJAX ==========

var name = null;
var score = 0;
function countScore() {
  score++;
  var divData = document.getElementById("score");
  divData.innerHTML = "Your Score: (" + score + ")";
}

function showRemainingTime(timeRemaining) {
  document.getElementById("timer").innerHTML = timeRemaining + "s ";
}

function startGame() {
  name = getPlayerName();
  rememberPlayerName(name);

  var counter = 2;
  showRemainingTime(counter);

  var timer = setInterval(function() {
    console.log(counter);
    counter--;
    showRemainingTime(counter);
    if (counter === 0) {
      console.log("GAME OVER!!");
      clearInterval(timer);
      $("#tapmebutton").attr("disabled", true);
      document.getElementById("message").innerHTML = "GAME OVER " + name + "!";
      sendNameAndScoreToServer();
    }
  }, 1000);
  $("#tapmebutton")
    .off("click")
    .click(() => {
      countScore();
    });
}

$("#tapmebutton").click(() => {
  startGame();
});

function getPlayerName() {
  var name = $("#playername").val();
  if (name == null || name == undefined || name == "") {
    name = "Unicorn";
  }
  return name;
}

function rememberPlayerName(nameinput) {
  Cookies.set("name", nameinput);
}

function showPlayerName() {
  var name = Cookies.get("name");
  $("#playername").val(name);
}
showPlayerName();

function sendNameAndScoreToServer() {
  var sendNameAndScore = $.post(
    "/score",
    { name: name, score: score },
    function(response) {
      if (response.Error) {
        throw error;
      } else {
        console.log(response);
        showLeaderboard(response);
      }
    }
  );
}

function showLeaderboard(responseArray) {
  // Show the leaderboard
  let showResult = "";
  for (i = 0; i < responseArray.length; i++) {
    let showNameAndScore = `<div class="row">
                    <span class="name">${responseArray[i].name}</span>
                    <span class="playerscore">${responseArray[i].score}</span>
                </div>
                `;
    showResult += showNameAndScore;
  }

  $("#container").html(showResult);
}

// ======================= Tap Tricks ===================
//The tap button will have two tricks
//First trick: randomnize the position of the tap buton & setInterval
function randomTapButton() {
  tapButton = document.getElementById("tapme");
  spaceW = screen.height - picture.height;
  spaceH = screen.width - picture.width;

  setInterval(moveButton, 1000);
}

function moveButton() {
  picture.style.top = Math.round(Math.random() * spaceW) + "px";
  picture.style.left = Math.round(Math.random() * spaceH) + "px";
}

//Second trick: turn the tap button to "Don't Tap" -> If tap points will be deducted

// ========================== Try Again Button ===============================
