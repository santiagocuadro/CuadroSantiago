
import {Contenedor} from "./Container.js";
import express from "express";  

const app = express();
const PORT = process.env.PORT || 8080;


const producto = new Contenedor('productos');

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

