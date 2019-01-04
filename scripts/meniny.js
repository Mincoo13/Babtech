xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "../scripts/x.xml", false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML;

var who;
var bla;

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;

if (dd < 10) {
    dd = '0' + dd
}

if (mm < 10) {
    mm = '0' + mm
}
today = dd + '.' + mm + ".";
var now = mm + dd;


var meniny = xmlDoc.getElementsByTagName('meniny')[0];
var zaznamy = meniny.getElementsByTagName('zaznam');


var date = '010';
//var name = 'lea';
var name;

// HLADANIE PODLA DNA

for (var i = 0; i < zaznamy.length; i++) {
    var day = zaznamy[i].getElementsByTagName('den')[0].childNodes[0].nodeValue;
    if (day == now)
        break;
}

var nameexists = zaznamy[i].getElementsByTagName('SK')[0];

if (nameexists) {
    bla = " a meniny má ";
    who = zaznamy[i].getElementsByTagName('SK')[0].childNodes[0].nodeValue;
} else {
    bla = " a je ";
    who = zaznamy[i].getElementsByTagName('SKsviatky')[0].childNodes[0].nodeValue;
}


document.getElementById("date").innerHTML = ("Dnes je " + today + bla + who);

function findDay() {
    var p;
    var div = document.getElementById("result");
    div.innerHTML = "";

    name = document.getElementById("name").value;
    
    var input_clear = RemoveAccents(name);
    var menoCZ = CZ(input_clear);
    var menoSKd = SKd(input_clear);
    var menoPL = PL(input_clear);
    var menoAT = AT(input_clear);
    var menoHU = HU(input_clear);

    if (menoSKd != undefined) {
        p = document.createElement("p");
        p.innerHTML = "Na Slovensku: " + revertDate(menoSKd);
        div.appendChild(p);
    }

    if (menoCZ != undefined) {
        p = document.createElement("p");
        p.innerHTML = "V Česku: " + revertDate(menoCZ);
        div.appendChild(p);
    }

    if (menoPL != undefined) {
        p = document.createElement("p");
        p.innerHTML = "V Poľsku: " + revertDate(menoPL);
        div.appendChild(p);
    }

    if (menoAT != undefined) {
        p = document.createElement("p");
        p.innerHTML = "V Rakúsku: " + revertDate(menoAT);
        div.appendChild(p);
    }

    if (menoHU != undefined) {
        p = document.createElement("p");
        p.innerHTML = "V Maďarsku: " + revertDate(menoHU);
        div.appendChild(p);
    }
}

function revertDate(str) {
    var new_date = str[2] + str[3] + "." + str[0] + str[1] + ".";
    return new_date;
}

function CZ(name) {
    var meno_den;
    var meniny = xmlDoc.getElementsByTagName('meniny')[0];
    var zaznamy = meniny.getElementsByTagName('zaznam');
    for (var y = 0; y < zaznamy.length; y++) {
        var CZ = zaznamy[y].getElementsByTagName("CZ")[0];
        if (CZ != undefined) {
            var meno = zaznamy[y].getElementsByTagName("CZ")[0].childNodes[0].nodeValue;
            var arr = stringToArray(meno);
            var length = arr.length;
            for (var i = 0; i < length; i++) {
                var clear_name = RemoveAccents(arr[i]);
                if (clear_name.toLowerCase() == name.toLowerCase()) {
                    meno_den = zaznamy[y].getElementsByTagName('den')[0].childNodes[0].nodeValue;
                    return meno_den;
                    break;
                } else meno_den = undefined;
            }
        }
    }
    return meno_den;
}

function SKd(name) {
    var meno_den;
    var meniny = xmlDoc.getElementsByTagName('meniny')[0];
    var zaznamy = meniny.getElementsByTagName('zaznam');
    for (var y = 0; y < zaznamy.length; y++) {
        var SKd = zaznamy[y].getElementsByTagName("SKd")[0];
        if (SKd != undefined) {
            var meno = zaznamy[y].getElementsByTagName("SKd")[0].childNodes[0].nodeValue;
            var arr = stringToArray(meno);
            var length = arr.length;
            for (var i = 0; i < length; i++) {
                var clear_name = RemoveAccents(arr[i]);
                if (clear_name.toLowerCase() == name.toLowerCase()) {
                    meno_den = zaznamy[y].getElementsByTagName('den')[0].childNodes[0].nodeValue;
                    return meno_den;
                    break;
                } else meno_den = undefined;
            }
        }
    }
    return meno_den;
}

