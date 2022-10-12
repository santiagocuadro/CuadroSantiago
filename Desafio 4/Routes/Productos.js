import express from "express";
//import {Contenedor} from "../Server/Container.js";

const router = express.Router();

//const productos = new Contenedor('productos');
const productos = [
    {
        title: "santi",
        price: 34,
        thumbnail: "asdf",
        id: 1
    }
];

router.get('/', async (req, res) => {
    res.json(productos);
})

//devuelve un producto segun su id
router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const foundElement = productos.find((element) => element.id == id);
    res.json(foundElement == undefined ? {error: 'producto no encontrado'} : foundElement)
})

//recibe y agrega un producto y lo devuelve con su id asignado
router.post('/', async(req, res) => {
    const prod = req.body;
    let id = 1;
    if(productos.length !== 0){
        id = productos[productos.length - 1].id + 1;
    }
    prod.id = id;
    productos.push(prod);
    res.status(200).send('Producto agregado');
})

//recibe y actualiza un producto segun su id
router.put('/:id', async(req, res) => {
    const {id} = req.params;
    const prod = req.body;
    prod.id = parseInt(id);
    const foundElement = productos.find((element) => element.id == id);
    if(foundElement === undefined){
        res.json({error: "el producto no existe"})
    }else{
        res.json(productos.splice(id-1, 1, obj));
    }
})

router.delete('/:id', (req, res) => {
    const {id} = req.params;
    const foundElement = productos.find((element) => element.id == id);
    if(foundElement === undefined){
        res.json({error: "el producto no existe"});
    }else{
        res.json(productos.splice(id-1, 1));
    }
})


export {router};