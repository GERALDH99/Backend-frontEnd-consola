export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

let tasks: Task[] = [];
let autoIncrementId = 1;

export function addTask(title: string): string {
    const newTask: Task = {
        id: autoIncrementId++,
        title: title,
        completed: false,
    };
    tasks.push(newTask);
    
    return JSON.stringify(newTask);
}


export  async function getTasks(): Promise<Task[]> {
    const response = await fetch("http://localhost:3000/tasks");
    const tasks =  await response.json();
    return tasks as Task[];
}

export async function completeTask(id: number): Promise<boolean> {
    const task = tasks.find((t) => t.id === id);
    const response = await fetch("http://localhost:3000/tasks/:id");
    if (task) {
        task.completed = true;
        return true;
    }
    return false;
}



