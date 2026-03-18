// index.js
import "./styles.css";
import { loadHomePage } from "./home-page.js";
import { loadMenuPage } from "./menu-page.js";
import { loadContactPage } from "./contact-page.js";

// render the homepage on initial load
loadHomePage();

//  Map IDs to functions
const tabMap = {
    "home-btn": loadHomePage,
    "menu-btn": loadMenuPage,
    "about-btn": loadContactPage
};

// Single Event Listener on the Parent (Nav)
const nav = document.querySelector("nav");

nav.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;

    const targetId = event.target.id;
    if (tabMap[targetId]) {
        // Remove 'active' class from all buttons in the nav
        document.querySelectorAll("nav button").forEach(btn => 
            btn.classList.remove("active")
        );

        // Add 'active' class to the clicked button
        event.target.classList.add("active");

        clearContent();
        tabMap[targetId]();
    }
});

function clearContent() {
    const content = document.querySelector("#content");
    content.innerHTML = "";
}
console.log("Page loaded successfully.");