import { Task } from "../model/tasks";

let tasks: Task[] = [];
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


export async function addTask(title: string): Promise<Task> {
    const response = await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title}),
    });
    if (!response.ok) {
        throw new Error('Error al agregar Titulo');
    }
    return await response.json();
} 



export  async function getTasks(): Promise<Task[]> {
    const response = await fetch("http://localhost:3000/tasks");
    const tasks =  await response.json();
    return tasks as Task[];
};

// export function completMark(id: number): boolean {
//     const task = tasks.find((t) => t.id === id);

//     if (task) {
//         task.completed = true;
//         return true;
//     }
//     return false;
// }

export async function completMark(id: number, completed: boolean): Promise<Task> {
    const response = await fetch(`http://localhost:3000/tasks/${id}`, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }), 
    });

    if (!response.ok) {
        throw new Error('Error al actualizar la tarea');
    }

    return await response.json();
}