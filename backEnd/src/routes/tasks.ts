import { NextFunction, Request, Response, Router } from "express";
import { getTasks, Task } from "../models/Task";
import { validateTask } from "../middleware/validateTask";
import { logger } from "../middleware/logger";
import * as controlTask from "../control/controlTask"
import {createNewTask} from "../control/controlTask"
let tasks: Task[] = [];
let id = 1;

const router = Router();

router.get("/", (req, res) => {
    res.json(tasks);
});

router.post("/", validateTask, (req, res) => {
    const task: Task = {
        id: id++,
        title: req.body.title,
        completed: false,
    };
    tasks.push(task);
    res.status(201).json(task);
});

router.put("/:id", (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) {
         res.status(404).json({ error: "Tarea no encontrada." });
         return;}
    task.completed = !task.completed;
    res.json(task)});

router.delete("/:id", (req, res) => {
    tasks = tasks.filter(t => t.id !== parseInt(req.params.id));
    res.status(204).send();
});

router.post("/",validateTask, controlTask.createNewTask);
router.get("/",validateTask, controlTask.getTasks);
 router.put("/:id",logger, controlTask.completMark);
export default router;