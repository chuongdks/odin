import { Project } from "./todo-logic.js";
import { renderProject } from "./dom-controller.js";
import { createTodoForm } from "./form-controller.js";
import "./style.css";

// 1. Initial Setup
const overlay = document.querySelector("#modal-overlay");
const modalContent = document.querySelector("#modal-content");

const defaultProject = new Project("My Tasks");
defaultProject.addTodo("Finish Odin Project", "2026-03-25", "High");
defaultProject.addTodo("Buy Groceries", "2026-03-20", "Medium");

let currentProject = defaultProject;

// 2. Initial Render
renderProject(defaultProject);

// 3. Global Event Listener (for things outside #content)
document.addEventListener("click", (e) => {
    // 1. Close modal logic (Needs to be global)
    if (e.target.id === "cancel-btn" || e.target === overlay) { // e.target === overlay
        closeModal();
    }
});

// 4. Content Listener (Specific to the list and adding)
document.querySelector("#content").addEventListener("click", (e) => {
    const id = parseFloat(e.target.dataset.id);
    const todo = currentProject.todos.find(t => t.id === id);

    if (e.target.id === "open-add-modal") {
        showModal(createTodoForm());
    } 
    else if (e.target.classList.contains("delete-btn")) {
        currentProject.deleteTodo(id);
        renderProject(currentProject); // Re-render after logic change
    }
    else if (e.target.classList.contains("edit-btn")) {
        showModal(createTodoForm(todo));
        // Logic to update existing todo goes here
    }
    else if (e.target.classList.contains("details-btn")) {
        alert(`Description: ${todo.description}\nPriority: ${todo.priority}`);
    }
});

function showModal(content) {
    modalContent.innerHTML = "";
    modalContent.appendChild(content);
    overlay.classList.remove("hidden");
}

// Function to close the modal
function closeModal() {
    overlay.classList.add("hidden");
    modalContent.innerHTML = ""; // Clean up memory
}