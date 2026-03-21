// form-controller.js, pass todo object here
export function createTodoForm(todo = null) {
    const form = document.createElement("form");
    form.id = "todo-form";
    
    // If 'todo' exists, we are EDITING. If not, we are ADDING.
    form.innerHTML = `
        <h3>${todo ? "Edit Task" : "New Task"}</h3>

        <label for="fname">Task Title</label><br>
        <input type="text" id="form-title" placeholder="Title" value="${todo ? todo.title : ""}" required><br><br>

        <label for="lname">Task Description</label><br>
        <textarea id="form-desc" placeholder="Description">${todo ? todo.description : ""}</textarea><br><br>

        <label for="fname">Due Date</label><br>
        <input type="date" id="form-date" value="${todo ? todo.dueDate : ""}"><br><br>

        <label for="fname">Priority</label><br>
        <select id="form-priority">
            <option value="Low" ${todo?.priority === "Low" ? "selected" : ""}>Low</option>
            <option value="Medium" ${todo?.priority === "Medium" ? "selected" : ""}>Medium</option>
            <option value="High" ${todo?.priority === "High" ? "selected" : ""}>High</option>
        </select>

        <br><br>
        <div class="form-buttons">
            <button type="submit" id="save-btn">Save</button>
            <button type="button" id="cancel-btn">Cancel</button>
        </div>
    `;
    return form;
}