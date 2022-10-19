import express from "express";
import { ProductApi } from "../Api/ProductsApi.js"

const router = express.Router();

router.get('/', (req, res) => {
    const products = ProductApi.getAll();
    res.json({products});
})

//devuelve un producto segun su id
router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = ProductApi.getById(Number(id));

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
    const product = ProductApi.save({title, price, thumbnail});
    res.send({data: product});
})

//recibe y actualiza un producto segun su id
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const { title, price, thumbnail } = req.body;

    const updatedProduct = ProductApi.updateById(id, {
        title,
        price,
        thumbnail,
    });

    res.send({ success: true, data: { updated: updatedProduct } });
})

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    ProductApi.deleteById(Number(id));
    res.send({ success: true })
})


export {router};