function HU(name) {
    var meno_den;
    var kill;
    var meniny = xmlDoc.getElementsByTagName('meniny')[0];
    var zaznamy = meniny.getElementsByTagName('zaznam');
    for (var y = 0; y < zaznamy.length; y++) {
        var HU = zaznamy[y].getElementsByTagName("HU")[0];
        if (HU != undefined) {
            var meno = zaznamy[y].getElementsByTagName("HU")[0].childNodes[0].nodeValue;
            var arr = stringToArray(meno);
            var length = arr.length;
            for (var i = 0; i < length; i++) {
                var clear_name = RemoveAccents(arr[i]);
                if (clear_name.toLowerCase() == name.toLowerCase()) {
                    meno_den = zaznamy[y].getElementsByTagName('den')[0].childNodes[0].nodeValue;
                    kill = true;
                    return meno_den;
                    break;
                } else meno_den = undefined;
            }
            if (kill == true) break;
        }
    }
    return meno_den;
}

function PL(name) {
    var meno_den;
    var meniny = xmlDoc.getElementsByTagName('meniny')[0];
    var zaznamy = meniny.getElementsByTagName('zaznam');
    for (var y = 0; y < zaznamy.length; y++) {
        var PL = zaznamy[y].getElementsByTagName("PL")[0];
        if (PL != undefined) {
            var meno = zaznamy[y].getElementsByTagName("PL")[0].childNodes[0].nodeValue;
            var arr = stringToArray(meno);
            var length = arr.length;
            for (var i = 0; i < length; i++) {
                var clear_name = RemoveAccents(arr[i]);
                if (clear_name.toLowerCase() == name.toLowerCase()) {
                    meno_den = zaznamy[y].getElementsByTagName('den')[0].childNodes[0].nodeValue;
                    return meno_den;
                    break;
                } else meno_den = undefined;
            }
        }
    }
    return meno_den;
}

function AT(name) {
    var meno_den;
    var meniny = xmlDoc.getElementsByTagName('meniny')[0];
    var zaznamy = meniny.getElementsByTagName('zaznam');
    for (var y = 0; y < zaznamy.length; y++) {
        var AT = zaznamy[y].getElementsByTagName("AT")[0];
        if (AT != undefined) {
            var meno = zaznamy[y].getElementsByTagName("AT")[0].childNodes[0].nodeValue;
            var arr = stringToArray(meno);
            var length = arr.length;
            for (var i = 0; i < length; i++) {
                var clear_name = RemoveAccents(arr[i]);
                if (clear_name.toLowerCase() == name.toLowerCase()) {
                    meno_den = zaznamy[y].getElementsByTagName('den')[0].childNodes[0].nodeValue;
                    return meno_den;
                    break;
                } else meno_den = undefined;
            }
        }
    }
    return meno_den;
}

function stringToArray(str) {
    var res = str.replace(/,/g, "");
    res = res.split(" ");
    return res;
}

function stringPoint(str) {
    var res = str.replace(/\./g, "");
    res = res.split("");
    return res;
}

function RemoveAccents(strAccents) {
    var strAccents = strAccents.split('');
    var strAccentsOut = new Array();
    var strAccentsLen = strAccents.length;
    var accents = 'ÁáÉéÍíĹĺÓóŔŕÚúÝýČčĎďĽľŇňŠšŤťŽžÄäÔô';
    var accentsOut = "AaEeIiLlOoReUuYyCcDdLlNnSsTtZzAaOo";
    for (var y = 0; y < strAccentsLen; y++) {
        if (accents.indexOf(strAccents[y]) != -1) {
            strAccentsOut[y] = accentsOut.substr(accents.indexOf(strAccents[y]), 1);
        } else
            strAccentsOut[y] = strAccents[y];
    }
    strAccentsOut = strAccentsOut.join('');
    return strAccentsOut;
}

