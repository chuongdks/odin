import { Project } from "./todo-logic.js";
import { renderProject } from "./dom-controller.js";
import { createTodoForm } from "./form-controller.js";
import "./style.css";

// 1. Initial Setup
const overlay = document.querySelector("#modal-overlay");
const modalContent = document.querySelector("#modal-content");

const defaultProject = new Project("My Tasks");
defaultProject.addTodo("Finish Odin Project", "Test", "2026-03-25", "High");
defaultProject.addTodo("Buy Groceries", "Test", "2026-03-20", "Medium");

let currentProject = defaultProject;

// 2. Initial Render
renderProject(defaultProject);

// 3. Global Event Listener (for things outside #content)
document.addEventListener("click", (e) => {
    // Close modal logic (Needs to be global)
    if (e.target.id === "cancel-btn" || e.target === overlay) { // e.target === overlay
        closeModal();
    }
});

// remeber to attach submit event listener to FORM not button
document.addEventListener("submit", (e) => {
    if (e.target.id === "todo-form") {
        e.preventDefault(); // Stop the page from refreshing!

        // 1. Grab the values from the form inputs
        const title = document.querySelector("#form-title").value;
        const desc = document.querySelector("#form-desc").value;
        const date = document.querySelector("#form-date").value;
        const priority = document.querySelector("#form-priority").value;
        
        const editId = e.target.dataset.editId;

        // 2. Logic: Update OR Add
        if (editId) {
            // Logic for UPDATING: Find the existing todo and change its properties
            const todoToUpdate = currentProject.todos.find(t => t.id === parseFloat(editId));
            todoToUpdate.title = title;
            todoToUpdate.description = desc;
            todoToUpdate.dueDate = date;
            todoToUpdate.priority = priority;
        } else {
            // Logic for ADDING: Create a brand new todo
            currentProject.addTodo(title, desc, date, priority);
        }

        // 3. Update the UI and Clean up
        renderProject(currentProject);
        closeModal();
    }
});

// 4. Content Listener (Specific to the list and adding)
document.querySelector("#content").addEventListener("click", (e) => {
    const id = parseFloat(e.target.dataset.id);
    const todo = currentProject.todos.find(t => t.id === id);

    if (e.target.id === "open-add-modal") {
        openModal();
    } 
    else if (e.target.classList.contains("delete-btn")) {
        currentProject.deleteTodo(id);
        renderProject(currentProject); // Re-render after logic change
    }
    else if (e.target.classList.contains("edit-btn")) {
        openModal(todo);
        // Logic to update existing todo goes here
    }
    else if (e.target.classList.contains("details-btn")) {
        alert(`Description: ${todo.description}\nPriority: ${todo.priority}`);
    }
});

// Function to close the modal
function closeModal() {
    overlay.classList.add("hidden");
    modalContent.innerHTML = ""; // Clean up memory
}

// 
function openModal(todo = null) {
    modalContent.innerHTML = "";
    const form = createTodoForm(todo);
    
    // If we are editing, "stamp" the ID onto the form
    if (todo) {
        form.dataset.editId = todo.id;
    }
    
    modalContent.appendChild(form);
    overlay.classList.remove("hidden");
}