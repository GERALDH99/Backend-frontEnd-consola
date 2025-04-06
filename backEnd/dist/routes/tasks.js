"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const validateTask_1 = require("../middleware/validateTask");
const baseMongo_1 = require("../models/baseMongo");
let tasks = [];
let id = 1;
const router = (0, express_1.Router)();
router.get("/", async (req, res) => {
    try {
        // Para obtener los datos de la base de datos MongoDB
        const tareasMongo = await baseMongo_1.tareasCollection.find({}).toArray();
        // Se debe convertir el objeto de MongoDB al ar
        tasks = tareasMongo.map((tasks) => ({
            id: tasks.id,
            title: tasks.title,
            completed: tasks.completed,
        }));
        res.json(tasks);
    }
    catch (error) {
        console.error("Error al obtener las tareas:", error);
        res.status(500).json({ error: "Error al obtener las tareas." });
    }
});
router.post("/", validateTask_1.validateTask, async (req, res) => {
    try {
        // Crear la tarea
        const task = {
            id: id++, // 
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
router.put("/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = tasks.find((t) => t.id === id);
        if (!task) {
            res.status(404).json({ error: "Tarea no encontrada en el array local." });
            return;
        }
        task.completed = !task.completed;
        const filter = { id: task.id }; // aqui busca el id en la base de datos
        const update = { $set: { completed: task.completed } }; // aqui actualiza el campo completed
        const result = await baseMongo_1.tareasCollection.updateOne(filter, update); // aqui hacemos la consulta a la base de datos
        if (result.matchedCount === 0) {
            res.status(404).json({ error: "Tarea no encontrada en MongoDB." }); // aqui si no encuentra la tarea en la base de datos
            return;
        }
        res.json(task); // aqui devolvemos la tarea actualizada en el local
    }
    catch (error) {
        console.error("Error al marcar la tarea como completada:", error); // aqui si hay un error en la base de datos
        res.status(500).json({ error: "Error al marcar la tarea como completada." }); // aqui hay un error en el local
    }
});
router.patch("/:id", async (req, res) => {
    try {
        const task = tasks.find((t) => t.id === parseInt(req.params.id));
        if (!task) {
            res.status(404).json({ error: "Tarea no encontrada." });
            return;
        }
        if (req.body.title) {
            // Actualizar titulo
            task.title = req.body.title;
        }
        // aqui busca el id en la base de datos
        const filter = { id: task.id };
        // aqui actualiza el campo completed
        const update = { $set: { title: task.title } };
        // aqui hacemos la consulta a la base de datos
        const result = await baseMongo_1.tareasCollection.updateOne(filter, update);
        if (result.matchedCount === 0) {
            // aqui si no encuentra la tarea en la base de datos
            res.status(404).json({ error: "Titulo no encontrada en MongoDB." });
            return;
        }
        res.json(task);
    }
    catch (error) {
        console.error("Error al actualizar la Titulo:", error); // aqui si hay un error en la base de datos
        res.status(500).json({ error: "Error al actualizar la titulo." }); // aqui hay un error en el local
    }
});
router.delete("/:id", async (req, res) => {
    // aqui se elimina la tarea del array local Y su busqueda se hace por id.
    // Este hay que convertirlo a int pasandolo por parseInt
    try {
        tasks = tasks.filter((t) => t.id !== parseInt(req.params.id));
        // aqui busca el id en la base de datos
        const filter = { id: parseInt(req.params.id) };
        // aqui hacemos la consulta a la base de datos
        const result = await baseMongo_1.tareasCollection.deleteOne(filter);
        if (result.deletedCount === 0) {
            // aqui si no encuentra la tarea en la base de datos
            res.status(404).json({ error: "Tarea no encontrada en MongoDB." });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        // aqui si hay un error en la base de datos
        console.error("Error al eliminar la tarea:", error);
        // aqui hay un error en el local
    }
    res.status(500).json({ error: "Error al eliminar la tarea." });
});
exports.default = router;
