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
exports.completMark = completMark;
exports.deleteTask = deleteTask;
exports.editTask = editTask;
let tasks = [];
let autoIncrementId = 1;
// export function addTask(title: string): Task {
//     const newTask: Task = {
//         id: autoIncrementId++,
//         title: title,
//         completed: false,
//     };
//     tasks.push(newTask);
//     return newTask;
// };
function addTask(title) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });
        if (!response.ok) {
            throw new Error('Error al agregar Titulo');
        }
        return yield response.json();
    });
}
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:3000/tasks");
        const tasks = yield response.json();
        return tasks;
    });
}
;
// export function completMark(id: number): boolean {
//     const task = tasks.find((t) => t.id === id);
//     if (task) {
//         task.completed = true;
//         return true;
//     }
//     return false;
// }
function completMark(id, completed) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed }),
        });
        if (!response.ok) {
            throw new Error('Error al actualizar la tarea');
        }
        return yield response.json();
    });
}
function deleteTask(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        if (!response.ok) {
            throw new Error('Error al eliminar la tarea');
        }
    });
}
;
function editTask(id, title) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3000/tasks/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title }),
        });
        if (!response.ok) {
            throw new Error('Error al editar la tarea');
        }
        return yield response.json();
    });
}
;
