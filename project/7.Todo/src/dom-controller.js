// dom-controller.js
export function renderProject(project) {
    const content = document.querySelector("#content");
    content.innerHTML = `<h1>${project.name}</h1>`;

    const addBtn = document.createElement("button");
    addBtn.id = "open-add-modal";
    addBtn.textContent = "+ Add Task";
    content.appendChild(addBtn);

    const todoList = document.createElement("ul");
    todoList.classList.add("todo-list");

    project.todos.forEach(todo => {
        const li = document.createElement("li");
        li.classList.add("todo-item", `priority-${todo.priority.toLowerCase()}`);
        
        li.innerHTML = `
            <div class="todo-info">
                <input type="checkbox" ${todo.complete ? "checked" : ""}>
                <span class="title ${todo.complete ? 'done' : ''}">${todo.title}</span>
                <span class="date">${todo.dueDate}</span>
            </div>
            <div class="todo-actions">
                <button class="details-btn" data-id="${todo.id}">Details</button>
                <button class="edit-btn" data-id="${todo.id}">Edit</button>
                <button class="delete-btn" data-id="${todo.id}">Delete</button>
            </div>
        `;
        todoList.appendChild(li);
    });

    content.appendChild(todoList);
}