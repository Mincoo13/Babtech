xmlhttp = new XMLHttpRequest();
xmlhttp.open("GET", "x.xml", false);
xmlhttp.send();
xmlDoc = xmlhttp.responseXML; 

var meniny = xmlDoc.getElementsByTagName('meniny')[0];
var zaznamy = meniny.getElementsByTagName('zaznam');

var date = '0101';
var name = 'lea';

// HLADANIE PODLA DNA

for(var i = 0; i < zaznamy.length; i++)
{
    var day = zaznamy[i].getElementsByTagName('den')[0].childNodes[0].nodeValue;
    if(day == date)
        break;
}

// HLADANIE PODLA MENA

for (var y = 0; y < zaznamy.length; y++) {
    var SK = zaznamy[y].getElementsByTagName('SK')[0];
    if(SK == undefined)
        var meno = zaznamy[y].getElementsByTagName('SKsviatky')[0].childNodes[0].nodeValue;
    else
        var meno = zaznamy[y].getElementsByTagName('SK')[0].childNodes[0].nodeValue;

    if (meno.toLowerCase() == name.toLowerCase())
        break;
}

var nameexists = zaznamy[i].getElementsByTagName('SK')[0];

if(nameexists)
    console.log(zaznamy[i].getElementsByTagName('SK')[0].childNodes[0].nodeValue);
else
    console.log(zaznamy[i].getElementsByTagName('SKsviatky')[0].childNodes[0].nodeValue);

    console.log(zaznamy[y].getElementsByTagName('den')[0].childNodes[0].nodeValue);

