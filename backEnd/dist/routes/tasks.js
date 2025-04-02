"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateTask_1 = require("../middleware/validateTask");
const baseMongo_1 = require("../models/baseMongo");
// import * as controlTask from "../control/controlTask"
// import {createNewTask} from "../control/controlTask"
let tasks = [];
let id = 1;
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        // Obtener tareas del array local
        const localTasks = tasks;
        // Obtener tareas de MongoDB
        const mongoTasks = await baseMongo_1.tareasCollection.find().toArray();
        // Combinar ambas fuentes de datos en la respuesta
        res.json({
            localTasks,
            mongoTasks,
        });
    }
    catch (error) {
        console.error("Error al obtener las tareas:", error);
        res.status(500).json({ error: "Error al obtener las tareas." });
    }
});
// router.get("/", async (req, res) => {
//   res.json(tasks);
//   const tareas = await tareasCollection.find().toArray();
//   res.send(tareas);
// });
// app.get('/tareas', async (req: Request, res: Response) => {
//   const tareas = await tareasCollection.find().toArray();
//   res.send(tareas);
// });
// router.post("/", validateTask, (req, res) => {
//   const task: Task = {
//     id: id++,
//     title: req.body.title,
//     completed: false,
//   };
//   tasks.push(task);
//   res.status(201).json(task);
// });
// app.post('/tareas', async (req: Request, res: Response) => {
//   const tarea = req.body;
//   await tareasCollection.insertOne(tarea);
//   res.status(201).send(tarea);
// });
router.post("/", validateTask_1.validateTask, async (req, res) => {
    try {
        // Crear la tarea
        const task = {
            id: id++, // Generar un ID único para el array local
            title: req.body.title,
            completed: false,
        };
        // Guardar la tarea en el array local
        tasks.push(task);
        // Guardar la tarea en MongoDB
        const tareaMongo = {
            id: task.id,
            title: task.title,
            completed: task.completed,
        };
        await baseMongo_1.tareasCollection.insertOne(tareaMongo);
        // Responder con la tarea creada
        res.status(201).json(task);
    }
    catch (error) {
        console.error("Error al guardar la tarea:", error);
        res.status(500).json({ error: "Error al guardar la tarea." });
    }
});
// router.put("/:id", async (req, res) => {
//   try{const task = tasks.find((t) => t.id === parseInt(req.params.id));
//   if (!task) {
//     res.status(404).json({ error: "Tarea no encontrada." });
//     return;
//   }
//   task.completed = !task.completed;
//   // Guardar la tarea en MongoDB
//   const tareaMongo = {
//     id: task.id,
//     title: task.title,
//     completed: task.completed,
//   };
//   const id = req.params.id;
//   const tarea =req.body;
//   await tareasCollection.updateOne({ _id: new ObjectId(id) }, { $set: tarea });
//   res.json(task);}catch (error) {
//     console.error("Error al marcar la tarea como completada:", error);
//     res.status(500).json({ error: "Error al marcar la tarea como completada." });
//   }
// });
router.patch("/:id", (req, res) => {
    const task = tasks.find((t) => t.id === parseInt(req.params.id));
    if (!task) {
        res.status(404).json({ error: "Tarea no encontrada." });
        return;
    }
    if (req.body.title) {
        task.title = req.body.title; // Actualizar titulo
    }
    res.json(task);
});
router.delete("/:id", (req, res) => {
    tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
    res.status(204).send();
});
// router.post("/",validateTask, controlTask.createNewTask);
// router.get("/",validateTask, controlTask.getTasks);
//  router.put("/:id",logger, controlTask.completMark);
exports.default = router;
