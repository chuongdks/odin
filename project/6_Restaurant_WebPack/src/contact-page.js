import "./contact.css";

export function loadContactPage() {
    const content = document.querySelector("#content");
    const container = document.createElement("div");
    container.classList.add("contact-box", "fade-in");

    container.innerHTML = `
        <h2>Visit Us</h2>
        <p>📍 123 Hoan Kiem, Hanoi</p>
        <p>📞 +84 90 123 4567</p>
    `;
    content.appendChild(container);
}