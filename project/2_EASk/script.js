let mode = 0;

let maxSquare = 50;
const container = document.querySelector("#container");

let isDrawing = false;

// Random color RGB style, use in DrawSquare() function in backgroundColor
const randomRGBColor = `rgb(${Math.floor(Math.random() * 255)},
                            ${Math.floor(Math.random() * 255)},    
                            ${Math.floor(Math.random() * 255)})`;

// Random color HEX style, use in DrawSquare() function in backgroundColor
const randomHexColor = () => {
    let n = (Math.floor(Math.random() * 0xffffff).toString(16));
    return `#${n.padStart(6,'0')}`;
};

// Check if a div square is White
function isWhite(color) 
{
    return color === "white" || color === "rgb(255, 255, 255)" || color === "#ffffff";
}  

// Add color to a square, is used with mouse event
function DrawSquare(e) 
{
    if (e.target.classList.contains('square') && isDrawing && isWhite(e.target.style.backgroundColor)) 
    {
        e.target.style.backgroundColor = randomHexColor(); 
    }
}

// Create the square div by using 2 container instead of 1 container
function createSquare (numberOfSquare)
{
    // Create the board function
    for (let i = 0; i < numberOfSquare; i++)
    {
        const squareContainer = document.createElement("div");
        squareContainer.classList.add("squareContainer");    
        container.appendChild(squareContainer);
        for (let j = 0; j < numberOfSquare; j++)
        {
            const square = document.createElement("div");
            square.style.backgroundColor = "white";
            square.classList.add("square");   
            squareContainer.appendChild(square);
        }
    }      
}

// Create the default square spaces
createSquare (maxSquare)

// Add the event listeners for mousedown, mousemove, and mouseup
container.addEventListener("mousedown", () => {
    isDrawing = true;
});

container.addEventListener('mousemove',  DrawSquare);
container.addEventListener('mousedown', DrawSquare);

window.addEventListener("mouseup", () => {
    if (isDrawing) 
    {
        isDrawing = false;
    }
});

// User prompt input value
const input = document.querySelector("input");
const button  = document.querySelector("#changeSize");
const buttonReset  = document.querySelector("#reset");
input.value = "";

// Function for changing board size
button.addEventListener("click", () => 
{
    // maxSquare = prompt("Enter new grid size; 1-100 px"); // Alternative way to get user input value
    if (input.value > 100 || input.value < 1 || Number.isNaN(Number(input.value))) // Convert the user input value to Number first then check if it is a Number or not
    {
        alert("Please enter a valid integer number");
        input.value = "";
    }
    maxSquare = input.value;

    // Checking for 'firstChild' is usually faster than checking the 'lastChild'
    while (container.firstChild) 
    {
        container.removeChild(container.lastChild);
    }    

    createSquare(maxSquare);
});

// Function for reseting the board
buttonReset.addEventListener("click", () => 
{
    // Checking for 'firstChild' is usually faster than checking the 'lastChild'
    while (container.firstChild) 
    {
        container.removeChild(container.lastChild);
    }         

    createSquare(maxSquare)
});