"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tasks_1 = __importDefault(require("./routes/tasks"));
const logger_1 = require("./middleware/logger");
const express_2 = require("express");
const baseMongo_1 = require("./models/baseMongo");
const app = (0, express_1.default)();
const PORT = 3000;
const router = (0, express_2.Router)();
app.use(express_1.default.json());
app.use(logger_1.logger);
app.use("/tasks", tasks_1.default);
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
(0, baseMongo_1.mongoDB9)();
