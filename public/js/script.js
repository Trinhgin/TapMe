// ========= Create Timer, Remember Playername, Send Playername and Score to Server with AJAX ==========

// var boolean = true;
function showScore(score) {
  var divData = $("#score").html(`Your Score: ${score}`);
}

function showRemainingTime(timeRemaining) {
  $("#timer").html(`${timeRemaining}s`);
}

function startGame() {
  var score = 0;
  var name = getPlayerName();
  var counter = 4;

  rememberPlayerName(name);
  hideSignup();
  showRemainingTime(counter);

  showScore(score);
  $("#tapmebutton")
    .off("click")
    .click(() => {
      score++;
      showScore(score);
    });

  var timer = setInterval(function() {
    console.log(counter);
    counter--;
    showRemainingTime(counter);
    moveButton();

    if (counter === 0) {
      clearInterval(timer);

      $("#tapmebutton").prop("disabled", true);
      $("#message").html(`GAME OVER ${name}!`);

      sendNameAndScoreToServer(name, score);
    }
  }, 1000);
}

$("#tapmebutton").click(() => {
  $.when(startGame()).then(
    setTimeout(function() {
      showRetryButton();
      $("#tapmebutton").prop("disabled", false);
    }, 4000)
  );
});
// .then(
//   setTimeout(function() {
//     hideLeaderboard();
//     $("#tapmebutton").prop("diabled", true);
//   }, 4000)
// );

function getPlayerName() {
  var playername = $("#playername").val();
  if (playername == null || playername == undefined || playername == "") {
    playername = "Thunder Cat";
  }
  return playername;
}

function rememberPlayerName(nameinput) {
  Cookies.set("name", nameinput);
}

function showPlayerName() {
  var name = Cookies.get("name");
  $("#playername").val(name);
}
showPlayerName();

function sendNameAndScoreToServer(name, score) {
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

// ========================== Tap Tricks ================================
//First trick: randomnize the position of the tap buton & setInterval

function moveButton() {
  var screen = $("#tapme");
  var button = $("#tapmebutton");
  var spaceW = screen.height() - button.height();
  var spaceH = screen.width() - button.width();
  var moveTop = Math.round(Math.random() * spaceW) + "px";
  var moveLeft = Math.round(Math.random() * spaceH) + "px";
  button.css({ top: moveTop, left: moveLeft });
}

function hideSignup() {
  $(".signup").hide();
}

function hideGameOver() {
  $("#message").hide();
}

function hideLeaderboard() {
  $("#container").hide();
}

function showRetryButton() {
  $("#retry").attr("style", "");
}

$("#retry").click(() => {
  score = 0;
  name = null;
  hideGameOver();
  startGame();
  $("#retry").attr("style", "display:none");
});
