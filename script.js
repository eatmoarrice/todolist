//load local if exists

let items = JSON.parse(localStorage.getItem('localItems'));
if (items == null) {items = [];}
let html = localStorage.getItem('localHTML');
if (html == null) {html = "";}
else document.getElementById("result").innerHTML = html;
console.log(items)

//------------------------

let addItem = () => {
    let item = {
        content: document.getElementById("todoinput").value,
        isDone: false,
    }
    items.push(item);
    updateList(items);
}


let updateList = () => {
    html = "";
    for (let i = 0; i < items.length; i++) {
        if (items[i].isDone == false) {
            html += `<div id="item${i}"><div class="d-flex"><input type="checkbox" class="cb" onchange="done(${i})" id="cb${i}"><li class="li-text">${items[i].content}</li><a class="x-button" href="#" onclick="remove(${i})">x</a></div></div>`;
        }
        else html += `<div id="item${i}"><div class="d-flex"><input type="checkbox" class="cb" checked onchange="done(${i})" id="cb${i}"><li class="li-text"><del>${items[i].content}</del></li><a class="x-button" href="#" onclick="remove(${i})">x</a></div></div>`;    
    }
    document.getElementById("result").innerHTML = html;
    filterDone();
    localStorage.setItem("localHTML", html);
    localStorage.setItem('localItems', JSON.stringify(items));
}


let done = (num) => {
    // if (items[num].isDone == false) {items[num].isDone = true}
    // else items[num].isDone = false;
    items[num].isDone = !items[num].isDone;
    updateList();
};

let remove = (index) => {
    items.splice(index,1);
    console.log(items)
    updateList();
};

let filterDone = () => {
    if (document.getElementById("cbtop").checked == true) {
        for (let i = 0; i < items.length; i++) {
            if (items[i].isDone == true) {document.getElementById(`item${i}`).style.display = "none"};
            console.log(document.getElementById(`item${i}`).style.display)
        }
    }
    else {
        for (let i = 0; i < items.length; i++) {
            if (items[i].isDone == true) {document.getElementById(`item${i}`).style.display = "block"};
        }
    }
}