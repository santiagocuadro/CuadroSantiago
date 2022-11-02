import express from "express";
import { CarritoApi } from "../../Api/CarritoApi.js";
import { ProductosApi } from "../../Api/ProductosApi.js";
import { DATE_UTILS } from "../../utils/index.js";

const router = express.Router();

router.get("", async (req, res) => {
  const cart = await CarritoApi.getAll();
  res.send({carrito: cart});
});

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
    await CarritoApi.deleteAll();

    res.send({ success: true });
  } catch (error) {
    res.send({ success: false, error: error});
  }
});

// Me permite listar todos los productos guardados en el carrito
router.get("/:id/productos", async (req, res) => {});

// Para incorporar productos al carrito por su id de producto
router.post("/:cartId/productos", async (req, res) => {
  const { productId } = req.body;
  const { cartId } = req.params;

  const cart = await CarritoApi.getById(Number(cartId));

  if (!cart)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_CART });

  const product = await ProductosApi.getById(Number(productId));

  if (!product)
    return res.send({ error: true, message: ERRORS_UTILS.MESSAGES.NO_PRODUCT });

  // TODO
  cart.products.push(product);

  const updatedCart = await CarritoApi.updateById(Number(cartId), cart);

  res.send({ success: true, cart: updatedCart });
});

// Elimina un producto del carrito por su id de carrito y de producto
router.delete("/:id/productos/:id_prod", async (req, res) => {});

export { router as routerCarrito };
