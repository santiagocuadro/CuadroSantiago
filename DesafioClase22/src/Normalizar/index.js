import normalizr from 'normalizr';
import { MessagesDao, ProductDao } from "../Dao/index.js";

const normalizar = normalizr.normalize;

const mensaje = await MessagesDao.getAll();

console.log(mensaje);

const authorSchema = new normalizr.schema.Entity('author');


const arrayMendajes = new normalizr.schema.Entity('mensajes', {
	mensajes: [authorSchema]
})




const objNormalizado= normalizar(mensaje, arrayMendajes);
console.log(objNormalizado);
