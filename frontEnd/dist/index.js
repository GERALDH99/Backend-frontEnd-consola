"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const readline = __importStar(require("readline"));
const taskService_1 = require("./services/taskService");
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
    `);
}
function handleUserChoice(choice) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            switch (choice) {
                case "1":
                    const tasks = yield (0, taskService_1.getTasks)();
                    let result = tasks.map((item) => {
                        let result = {
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
                        (0, taskService_1.addTask)(title);
                        console.log("Tarea agregada correctamente\n");
                        promptUser();
                    });
                    break;
                case "3":
                    rl.question("Ingrese el ID de la tarea a completar: ", (idTask) => __awaiter(this, void 0, void 0, function* () {
                        const id = parseInt(idTask);
                        const success = yield (0, taskService_1.completMark)(id, true);
                        if (success) {
                            console.log("!Tarea completada!\n");
                        }
                        else {
                            console.log("No se encontro una tarea con ese ID.\n");
                        }
                        promptUser();
                    }));
                    break;
                case "4":
                    console.log("Saliendo del programa....");
                    rl.close();
                    break;
                default:
                    console.log("Opcion invalidad, por favor intente de nuevo.\n");
                    break;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error("Error:", error.message);
            }
            else {
                console.error("Error desconocido:", error);
            }
            promptUser();
        }
    });
}
function promptUser() {
    showMenu();
    rl.question("Selecione una opción: ", (choice) => {
        handleUserChoice(choice);
    });
}
promptUser();
