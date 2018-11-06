// ========= Create Timer, Remember Playername, Send Playername and Score to Server with AJAX ==========

// Show Score, Timer, Leaderboard
function showScore(score) {
  var divData = $("#score").html(`Your Score: ${score}`);
}

function showRemainingTime(timeRemaining) {
  $("#timer").html(`${timeRemaining}s`);
}

function showLeaderboard(responseArray) {
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

//Hide 3 things: Signup, GameOver Msg, Leaderboard
function hideSignup() {
  $(".signup").hide();
}

function hideGameOver() {
  $("#message").hide();
}

function hideLeaderboard() {
  $("#container").hide();
}

//  Retry Button
function showRetryButton() {
  $("#retry").attr("style", "");
  // .then(() => {
  //     $("#tapmebutton").prop("disabled", true)
  // })
}

$("#retry").click(() => {
  score = 0;
  name = null;
  hideGameOver();
  hideLeaderboard();
  startGame();

  $("#retry").attr("style", "display:none");
});

//Blur function to avoid Enter & Space buttons are pressed
// function blurTapMe() {
//     $("#tapmebutton").blur()
// }

//Start Game functionalities
function startGame() {
  var score = 0;
  var name = getPlayerName();
  var counter = 4;

  rememberPlayerName(name);
  hideSignup();
  showRemainingTime(counter);

  showScore(score);
  $("#tapmebutton").prop("disabled", false);
  $("#tapmebutton")
    .off("click")
    .click(() => {
      $("#tapmebutton").blur();
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
      showRetryButton();
      $("#tapmebutton").prop("disabled", true);
      $("#message").html(`GAME OVER ${name}!`);

      sendNameAndScoreToServer(name, score);
    }
  }, 1000);
}

$("#tapmebutton").click(() => {
  startGame();
  // .then(
  //     setTimeout(function () {

  //         $("#tapmebutton").prop("disabled", false);
  //     }, 4000)
  // );
});

//Get & remember player's name & score to db
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

//Second trick: disable tapmebutton randomly, if clicks points will be deducted
