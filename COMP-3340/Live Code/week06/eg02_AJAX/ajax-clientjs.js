window.addEventListener("load", init);

function init() {
    document.getElementById("button").addEventListener("click", change_stuff);
}


function change_stuff()
{
    var req = new XMLHttpRequest();
    req.onload = function() {
        document.getElementById("button").innerHTML = this.responseText;
    };
    req.open("GET", "cool.php", true);
    req.send();
}
