var menu_items = JSON.parse(menu_items);
var item = [];
var li = [];
var sec_level = [];
var sec_a = [];
var menu = document.getElementById("menu");


for (var i = 0; i < menu_items.items.length; i++) {
        li[i] = document.createElement("li");
        li[i].setAttribute("class", "nav-item");
        item[i] = document.createElement("a");
        item[i].innerHTML = menu_items.items[i].name;
        item[i].href = menu_items.items[i].src;
        
        console.log(i, menu_items.items[i], item[i]);
        menu.appendChild(li[i]);
        li[i].appendChild(item[i]);
        if(menu_items.items[i].subitems != null) { 
            li[i].setAttribute("class", "nav-item dropdown");
            item[i].setAttribute("class", "nav-link dropdown-toggle");
            item[i].setAttribute("id", "navbarDropdown");
            item[i].setAttribute("role", "button");
            item[i].setAttribute("data-toggle", "dropdown");
            item[i].setAttribute("aria-haspopup", "true");
            item[i].setAttribute("aria-expanded", "false");
            sec_level[i]= document.createElement("div");
            sec_level[i].setAttribute("id","dropdown");
            sec_level[i].setAttribute("class","dropdown-menu");
            sec_level[i].setAttribute("aria-labelledby","navbarDrodown");
            li[i].appendChild(sec_level[i]);
            for(var j=0;j<menu_items.items[i].subitems.length; j++){
                sec_a[j]= document.createElement("a");
                sec_a[j].setAttribute("class","dropdown-item");
                sec_a[j].innerHTML=menu_items.items[i].subitems[j].name;
                sec_a[j].href = menu_items.items[i].subitems[j].subitems[1].src;
                sec_level[i].appendChild(sec_a[j]);
                console.log("som tu heh");
            }
            
        }
        else item[i].setAttribute("class", "nav-link");
}
