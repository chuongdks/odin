document.getElementById("setColorButtonID").addEventListener("click", function() {
    document.getElementById("colorDialogID").focus();
    document.getElementById("colorDialogID").value = "#FFCC00"; //Set the default color  NOTE: Remove the line to get the default of #000000
    document.getElementById("colorDialogID").click();
});
  
function getColor() 
{
    var color = document.getElementById("colorDialogID").value;
    document.getElementById("textToColorID").style.color = color;
}