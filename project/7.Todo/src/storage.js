// storage.js
import { ProjectLibrary, Project, Todo } from "./todo-logic.js"; 

export function saveLibrary(library) { // library: ProjectLibrary
    localStorage.setItem("todoLibrary", JSON.stringify(library));
}

export function loadLibrary() {
    const data = localStorage.getItem("todoLibrary");

    if (!data) return null

    const parsedData = JSON.parse(data)
    const newLibrary = new ProjectLibrary

    // put data back into class instances
    parsedData.projects.forEach(projData => {
        const project = new Project(projData.name)

        projData.todos.forEach(tData => {
            const todo = new Todo(tData.title, tData.description, tData.dueDate, tData.priority);
            todo.id = tData.id
            todo.complete = tData.complete
            project.todos.push(todo)
        })

        newLibrary.projects.push(project)
    })

    return newLibrary
}