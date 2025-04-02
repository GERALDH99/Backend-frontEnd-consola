"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tareasCollection = void 0;
exports.mongoDB9 = mongoDB9;
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const connectionString = 'mongodb://localhost:27017/';
const dbName = 'MongoClass';
let db;
async function mongoDB9() {
    await mongodb_1.MongoClient.connect(connectionString).then(client => {
        db = client.db(dbName);
        exports.tareasCollection = db.collection('tareas');
        console.log('Conectado a MongoDB');
    });
}
;
// const TaskSchema = new Schema({
//   id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//   title: { type: String, required: true },
//   completed: { type: Boolean, default: false },
// });
// const TaskModel = mongoose.model('Task', TaskSchema);
