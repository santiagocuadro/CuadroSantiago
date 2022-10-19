import express from "express";
import {ContainerMemory} from "../Containers/Container.js";


const router = express.Router();

const productsMemory = new ContainerMemory();

router.get('/', (req, res) => {
    const products = productsMemory.getAll();
    res.json({products});
})

//devuelve un producto segun su id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = productsMemory.getById(Number(id));

    if (!product) {
        return res.send({
        data: undefined,
        message: "Product not found",
        });
    }

    res.send({ data: product });
})


//recibe y agrega un producto y lo devuelve con su id asignado
router.post('/', (req, res) => {
    const {title, price, thumbnail} = req.body;
    const product = productsMemory.save({title, price, thumbnail});
    res.send({data: product});
})

//recibe y actualiza un producto segun su id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;

    const updatedProduct = productsMemory.updateById(id, {
        title,
        price,
        thumbnail,
    });

    res.send({ success: true, data: { updated: updatedProduct } });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    productsMemory.deleteById(Number(id));
    res.send({ success: true })
})


export {router};