// dom-controller.js
export function renderProject(project) {    // project: Project
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

// dom-controller.js
export function renderSidebar(library, currentProject) {    // libreary: ProjectLibrary
    const sidebar = document.querySelector("#sidebar");
    sidebar.innerHTML = "<h3>Projects</h3>";

    const projectList = document.createElement("ul");
    library.projects.forEach((project) => {
        const li = document.createElement("li");
        li.textContent = project.name;
        li.classList.add("project-item");
        
        // Highlight the one we are currently looking at
        if (project === currentProject) {
            li.classList.add("active-project");
        }

        li.dataset.name = project.name;
        projectList.appendChild(li);
    });

    sidebar.appendChild(projectList);

    // Add a button to create new projects
    const addProjectBtn = document.createElement("button");
    addProjectBtn.id = "add-project-btn";
    addProjectBtn.textContent = "+ New Project";
    sidebar.appendChild(addProjectBtn);
}