function findName() {
    var final_date;
    var input_day = document.getElementById("day").value;
    var exist;
    for (var l=0; l < input_day.length; l++){
        if (input_day[l] == ".") {
            exist = true;
            break;
        } else exist = false;
    }
    if (exist) {
        var point_out = stringPoint(input_day);
        var length = point_out.length;
        if (length != 4) {
            var regex = input_day.split('.');
            if (regex[0].length != 2) {
                regex[0] = "0" + regex[0][0];
            }
            if (regex[1].length != 2) {
                regex[1] = "0" + regex[1][0];
            }
            final_date = regex[1] + regex[0];
        } else {
            final_date = point_out[2] + point_out[3] + point_out[0] + point_out[1];
        }
    } else alert("Zlý formát dátumu alebo dátum, ktorý neexistuje! Správny formát: 01.01. alebo 1.1.");

    var meniny = xmlDoc.getElementsByTagName('meniny')[0];
    var zaznamy = meniny.getElementsByTagName('zaznam');
    var p;
    var div = document.getElementById('result_2');
    div.innerHTML = "";

    for (var i = 0; i < zaznamy.length; i++) {
        var day = zaznamy[i].getElementsByTagName('den')[0].childNodes[0].nodeValue;
        var nameSKd = zaznamy[i].getElementsByTagName('SKd')[0];
        var nameCZ = zaznamy[i].getElementsByTagName('CZ')[0];
        var holidayCZ = zaznamy[i].getElementsByTagName('CZsviatky')[0];
        var namePL = zaznamy[i].getElementsByClassName('PL');
        var nameHU = zaznamy[i].getElementsByClassName('HU');
        var nameAT = zaznamy[i].getElementsByClassName('AT');
        if (day == final_date) {
            if (nameSKd) {
                p = document.createElement("p");
                p.innerHTML = "Na Slovensku: " + zaznamy[i].getElementsByTagName('SKd')[0].childNodes[0].nodeValue;
                div.appendChild(p);
            } else {
                p = document.createElement("p");
                p.innerHTML = "Na Slovensku je sviatok: " + zaznamy[i].getElementsByTagName('SKsviatky')[0].childNodes[0].nodeValue;
                div.appendChild(p);
            }

            if (nameCZ == undefined) {
                if (holidayCZ == undefined) {
                    var CZmeno = '-';
                } else {
                    p = document.createElement("p");
                    p.innerHTML = "V Česku je sviatok: " + zaznamy[i].getElementsByTagName('CZsviatky')[0].childNodes[0].nodeValue;
                    div.appendChild(p);
                }
            } else {
                p = document.createElement("p");
                p.innerHTML = "V Česku: " + zaznamy[i].getElementsByTagName('CZ')[0].childNodes[0].nodeValue;
                div.appendChild(p);
            }

            if (namePL) {
                p = document.createElement("p");
                p.innerHTML = "V Poľsku: " + zaznamy[i].getElementsByTagName('PL')[0].childNodes[0].nodeValue;
                div.appendChild(p);
            }

            if (nameHU) {
                p = document.createElement("p");
                p.innerHTML = "V Maďarsku: " + zaznamy[i].getElementsByTagName('HU')[0].childNodes[0].nodeValue;
                div.appendChild(p);
            }

            if (nameAT) {
                p = document.createElement("p");
                p.innerHTML = "V Rakúsku: " + zaznamy[i].getElementsByTagName('AT')[0].childNodes[0].nodeValue;
                div.appendChild(p);
            }
            break;
        }
        if (i == zaznamy.length)
            alert("Zlý formát dátumu alebo dátum, ktorý neexistuje! Správny formát: 01.01. alebo 1.1.");

    }
}

var i = localStorage.getItem('on_load_counter');
if (i === null) {
    i = 0;
}
i++;
localStorage.setItem("on_load_counter", i);
document.getElementById('counter').innerHTML = 'Náš web si navštívil <b>' + i + '</b> krát';
