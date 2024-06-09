let mode = "rainbow";

let maxSquare = 25;
const container = document.querySelector("#container");

let isDrawing = false;

let menu = document.querySelector('.config');

let colorBox = document.querySelector("#colorDialogID").value;

// Random color RGB style, use in DrawSquare() function in backgroundColor
const randomRGBColor = () => 
{
    let n = `rgb(${Math.floor(Math.random() * 255)},
                ${Math.floor(Math.random() * 255)},    
                ${Math.floor(Math.random() * 255)})`;
    return n;
}

// Random color HEX style, use in DrawSquare() function in backgroundColor
const randomHexColor = () => 
{
    let n = (Math.floor(Math.random() * 0xffffff).toString(16));
    return `#${n.padStart(6,'0')}`;
};

// Check if a div square is White, use this if you want to override a color of a square
function isWhite(color) 
{
    return color === "white" || color === "rgb(255, 255, 255)" || color === "#ffffff";
}  

// Add color to a square, is used with mouse event
function DrawSquare(e) 
{
    switch (mode)
    {
        case "color":
            if (e.target.classList.contains('square') && isDrawing) // && isWhite(e.target.style.backgroundColor)
            {
                e.target.style.backgroundColor = colorBox; 
            }
            break;

        case "rainbow":
            if (e.target.classList.contains('square') && isDrawing && isWhite(e.target.style.backgroundColor)) 
            {
                e.target.style.backgroundColor = randomRGBColor(); 
            }
            break;

        case "black":
            let opacityMeter = 0.1;
            if (e.target.classList.contains('square') && isDrawing) 
            {
                if (e.target.style.backgroundColor === "rgba(0, 0, 0, 0.1)")
                {
                    e.target.style.backgroundColor = `rgba(0, 0, 0, 1)`; //${opacityMeter + 0.8})
                }

                if (e.target.style.backgroundColor !== "rgb(0, 0, 0)")
                {
                    e.target.style.backgroundColor = "rgba(0, 0, 0, 0.1)"; 
                    opacityMeter = 0.1;
                }
            }
            break;

        case "eraser":
            if (e.target.classList.contains('square') && isDrawing && !isWhite(e.target.style.backgroundColor)) 
            {
                e.target.style.backgroundColor = "white"; 
            }
            break;
    }
    console.log(e.target.style.backgroundColor);
}

// Create the square div by using 2 container instead of 1 container
function createSquare (numberOfSquare)
{
    // Create the board function
    for (let i = 0; i < numberOfSquare; i++)
    {
        const squareContainer = document.createElement("div");
        squareContainer.setAttribute("draggable", "false");
        squareContainer.classList.add("squareContainer");    
        container.appendChild(squareContainer);
        for (let j = 0; j < numberOfSquare; j++)
        {
            const square = document.createElement("div");
            square.setAttribute("draggable", "false");
            square.style.backgroundColor = "white";
            square.classList.add("square");   
            squareContainer.appendChild(square);
        }
    }      
}

// Create the default square spaces
createSquare (maxSquare)

// Color chooser
menu.addEventListener('click', (event) => 
{
    switch(event.target.id) 
    {
        case 'color':
            mode = "color";
            colorBox = document.querySelector("#colorDialogID").value;
            document.querySelector("#colorDialogID").click();
            break;

        case 'rainbow':
            mode = "rainbow";
            break;

        case 'black':
            mode = "black";
            break;

        case 'eraser':
            mode = "eraser";
            break;
    }
});

// Add the event listeners for mousedown, mousemove, and mouseup
container.addEventListener("mousedown", () => {
    isDrawing = true;
});

container.addEventListener('mousemove', DrawSquare);
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