"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/tasks");
        const tasks = yield response.json();
        return tasks;
    });
}
function completeTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const task = tasks.find((t) => t.id === id);
        const response = yield fetch("http://localhost:3000/tasks/:id");
        if (task) {
            task.completed = true;
            return true;
        }
        return false;
    });
}
