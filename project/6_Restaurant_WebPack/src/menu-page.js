/**
  <div>
    <h1>Our Menu</h1>
    <ul>
      <li>Phở - $12</li>
      <li>Bún Chả - $15</li>
      <li>Gỏi Cuốn - $8</li>
    </ul>
  </div>
 */
// menu page
import "./menu.css";

export function loadMenuPage() {
    const content = document.querySelector("#content");
    const container = document.createElement("div");
    container.classList.add("menu-grid", "fade-in");

    const items = [
        { name: "Phở Bò", price: "$14", desc: "Traditional beef noodle soup" },
        { name: "Bún Chả", price: "$16", desc: "Grilled pork with vermicelli" }
    ];

    items.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("menu-item");
        div.innerHTML = `<h3>${item.name} <span>${item.price}</span></h3><p>${item.desc}</p>`;
        container.appendChild(div);
    });

    content.appendChild(container);
}