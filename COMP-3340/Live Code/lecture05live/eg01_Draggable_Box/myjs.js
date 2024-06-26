window.addEventListener("load", init);

function init() {
    /* 
    var obj = document.getElementById("box6");
    if (obj != null)
        obj.addEventListener("click", box6_click);
    */
    document.getElementById("box6").addEventListener("click", box6_click);


    var obj = document.getElementById("box4");
    obj.addEventListener("dragstart", box4_dragstart);
    //obj.addEventListener("dropend", box4_dragend);
    obj.setAttribute("draggable", "true");

    var obj2 = document.getElementById("box5");
    obj2.addEventListener("drop", box5_drop);
    obj2.addEventListener("dragover", box5_dragover);
}


var counter = 1000;

function box4_dragstart(evt) {
    evt.dataTransfer.setData("text/plain", counter);
}

function box4_dragend(evt) {
}

function box5_drop(evt) {
    evt.preventDefault();
    var data = evt.dataTransfer.getData("text/plain");
    evt.target.innerHTML = "dropped counter is "+data;
    counter = counter + 1;
}

function box5_dragover(evt) {
    evt.preventDefault();
}


var last_color = null;
var count = 0;

function box6_click(evt) {
    if (last_color == null)
        last_color = '#707';
    else 
        last_color = '#077';

    this.style.backgroundColor = last_color;
    count = count + 1;

    /* NOTE: open the debugger to see the "Console" log messages */
    console.log('last_color is' + last_color + " " + count);
}


