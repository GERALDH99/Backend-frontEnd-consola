import express, { Request, Response } from 'express';
import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

const app = express();
app.use(express.json());

const connectionString = 'mongodb://localhost:27017/';
const dbName = 'MongoClass';
let db: Db;
export let tareasCollection: Collection;

export async function mongoDB9() { 
  await MongoClient.connect(connectionString).then(client => {
  db = client.db(dbName);
  tareasCollection = db.collection('tareas');
  console.log('Conectado a MongoDB');
})};
// const TaskSchema = new Schema({
//   id: { type: mongoose.Schema.Types.ObjectId, auto: true },
//   title: { type: String, required: true },
//   completed: { type: Boolean, default: false },
// });
  
// const TaskModel = mongoose.model('Task', TaskSchema);



