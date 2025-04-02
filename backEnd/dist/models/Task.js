"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addTask = addTask;
exports.getTasks = getTasks;
exports.completeTask = completeTask;
let tasks = [];
let autoIncrementId = 1;
function addTask(title) {
    const newTask = {
        id: autoIncrementId++,
        title: title,
        completed: false,
    };
    tasks.push(newTask);
    return JSON.stringify(newTask);
}
async function getTasks() {
    // Simulate a delay for fetching tasks
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const response = await fetch("http://localhost:3000/tasks");
    const tasks = await response.json();
    return tasks;
}
async function completeTask(id) {
    const task = tasks.find((t) => t.id === id);
    const response = await fetch("http://localhost:3000/tasks/:id");
    if (task) {
        task.completed = true;
        return true;
    }
    return false;
}
