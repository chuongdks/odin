/**
<div class="homepage-container">
    <h1>Horsing Around</h1>
    
    <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" alt="Interior of The Golden Spoon" width="600">
    
    <p class="description">
        Welcome to The Golden Spoon, where tradition meets modern culinary excellence. 
        Located in the heart of the city, we pride ourselves on using locally sourced 
        ingredients to create unforgettable dining experiences.
    </p>

    <div class="hours">
        <h3>Hours of Operation</h3>
        <ul>
            <li>Monday - Thursday: 11am - 10pm</li>
            <li>Friday - Saturday: 11am - 11pm</li>
            <li>Sunday: Closed</li>
        </ul>
    </div>
</div>
 */
// home-page.js
import "./home.css";

export function loadHomePage() {
    const content = document.querySelector("#content");

    // Create the container
    const container = document.createElement("div");
    container.classList.add("homepage-container", "fade-in"); // Added fade-in here

    // Create Headline
    const headline = document.createElement("h1");
    headline.textContent = "Horsing Around";

    // Create Image
    const restaurantImg = document.createElement("img");
    restaurantImg.src = "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600";
    restaurantImg.alt = "Interior of The Horsing Around";
    restaurantImg.width = 600;

    // Create Description
    const description = document.createElement("p");
    description.classList.add("description");
    description.textContent = "Welcome to The Golden Spoon, where tradition meets modern culinary excellence. Located in the heart of the city, we pride ourselves on using locally sourced ingredients.";

    // Create Hours
    const hoursDiv = document.createElement("div");
    hoursDiv.classList.add("hours");

    const hoursTitle = document.createElement("h3");
    hoursTitle.textContent = "Hours of Operation";

    const hoursList = document.createElement("ul");

    const days = [
        "Monday - Thursday: 11am - 10pm",
        "Friday - Saturday: 11am - 11pm",
        "Sunday: Closed"
    ];

    days.forEach(dayText => {
        const listItem = document.createElement("li");
        listItem.textContent = dayText;
        hoursList.appendChild(listItem);
    });
    // Nest the hours elements
    hoursDiv.appendChild(hoursTitle);
    hoursDiv.appendChild(hoursList);

    // Append everything to the container
    container.appendChild(headline);
    container.appendChild(restaurantImg);
    container.appendChild(description);
    container.appendChild(hoursDiv);

    // Append container to the main #content div
    content.appendChild(container);
}