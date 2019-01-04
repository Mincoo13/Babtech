
var puzzles = [];

var endBox = document.getElementById('endBox');
var endBoxText = document.getElementById('endBoxText');
var endTime = document.getElementById('endTime');
endBox.style.display = 'none';
endBoxText.style.display = 'none';

var heightWindow = window.innerHeight;
var widthWindow = window.innerWidth;

var gameBox = document.getElementById('gameBox');
var topBox = gameBox.offsetTop;

var game = document.getElementById('game');
var gameHeight = game.offsetHeight;
var gameWidth = game.offsetWidth;
endBox.style.height = game.offsetHeight + 'px';

var percento = parseFloat((game.offsetHeight * 100) / 1126);

var timer = document.getElementById("timer");
var interval = 0;
var intervalDemo = 0;
var done = 0;
var sec = 0;
var min = 0;
var hou = 0;

function startGame() {

  if (puzzles[1])
  {
    for (var i = 0; i < (puzzles.length - 1); i++)
    {
      puzzles[i+1].remove();
    }
  }
  endBox.style.display = 'none';
  endBoxText.style.display = 'none';
  done = 0;
  sec = 0;
  min = 0;
  hou = 0;

  document.getElementById('start').innerHTML = "Again";

  if (interval > 0) clearInterval(interval);
  if (intervalDemo > 0) clearInterval(intervalDemo);

  interval = setInterval(function() {

      sec++;

      if (sec > 59) {
        sec = 0;
        min++;

        if (min > 59) {
          min = 0;
          hou++;
        }
      }

      timer.innerHTML = hou + ":" + min + ":" + sec;
  }, 1000);

  for (var i = 0; i < parts.length; i++) {
    puzzles[i+1] = document.createElement('img');
    puzzles[i+1].setAttribute('id', i+1);
    puzzles[i+1].setAttribute('class', 'puzzle');
    puzzles[i+1].src = parts[i].src;
    puzzles[i+1].alt = parts[i].title;
    game.appendChild(puzzles[i+1]);

    dragElement(document.getElementById(i+1));

    puzzles[i+1].style.height = ((percento * 500) / 100) + 'px';
    puzzles[i+1].style.width = 'auto';
    puzzles[i+1].style.top = (game.offsetHeight - (puzzles[i+1].offsetHeight / 4)) + 'px';
    puzzles[i+1].style.left = ((i * (game.offsetWidth / parts.length )) - (puzzles[i+1].offsetHeight / 2)) + 'px';
  }
}

window.addEventListener("resize", resizeWindow);
function resizeWindow() {

  if (game.offsetHeight != gameHeight) {

    var per = parseFloat((game.offsetHeight * 100) / 1126);
    var shiftTop = gameHeight - game.offsetHeight;
    var offsetTop = ((shiftTop * 100) / gameHeight);
    var shiftLeft = gameWidth - game.offsetWidth;
    var offsetLeft = ((shiftLeft * 100) / gameWidth);

    for (var i = 0; i < parts.length; i++) {
      puzzles[i+1].style.height = ((per * 500) / 100) + 'px';
      puzzles[i+1].style.width = 'auto';
      puzzles[i+1].style.top = puzzles[i+1].offsetTop - (parseFloat((puzzles[i+1].offsetTop * offsetTop)/100)) + 'px';
      puzzles[i+1].style.left = puzzles[i+1].offsetLeft - (parseFloat((puzzles[i+1].offsetLeft * offsetLeft)/100)) + 'px';
    }
    gameHeight = game.offsetHeight;
    gameWidth = game.offsetWidth;
  }
}


function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "header")) {
    document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
  } else {
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;

    if (verifyPosition(elmnt, elmnt.offsetTop, elmnt.offsetLeft) == true) {

        elmnt.style.top = ((game.offsetHeight * parts[(elmnt.id) - 1].top) / 100) + 'px';
        elmnt.style.left = ((game.offsetWidth * parts[(elmnt.id) - 1].left) / 100) + 'px';

        correctPosition(elmnt);
    }

  }
}

function verifyPosition(puzzle, puzzleTop, puzzleLeft) {
  var tolerance = 5;
  var puzzleTopPercent = (puzzleTop * 100) / parseFloat(game.offsetHeight);
  var puzzleLeftPercent = (puzzleLeft * 100) / parseFloat(game.offsetWidth);

  
   if (((puzzleTopPercent > (parts[(puzzle.id)-1].top - tolerance)) && (puzzleTopPercent < (parts[(puzzle.id)-1].top) + tolerance)) &&
      ((puzzleLeftPercent > (parts[(puzzle.id)-1].left - tolerance)) && (puzzleLeftPercent < (parts[(puzzle.id)-1].left) + tolerance)))

    return true;

  else
    return false;
}

function correctPosition(puzzle) {
  puzzle.style.pointerEvents="none";
  done++;
  if (done == (puzzles.length - 1))
    endGame();
}

function endGame() {
  clearInterval(interval);
  document.getElementById('start').innerHTML = "Play";
  endBox.style.display = 'block';
  endBoxText.style.display = 'block';
  endTime.innerHTML = "Time: " + hou + ":" + min + ":" + sec;
}


function demoGame() {
  startGame();

  if (intervalDemo > 0) clearInterval(intervalDemo);

  var actualTop = [];
  var actualLeft = [];
  var endTop = [];
  var endLeft = [];
  var avg = [];

  for (var j = 1; j < puzzles.length ; j++) {
    actualTop[j] = parseInt(puzzles[j].offsetTop);
    actualLeft[j] = parseInt(puzzles[j].offsetLeft);
    endTop[j] = parseFloat((parts[j-1].top * game.offsetHeight) / 100);
    endLeft[j] = parseFloat((parts[j-1].left * game.offsetWidth) / 100);
    avg[j] = ((endTop[j] - actualTop[j]) + (endLeft[j] - actualLeft[j])) / 2;
    if (avg[j] < 0) avg[j] *= (-1);
  }

    intervalDemo = 0;
    var pos = 0;
    var i = 1;

    intervalDemo = setInterval(function() {
          pos++;

          if (pos == Math.round(avg[i])) {
            i++;
            pos = 0;
              
              if (i == puzzles.length) {
                clearInterval(intervalDemo);
                endGame();
              }
          }

          else {
            actualTop[i] = parseInt(puzzles[i].offsetTop);
            actualLeft[i] = parseInt(puzzles[i].offsetLeft);
            puzzles[i].style.top = (actualTop[i] + (pos * ((endTop[i] - actualTop[i])/avg[i]))) + 'px';
            puzzles[i].style.left = (actualLeft[i] + (pos * ((endLeft[i] - actualLeft[i])/avg[i]))) + 'px';
          }
    }, 5);
}
