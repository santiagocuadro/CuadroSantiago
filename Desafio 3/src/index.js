
import {Contenedor} from "./Container.js";
import express from "express";  

const app = express();
const PORT = process.env.PORT || 8080;


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

// producto.save(obj1)
// .then(() => producto.save(obj2))
// .then(() => producto.save(obj3))


const getRandom = limite =>{
    return parseInt(Math.random() * limite);
};

app.get('/productos', (req,res) => {
   producto.getAll()
   .then(list => {
        res.json({list});
   })
});

app.get('/productoRandom',(req,res) => {
    producto.getAll()
    .then( list => {
        const limite = list.length;
        res.json(list[getRandom(limite)]);
    })
});

app.get('*', (req,res) => res.send('<h1 style="color: red" >Ruta no valida</h1>'));


const server = app.listen( PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on("error", error => console.log(`error en el servidor ${error}`));
