import * as readline from "readline";
import { addTask, getTasks,completMark} from "./services/taskService";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function showMenu() {
    console.log(`
    ==================== Menu de Tareas ====================  
    1. Listar tareas
    2. Agregar Tarea
    3. Completar Tarea
    4. Salir
    `)
}

async function handleUserChoice(choice: string) {
   try{ switch (choice) {
        case "1":
            const tasks = await getTasks();
            let result = tasks.map((item) => {
                let result: any = {
                    id: item.id,
                    title: item.title,
                    completed: item.completed ? "Completada" : "Incompleta",
                };
                return result;
            });
            console.table(result);
            promptUser();
            break;
        case "2":
                rl.question("Ingrese el titulo de la tarea: ", (title) => {
                addTask(title);
                console.log("Tarea agregada correctamente\n");
                promptUser();
            });
            break;
        case "3":
            rl.question("Ingrese el ID de la tarea a completar: ", async (idTask) => {
                const id = parseInt(idTask);
                const success = await completMark(id,true);

                if (success) {
                    console.log("!Tarea completada!\n");
                } else {
                    console.log("No se encontro una tarea con ese ID.\n");
                }
                promptUser();
            });
            break;
        case "4":
            console.log("Saliendo del programa....");
            rl.close();
            break;

        default:
            console.log("Opcion invalidad, por favor intente de nuevo.\n");
            break;

    }
}catch (error) {
    if (error instanceof Error) {
      console.error("Error:", error.message);
    } else {
      console.error("Error desconocido:", error);
    }
    promptUser();
  }
    
}

function promptUser() {
    showMenu();
    rl.question("Selecione una opción: ", (choice) => {
        handleUserChoice(choice);
    });
}

promptUser();


