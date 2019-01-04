

var pieces = document.getElementsByClassName('piece');
var puzzles = document.getElementsByClassName('puzzle');

var id = 0;
var time = document.getElementById("time");
var sec = 0, min = 0, hour = 0;
var t = 0;

var tamHeight = [176,108,188,192,102,68,160,212];

var origX = [324,306,406,297,401,499,425,297];   
var origY = [19,173,67,232,240,255,279,290];

var running = false;

function add() {
    sec++;
    if (sec >= 60) {
        sec = 0;
        min++;
        if (min >= 60) {
            min = 0;
            hour++;
        }
    }
    
    time.textContent = (hour ? (hour > 9 ? hour : "0" + hour) : "00") + ":" + (min ? (min > 9 ? min : "0" + min) : "00") + ":" + (sec > 9 ? sec : "0" + sec);

    timer();
}
function timer() {
    t = setTimeout(add, 1000);
}


for(var i=0;i<pieces.length;i++){
	pieces[i].setAttribute("x", Math.floor((Math.random() * 20) + 20));
	pieces[i].setAttribute("y", Math.floor((Math.random() * 340) + 1));
	pieces[i].setAttribute("height",tamHeight[i]);
	pieces[i].setAttribute("onmousedown","selectElement(evt)");
}

function start(){
	clearInterval(id);
	if(document.getElementById(time) != "00:00:00" ){
		clearTimeout(t);
		sec = 0;
		min = 0;
		hour = 0;
	}
	document.getElementById("time").innerHTML = "00:00:00";
	timer();
	running = true;
	document.getElementById("start").innerHTML = "Reštart";
	for(var i=0;i<pieces.length;i++){
		puzzles[i].style.display= "block";
		pieces[i].setAttribute("x", Math.floor((Math.random() * 20) + 20));
		pieces[i].setAttribute("y", Math.floor((Math.random() * 340) + 1));
	}
}

var elementSelect = 0;  
var currentX = 0;
var currentY = 0;
var currentPosX = 0;
var currentPosY = 0;

function selectElement(evt) {
	elementSelect = reorder(evt);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	currentPosx = parseFloat(elementSelect.getAttribute("x"));     
	currentPosy = parseFloat(elementSelect.getAttribute("y"));
	elementSelect.setAttribute("onmousemove","moveElement(evt)");
}

function moveElement(evt){
	var dx = evt.clientX - currentX;
	var dy = evt.clientY - currentY;
	currentPosx = currentPosx + dx;
	currentPosy = currentPosy + dy;
	elementSelect.setAttribute("x",currentPosx);
	elementSelect.setAttribute("y",currentPosy);
	currentX = evt.clientX;        
	currentY = evt.clientY;
	elementSelect.setAttribute("onmouseout","deselectElement(evt)");
	elementSelect.setAttribute("onmouseup","deselectElement(evt)");
	positioning();
}

function deselectElement(){
	testing();
	if(elementSelect != 0){			
		elementSelect.removeAttribute("onmousemove");
		elementSelect.removeAttribute("onmouseout");
		elementSelect.removeAttribute("onmouseup");
		elementSelect = 0;
	}
}

var box = document.getElementById('box');

function reorder(evt){
	
	var puzzle = evt.target.parentNode;
	var clone = puzzle.cloneNode(true);
	var id = puzzle.getAttribute("id");
	box.removeChild(document.getElementById(id));
	box.appendChild(clone);

	return box.lastChild.firstChild;
}

function positioning(){
	for(var i=0;i<pieces.length;i++){
		if (Math.abs(currentPosx-origX[i])<15 && Math.abs(currentPosy-origY[i])<15) {
			elementSelect.setAttribute("x",origX[i]);
			elementSelect.setAttribute("y",origY[i]);
		}
	}
}
			
var win = document.getElementById("win");

function testing() {
	var placed = 0;
	var puzzles = document.getElementsByClassName('puzzle');
	for(var i=0;i<pieces.length;i++){
		var posx = parseFloat(puzzles[i].firstChild.getAttribute("x"));    
		var posy = parseFloat(puzzles[i].firstChild.getAttribute("y"));
		
		ide = puzzles[i].getAttribute("id");
		ide = ide.replace("piece","");
		if(origX[ide] == posx && origY[ide] == posy){
			placed = placed + 1;
		}
	}
	if(placed == 8){
		running = false;
		document.getElementById("start").innerHTML="Hrať znova";
		clearTimeout(t);
		var timeText = document.getElementById("time").innerHTML;
		for(var i=0;i<pieces.length;i++){
			puzzles[i].style.display= "none";
		}
		sec = 0;
		min = 0;
		hour = 0;
		alert("Gratulujem! Tvoj čas je "+ timeText);
		
	}
}

function demo() {
	clearTimeout(t);
	document.getElementById("time").innerHTML = "00:00:00";
	clearInterval(id);
	var posX = [];
	var posY = [];
	for (var i = 0; i < pieces.length; i++) {
		puzzles[i].style.display = "block";
		posX[i] = Math.floor((Math.random() * 20) + 20);
		posY[i] = Math.floor((Math.random() * 340) + 1)
		pieces[i].setAttribute("x", posX[i]);
		pieces[i].setAttribute("y", posY[i]);
	}

	var i = 0;

	id = setInterval(frame, 0.1);
	function frame() {
		var elem = document.getElementsByClassName(i)[0];
		if (posX[i] < origX[i]) {
			posX[i]++;
			elem.setAttribute("x", posX[i]);
		} else if (posX[i] > origX[i]) {
			posX[i]--;
			elem.setAttribute("x", posX[i]);
		} else 1

		if (posY[i] < origY[i]) {
			posY[i]++;
			elem.setAttribute("y", posY[i]);
		} else if (posY[i] > origY[i]) {
			posY[i]--;
			elem.setAttribute("y", posY[i]);
		} else 1
		if (posX[i] == origX[i] && posY[i] == origY[i]) {
			i++;
			if (i == 8) {
				i = 0;
				clearInterval(id);
				alert("Hra dokoncena!");
			}
		}
	}
}