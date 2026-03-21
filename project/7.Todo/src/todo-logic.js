// todo-logic.js
export class Todo {
    constructor(title, description, dueDate, priority = "Low") {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        // Notes and CheckList?
        this.id = Date.now() + Math.random(); // Unique ID for finding it later
    }
}

export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(title, description, date, priority) {
        const newTodo = new Todo(title, description, date, priority);
        this.todos.push(newTodo);
        return newTodo;
    }

    deleteTodo(todoId) {
        this.todos = this.todos.filter(t => t.id !== todoId);
    }
}