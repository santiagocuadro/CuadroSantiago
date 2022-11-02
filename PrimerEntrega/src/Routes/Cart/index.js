import express from "express";
import { CarritoApi } from "../../Api/CarritoApi.js";
import { ProductosApi } from "../../Api/ProductosApi.js";
import { DATE_UTILS } from "../../utils/index.js";

const router = express.Router();

// Crea un carrito y devuelve su id 
router.post("/", async (req, res) => {
  try {
    const baseCart = { timestamp: DATE_UTILS.getTimestamp(), products: [] };
    const cart = await CarritoApi.save(baseCart);
    res.send({ success: true, cartId: cart.id });
  } catch (error) {
    res.send({ success: false});
  }
  
});

// Vacia un carrito y lo elimina 
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await CarritoApi.deleteById(Number(id));

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false });
  }
});

// Me permite listar todos los productos guardados en el carrito 
router.get("/:id/productos", async (req, res) => {
  try {
    const { id } = req.params;
    const cart = await CarritoApi.getById(Number(id));
    const products = cart.products;
    res.send({success: true, productos: products})
  } catch (error) {
    
  }
});

// Para incorporar productos al carrito por su id de producto 
router.post("/:id/productos", async (req, res) => {
  try {
    const { productId } = req.body;
    const { id } = req.params;
    const cart = await CarritoApi.getById(Number(id));

    if (!cart) {
      return res.send({ success: false, message: "carrito vacio" });
    }

    const product = await ProductosApi.getById(Number(productId));

    if (!product) {
      return res.send({ success: false, message: "lista de productos vacia" });
    }

    cart.products.push(product);

    const updatedCart = await CarritoApi.updateById(Number(id), cart);

    res.send({ success: true, cart: updatedCart });
  } catch (error) {
    res.send({ success: false, cart: updatedCart });
  }
});

// Elimina un producto del carrito por su id de carrito y de producto 
router.delete("/:id/productos/:id_prod", async (req, res) => {
  try {
    const { id_prod } = req.params;
    const { id } = req.params;
    const cart = await CarritoApi.getById(Number(id));

    if (!cart) {
      return res.send({ success: false, message: "Carrito no encontrado" });
    }

    const index = cart.products.findIndex((element) => element.id === Number(id_prod));

    if (index === -1) return res.send({success: false, message: "producto no encontrado"});

    cart.products = cart.products.filter((element) => element.id !== Number(id_prod));
    await CarritoApi.updateById(Number(id), cart);
    
    res.send({ success: true , result: cart.products});
  } catch (error) {
    res.send({ success: false });
  }
});

export { router as routerCarrito };
