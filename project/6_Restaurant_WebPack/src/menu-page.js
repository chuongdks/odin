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
export function loadMenuPage() {
    const content = document.querySelector("#content");
    const container = document.createElement("div");
    
    const title = document.createElement("h1");
    title.textContent = "Our Menu";
    
    const menuList = document.createElement("ul");
    const items = ["Phở - $12", "Bún Chả - $15", "Gỏi Cuốn - $8"];
    
    items.forEach(item => {
        const li = document.createElement("li");
        li.textContent = item;
        menuList.appendChild(li);
    });

    container.appendChild(title);
    container.appendChild(menuList);
    content.appendChild(container);
}