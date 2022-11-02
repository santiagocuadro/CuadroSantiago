import express from "express";
import { ProductosApi } from "../../Api/ProductosApi.js";
import { DATE_UTILS } from "../../utils/index.js";
import {verifyRole} from "../../middlewares/verifyRole.js";

const router = express.Router();


// Me permite listar todos los productos disponibles o un producto por su id
// (discponible para usuarios y administradores)
router.get("/:id?", async (req, res) => { 
  try {
    const { id } = req.params;

    if(id !== undefined){
      const products = await ProductosApi.getById(Number(id));  
      res.send({products: products});
    }else {
      const products = await ProductosApi.getAll();  
      res.send(products);
    }
  } catch (error) {
    res.send({success: false});
  }
});

// Para incorporar productos al listado
// (disponible para administradores)
router.post("/", verifyRole,async (req, res) => {
  try {
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const product = { nombre, descripcion, codigo, foto, precio, stock, timestamp:DATE_UTILS.getTimestamp() };
    const productoCompleto = await ProductosApi.save(product);

    res.send({product: productoCompleto});
  } catch (error) {
    res.send({ success: false});
  }
});

// Actualiza un producto por su id
// (disponible para administradores)
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
    const updatedProduct = await ProductosApi.updateById(
      id, 
      { nombre, descripcion, codigo, foto, precio, stock, timestamp:DATE_UTILS.getTimestamp() }
    );

    res.send({ updated: updatedProduct});
  } catch (error) {
    res.send({ success: false});
  }
});

// Borra un producto por su id
// (disponible para administradores)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ProductosApi.deleteById(Number(id));
    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

export { router as routerProducts };
