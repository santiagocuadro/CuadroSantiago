import normalizr from 'normalizr';
import { MessagesDao } from "../Dao/index.js";

const normalizar = normalizr.normalize;

const mensaje = await MessagesDao.getAll();

console.log(mensaje);

const authorSchema = new normalizr.schema.Entity('author');


const mendajes = new normalizr.schema.Entity('mensaje', {
	mensaje: authorSchema,
})




const objNormalizado= normalizar(mensaje, mendajes);
// console.log(objNormalizado);
