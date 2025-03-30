"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateTask = validateTask;
function validateTask(req, res, next) {
    const { title } = req.body;
    if (!title || typeof title !== 'string') {
        return res.status(400).json({ error: "El título es requerido y debe ser texto." });
    }
    next();
}
