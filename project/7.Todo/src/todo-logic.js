// todo-logic.js
export class Todo {
    constructor(title, dueDate, priority = "Low") {
        this.title = title;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = Date.now() + Math.random(); // Unique ID for finding it later
    }
}

export class Project {
    constructor(name) {
        this.name = name;
        this.todos = [];
    }

    addTodo(title, date, priority) {
        const newTodo = new Todo(title, date, priority);
        this.todos.push(newTodo);
        return newTodo;
    }

    deleteTodo(todoId) {
        this.todos = this.todos.filter(t => t.id !== todoId);
    }
}