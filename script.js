//trojurovnove menu
var menu_items = JSON.parse(menu_items);
var item = [];
var li = [];
var sec_level = [];
var sec_a = [];
var sec_li = [];
var third_level = [];
var third_a = [];
var third_li = [];
var menu = document.getElementById("menu");


for (var i = 0; i < menu_items.items.length; i++) {
    li[i] = document.createElement("li");
    item[i] = document.createElement("a");
    item[i].innerHTML = menu_items.items[i].name;
    item[i].href = menu_items.items[i].src;
    menu.appendChild(li[i]);
    li[i].appendChild(item[i]);
    if (menu_items.items[i].subitems != null) {
        item[i].setAttribute("class", "dropdown-toggle");
        item[i].setAttribute("data-toggle", "dropdown");
        item[i].innerHTML = menu_items.items[i].name + "<b class=" + "caret" + "></b>";
        sec_level[i] = document.createElement("ul");
        sec_level[i].setAttribute("class", "dropdown-menu multi-level");
        li[i].appendChild(sec_level[i]);
        for (var j = 0; j < menu_items.items[i].subitems.length; j++) {
            sec_li[j] = document.createElement("li");
            sec_a[j] = document.createElement("a");
            if (menu_items.items[i].subitems[j].subitems != null) {
                sec_li[j].setAttribute("class", "dropdown-submenu");
                sec_a[j].setAttribute("class", "dropdown-toggle");
                sec_a[j].setAttribute("data-toggle", "dropdown");
                third_level[j] = document.createElement("ul");
                third_level[j].setAttribute("class", "dropdown-menu");
                sec_li[j].appendChild(third_level[j]);
                for (var k = 0; k < menu_items.items[i].subitems[j].subitems.length; k++) {
                    third_li[k] = document.createElement("li");
                    third_a[k] = document.createElement("a");
                    third_a[k].href = menu_items.items[i].subitems[j].subitems[k].src;
                    third_a[k].innerHTML = menu_items.items[i].subitems[j].subitems[k].name;
                    third_li[k].appendChild(third_a[k]);
                    third_level[j].appendChild(third_li[k]);
                }
            } else {
                sec_a[j].href = menu_items.items[i].subitems[j].src;
            }
            sec_a[j].innerText = menu_items.items[i].subitems[j].name;

            sec_li[j].appendChild(sec_a[j]);
            sec_level[i].appendChild(sec_li[j]);

        }
    }
}

//breadcrumbs
var history = [];
var oldItems = JSON.parse(sessionStorage.getItem('itemsArray')) || [];
var page = document.getElementsByTagName("title")[0].innerHTML;
var bread_src = "";
var brdcb_li = [];
var brdcb_a = [];
var brdcb_ol = document.getElementById("brdcb");
oldItems.push(page);
sessionStorage.setItem('itemsArray', JSON.stringify(oldItems));
history = JSON.parse(sessionStorage.getItem('itemsArray')) || [];
for (var l = oldItems.length - 6; l < oldItems.length; l++) {
    brdcb_li[l] = document.createElement("li");
    brdcb_li[l].setAttribute("class", "breadcrumb-item");
    if (l+1 === oldItems.length) {
        brdcb_li[l].setAttribute("class", "breadcrumb-item active");
        brdcb_li[l].setAttribute("aria-current","page");
        brdcb_li[l].innerHTML = oldItems[l];
        brdcb_ol.appendChild(brdcb_li[l]);
        break;
    }
    brdcb_a[l] = document.createElement("a");
    brdcb_a[l].innerHTML = oldItems[l];
    switch (oldItems[l]) {
        case "Domov": bread_src = "index.html";
            break;
        case "Novinky": bread_src = "news.html";
            break;
        case "O Lei": bread_src = "lea_about.html";
            break;
        case "O Dominikovi": bread_src = "dominik_about.html";
            break;
        case "O Milošovi": bread_src = "milos_about.html";
            break;
        case "Dominikova hra": bread_src = "dominik_game.html";
            break;
        case "Leina hra": bread_src = "lea_game.html";
            break;
        case "Milošova hra": bread_src = "milos_game.html";
    }
    if(oldItems[l] === undefined)continue;
    console.log(l+1 + " " + oldItems.length+ " "+oldItems[l]);
    brdcb_a[l].href = bread_src;
    brdcb_li[l].appendChild(brdcb_a[l]);
    brdcb_ol.appendChild(brdcb_li[l]);
}

    var numVisits = GetCookie("numVisits"); 
      if (numVisits) numVisits = parseInt(numVisits) + 1; 
      else numVisits = 1; // the value for the new cookie 
  
  // Show the number of visits 
      if (numVisits==1) console.log("This is your first visit."); 
      else console.log("You have visited this page " + numVisits + " times."); 