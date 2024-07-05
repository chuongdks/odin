window.addEventListener("load", init);

// Global variable
var cur_colour = 0;
var cur_counter = 0;
var box_counter = 0;

function init()
{
    document.querySelector("#box1").addEventListener("click", update_colour); 

    document.querySelector("#box2").addEventListener("click", update_counter); 

    document.querySelector("#box3").addEventListener("click", update_background_color);

    // Box 4 Start the drag
    var box4 = document.querySelector("#box4");
    box4.addEventListener("dragstart", box4_dragstart); 
    box4.setAttribute("draggable", "true"); 

    // Box 5 Stop the drag
    var box5 = document.querySelector("#box5");
    box5.addEventListener("drop", box5_drop);
    box5.addEventListener("dragover", box5_dragover);
}

// Box 1 stub function, click on it to update box colour and update time on box 5
function update_colour(evt)
{
    // Change the color
    if (cur_colour == 8) {
        cur_colour = 0;
    }
    // Change it to hex based using toString(16) ("this" refers to the "box1" <div>)
    this.style.backgroundColor = '#' + cur_colour.toString(16) + cur_colour.toString(16) + cur_colour.toString(16); 
    ++cur_colour;

    // Perform AJAX request...
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            document.querySelector("#box5").innerHTML = this.responseText;
        }  
    };
    xhr.open("GET", "a04-ajax.php", true);
    xhr.send();    
}

// Box 2 stub function, click to 
function update_counter(evt)
{
    this.innerHTML = "<p>Count = " + cur_counter + ".</p>";
    ++cur_counter;
}

// Box 3 stub function
function update_background_color(evt)
{
    // Dont need a global variable but console.log(document.documentElement.style.backgroundColor) return "rgb(0, 0, 0)" so use it instead of hex
    let pageColor = document.documentElement;

    if (pageColor.style.backgroundColor === "rgb(0, 0, 0)") 
    {
        pageColor.style.backgroundColor = "#FFF";
    } 
    else pageColor.style.backgroundColor = "#000";   
}

// Box 4 stub function
function box4_dragstart(evt)
{
    evt.dataTransfer.setData("text/plain", box_counter);
}

// Box 5 stub function
function box5_drop(evt)
{
    evt.preventDefault();
    var data = evt.dataTransfer.getData("text/plain");
    evt.target.textContent = "counter = " + data;
    box_counter++;
}

function box5_dragover(evt)
{
    evt.preventDefault();
}