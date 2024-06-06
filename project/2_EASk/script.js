let maxSquare = 23;
const container = document.querySelector("#container");

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
container.addEventListener('mouseover', (event) => {
    if (event.target.classList.contains('square')) 
    {
        event.target.style.backgroundColor = "blue";
    }
});
