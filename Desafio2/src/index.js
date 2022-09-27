
//const fs = require('fs');
import {Contenedor} from "./Container.js";



const producto = new Contenedor('productos');

const obj1 = {
    title: "Escuadra", 
    price: 25.34, 
    thumbnail: "url1"
};

const obj2 = {
    title: "Calculadora", 
    price: 30.56, 
    thumbnail: "url2"
};
const obj3 = {
    title: "Globo Terraqueo", 
    price: 45.78, 
    thumbnail: "url3"
};

producto.save(obj1)
.then(() => producto.save(obj2))
.then(data => console.log(`Id : ${data}`))
.then(() => producto.save(obj3))
.then(data => console.log(`Id: ${data}`))

.then(() => producto.getAll().then(data => console.log(data)))
.then(() => producto.getById(2)).then(data => console.log(data))

.then(() => producto.deleteById(3)).then(() => console.log('elemento 3 eliminado'))

.then(() => producto.deleteAll())



