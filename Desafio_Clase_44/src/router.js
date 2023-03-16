import express from "express";
import { ProductController } from './controllers/productsController.js';

const router = express.Router();

router.get("/", ProductController.getAll);

// Me permite listar todos los productos disponibles o un producto por su id
// (discponible para usuarios y administradores)
router.get("/:id?", ProductController.getById);

// Para incorporar productos al listado
// (disponible para administradores)
router.post("/", ProductController.createProduct);

// Actualiza un producto por su id
// (disponible para administradores)
router.put("/:id", ProductController.updateById);

// Borra un producto por su id
// (disponible para administradores)
router.delete("/:id", ProductController.deleteById);

export { router as routerProducts };
