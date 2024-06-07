let maxSquare = 50;
const container = document.querySelector("#container");

// Create the square div by using 2 container instead of 1 container
for (let i = 0; i < maxSquare; i++)
{
    const squareContainer = document.createElement("div");
    squareContainer.classList.add("squareContainer");    
    container.appendChild(squareContainer);
    for (let j = 0; j < maxSquare; j++)
    {
        const square = document.createElement("div");
        square.classList.add("square");   
        squareContainer.appendChild(square);
    }
}

// Add a single event listener to the container
container.addEventListener('mouseover', (event) => 
{
    if (event.target.classList.contains('square')) 
    {
        event.target.style.backgroundColor = "blue";
    }
});

// User prompt input value
const input = document.querySelector("input");
const button  = document.querySelector("#changeSize");
const buttonReset  = document.querySelector("#reset");

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

    // 
    for (let i = 0; i < maxSquare; i++)
    {
        const squareContainer = document.createElement("div");
        squareContainer.classList.add("squareContainer");    
        container.appendChild(squareContainer);
        for (let j = 0; j < maxSquare; j++)
        {
            const square = document.createElement("div");
            square.classList.add("square");   
            squareContainer.appendChild(square);
        }
    }    
});

// Function for reseting the board
buttonReset.addEventListener("click", () => 
{
    // Checking for 'firstChild' is usually faster than checking the 'lastChild'
    while (container.firstChild) 
    {
        container.removeChild(container.lastChild);
    }      

    // 
    for (let i = 0; i < maxSquare; i++)
    {
        const squareContainer = document.createElement("div");
        squareContainer.classList.add("squareContainer");    
        container.appendChild(squareContainer);
        for (let j = 0; j < maxSquare; j++)
        {
            const square = document.createElement("div");
            square.classList.add("square");   
            squareContainer.appendChild(square);
        }
    }     
});