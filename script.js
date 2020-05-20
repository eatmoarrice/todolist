let items = [];
let checkboxdata;

let addItem = () => {
    let item = {
        content: document.getElementById("todoinput").value,
        isDone: false,
    };
    items.push(item);
    updateList(items);
};

let updateList = () => {
    let html = "";
    for (let i = 0; i < items.length; i++) {
        if (items[i].isDone == false) {
            html += `<div id="item${i}"><div class="d-flex"><input type="checkbox" class="cb" onchange="done(${i})" id="cb${i}"><li class="li-text">${items[i].content}</li><a class="x-button" href="#" onclick="remove(${i})">x</a></div></div>`;
            
        } else html += `<div id="item${i}"><div class="d-flex"><input type="checkbox" class="cb" checked onchange="done(${i})" id="cb${i}"><li class="li-text"><del>${items[i].content}</del></li><a class="x-button" href="#" onclick="remove(${i})">x</a></div></div>`;
    }
    document.getElementById("result").innerHTML = html;
    filterDone();
    localStorage.setItem("localItems", JSON.stringify(items));
    hideBubble();
};

let done = (num) => {
    items[num].isDone = !items[num].isDone;
    updateList();
};

let remove = (index) => {
    items.splice(index, 1);
    updateList();
};

let filterDone = () => {
    if (document.getElementById("cbtop").checked == true) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].isDone == true) {
                document.getElementById(`item${i}`).style.display = "none";
            }
            console.log(document.getElementById(`item${i}`).style.display);
        }
    } else {
        for (let i = 0; i < items.length; i++) {
            if (items[i].isDone == true) {
                document.getElementById(`item${i}`).style.display = "block";
            }
        }
    }
    checkboxdata = document.getElementById("cbtop").checked;
    localStorage.setItem("checkboxcheck", JSON.stringify(checkboxdata));
};

let complete = () => {
    return items.every((smallitem) => {
        return smallitem.isDone == true;
    });
};

let hideBubble = () => {
    console.log(items);
    if (complete() && items.length > 0) {
        document.getElementById("bubble").style.display = "block";
    } else {
        document.getElementById("bubble").style.display = "none";
    }
};

let load = () => {
    checkboxdata = JSON.parse(localStorage.getItem("checkboxcheck"));
    if (checkboxdata == null) {
        checkboxdata = false;
    }
    document.getElementById("cbtop").checked = checkboxdata;
    items = JSON.parse(localStorage.getItem("localItems"));
    if (items == null) {
        items = [];
    }
    updateList();
    hideBubble();
};

load();
