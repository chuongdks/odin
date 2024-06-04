// Add the following elements to the container using ONLY JavaScript and the DOM methods shown above:
// a <p> with red text that says “Hey I’m red!”
// an <h3> with blue text that says “I’m a blue h3!”
// a <div> with a black border and pink background color with the following elements inside of it:
//     another <h1> that says “I’m in a div”
//     a <p> that says “ME TOO!”
//     Hint for this one: after creating the <div> with createElement, 
//     append the <h1> and <p> to it before adding it to the container.

// your JavaScript file
// All this bull shit just to add a child div with class content and some text under the id: container 
const container = document.querySelector("#container");

const content = document.createElement("div");
content.classList.add("content");
content.textContent = "This is the glorious text-content!";
container.appendChild(content);

// a <p> with red text that says “Hey I’m red!”
const para = document.createElement("p");
para.style.color = "red";
para.textContent = "Hey I'm red!";
container.appendChild(para);
    // Append the paragraph to the body (or any other existing element)
    // document.body.appendChild(para);

// an <h3> with blue text that says “I’m a blue h3!”
const header3 = document.createElement("h3");
header3.style.color = "blue";
header3.textContent = "I'm a blue h3!";
container.appendChild(header3);

// a <div> with a black border and pink background color with the following elements inside of it:
const divBlackPink = document.createElement("div");
divBlackPink.style.cssText = "border: 1px solid black; background-color: pink;";

// append the <h1> and <p> to it before adding it to the container.
const header1 = document.createElement("h1");
header1.textContent = "I'm in a div";
divBlackPink.appendChild(header1);

const para2 = document.createElement("p");
divBlackPink.appendChild(para2);
para2.textContent = "ME TOO!";

container.appendChild(divBlackPink);