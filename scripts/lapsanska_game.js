var puzzle = {
    "pieces": [
        {
            src:"img/1.png",
            top: 0,
            left: -500
        },
        {
            src:"img/2.png",
            top: 0,
            left: -345
        },
        {
            src:"img/3.png",
            top: 0,
            left: -181
        }
        ,
        {
            src:"img/4.png",
            top: 114,
            left: -180
        },
        {
            src:"img/5.png",
            top: 96,
            left: -364
        },
        {
            src:"img/6.png",
            top: 98,
            left: -500
        },
        {
            src:"img/7.png",
            top: 239,
            left: -500
        },
        {
            src:"img/8.png",
            top: 225,
            left: -344
        },
        {
            src:"img/9.png",
            top: 240,
            left: -180
        },
        {
            src:"img/10.png",
            top: 345,
            left: -198
        },
        {
            src:"img/11.png",
            top: 345,
            left: -342
        },
        {
            src:"img/12.png",
            top: 345,
            left: -500
        }
    ]
};

var element = {
    "position": [
        {
            src:"img/1.png",
            top: 360,
            left: 8
        },
        {
            src:"img/2.png",
            top: 0,
            left: 5
        },
        {
            src:"img/3.png",
            top: -5,
            left: 339
        }
        ,
        {
            src:"img/4.png",
            top: 198,
            left: 142
        },
        {
            src:"img/5.png",
            top: -1,
            left: 150
        },
        {
            src:"img/6.png",
            top: 83,
            left: 236
        },
        {
            src:"img/7.png",
            top: 126,
            left: 13
        },
        {
            src:"img/8.png",
            top: 255,
            left: 312
        },
        {
            src:"img/9.png",
            top: 349,
            left: 189
        },
        {
            src:"img/10.png",
            top: 151,
            left: 326
        },
        {
            src:"img/11.png",
            top: 229,
            left: 14
        },
        {
            src:"img/12.png",
            top: 336,
            left: 330
        }
    ]
};

var counter = 0;
var timer = false;
var minutesLabel = document.getElementById("minutes");
var secondsLabel = document.getElementById("seconds");
var totalSeconds = 0;
var timer_reset = 0;
//Make the DIV element draggagle:
function start() {
    dragElement(document.getElementById("p_0"));
    dragElement(document.getElementById("p_1"));
    dragElement(document.getElementById("p_2"));
    dragElement(document.getElementById("p_3"));
    dragElement(document.getElementById("p_4"));
    dragElement(document.getElementById("p_5"));
    dragElement(document.getElementById("p_6"));
    dragElement(document.getElementById("p_7"));
    dragElement(document.getElementById("p_8"));
    dragElement(document.getElementById("p_9"));
    dragElement(document.getElementById("p_10"));
    dragElement(document.getElementById("p_11"));

    for (var j=0; j< element.position.length; j++){
        var piece = document.getElementById("p_"+ j);
        piece.style.pointerEvents = "auto";
    }

    timer = true;
    document.getElementById("start").setAttribute('disabled','disabled');
    document.getElementById("demo").setAttribute('disabled','disabled');
    totalSeconds = 0;
    document.getElementById("minutes").innerHTML= "00";
    document.getElementById("seconds").innerHTML="00";
    timer_reset = setInterval(setTime, 1000);

    function dragElement(elmnt) {
        var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";

        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;

            var id = elmnt.id.replace('p_', '');
            var tolerance = 50;
            var top = puzzle.pieces[id].top;
            var left = puzzle.pieces[id].left;
            if ((elmnt.offsetTop >= (top - tolerance)) && (elmnt.offsetTop <= (top + tolerance)) && ((elmnt.offsetLeft >= (left - tolerance)) && (elmnt.offsetLeft <= (left + tolerance)))) {
                elmnt.style.top = puzzle.pieces[id].top + "px";
                elmnt.style.left = puzzle.pieces[id].left + "px";
                elmnt.style.pointerEvents = "none";

                end();

            }

        }
    }

    function end() {
        counter++;
        console.log(counter);
        if (counter == puzzle.pieces.length) {
            setTimeout(function () {
                alert("Gratulujeme hra ti trvala " + document.getElementById("minutes").textContent + " minút a " + document.getElementById("seconds").textContent + " sekúnd");
            }, 500);
            timer = false;
            counter = 0;
        }
    }


}

function setTime() {
    if (timer == true)
        ++totalSeconds;
    secondsLabel.innerHTML = pad(totalSeconds % 60);
    minutesLabel.innerHTML = pad(parseInt(totalSeconds / 60));
}

function pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
        return "0" + valString;
    } else {
        return valString;
    }
}


function demo(i) {
    document.getElementById("start").setAttribute('disabled','disabled');
    document.getElementById("reset").setAttribute('disabled','disabled');
    document.getElementById("demo").setAttribute('disabled','disabled');
    if (i >= puzzle.pieces.length) {
        document.getElementById("reset").disabled = false;
        return;
    }
    var piece = document.getElementById("p_"+ i);
    piece.style.top = puzzle.pieces[i].top + "px";
    piece.style.left = puzzle.pieces[i].left + "px";
    i++;
    setTimeout(function(){demo(i);}, 500);
}

function reset() {
    clearInterval(timer_reset);
    document.getElementById("minutes").innerHTML= "00";
    document.getElementById("seconds").innerHTML="00";
    for (var j=0; j< element.position.length; j++){
        var piece = document.getElementById("p_"+ j);
        piece.style.top = element.position[j].top + "px";
        piece.style.left = element.position[j].left + "px";
    }
    document.getElementById("start").disabled = false;
    document.getElementById("demo").disabled = false;
}