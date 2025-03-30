import{Request, Response} from "express";
import * as controlTask from "../models/Task"
import {addTask,completeTask} from "../models/Task"
import * as taskMol from "../models/Task"
export const getTasks = (req: Request, res: Response) => {
    res.json(taskMol.getTasks());
  };
  

export const createNewTask = (req: Request, res: Response) => {
    const {title} = req.body;
    const newTask = controlTask.addTask(title);
    res.status(201).json(newTask);
  };

  export const completMark = async (req: Request, res: Response) => {
    const { id } = req.params;
    const success = await controlTask.completeTask(parseInt(id));
    if ( success) {
      res.json({ message: "Tarea marcada como completada" });
    } else {
      res.status(404).json({ error: "id no encontrada" });
    }
  };