import express from "express";
import { routerProducts,routerCarrito } from "./Routes/index.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.use(express.static("public"));

app.use("/api/productos", routerProducts);
app.use("/api/carrito", routerCarrito);

app.use("*", (req, res) => {
  res.send({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" });
});

const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
server.on("error", (err) => console.log(err));
