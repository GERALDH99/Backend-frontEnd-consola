import { Request, Response, NextFunction } from "express";

export function validateTask(req: Request, res: Response, next: NextFunction): any {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: "El título es requerido y debe ser texto." });
    }
    next();
}