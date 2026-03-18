// index.js
// import "./styles.css";
import { loadHomePage } from "./home-page.js";
import { loadMenuPage } from "./menu-page.js";

// render the homepage on initial load
loadHomePage();

//  Map IDs to functions
const tabMap = {
    "home-btn": loadHomePage,
    "menu-btn": loadMenuPage,
    // "about-btn": loadContactPage
};

// Single Event Listener on the Parent (Nav)
const nav = document.querySelector("nav");

nav.addEventListener("click", (event) => {
    const targetId = event.target.id;

    // Check if the clicked element is one of our navigation buttons
    if (tabMap[targetId]) {
        clearContent();
        tabMap[targetId](); // Call the mapped function
    }
});

function clearContent() {
    const content = document.querySelector("#content");
    content.innerHTML = "";
}
console.log("Page loaded successfully.");