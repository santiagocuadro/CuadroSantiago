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
    const id = req.params.id;
    const foundElement = productos.find((element) => element.id == id);
    res.json(foundElement == undefined ? {error: 'producto no encontrado'} : foundElement)
})

//recibe y agrega un producto y lo devuelve con su id asignado
router.post('/', async(req, res) => {
    const { title, price, thumbnail } = req.body;
    let prod = { title, price, thumbnail };
    console.log(prod)
    await productos.save({ title, price, thumbnail })
    .then( (dato) => {
        res.json(dato)
    })
})

//recibe y actualiza un producto segun su id
router.put('/:id', async(req, res) => {
    const {id} = req.params;
    //const { title, price, thumbnail } = req.body;
    
    await productos.getById(id)
    .then(() => {

    })
    
})

router.delete('/:id', (req, res) => {
    // const arrayId = req.path.split(":");
    // const id = parseInt(arrayId[arrayId.length - 1]);
    // productos.forEach( (element, index) => {
    //     if (element.id === id){
    //         productos[index] = {};
    //     }
    // })
})


export {router};