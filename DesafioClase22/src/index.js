import express from "express";
import { Server as HttpServer } from "http";
import { Server as IOServer } from "socket.io";
import { MessagesDao, ProductDao } from "./Dao/index.js";
import { routerTest } from "./Routes/Products-test.js";

const PORT = 8080;

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

io.on("connection", async (socket) => {

  socket.emit("mensajes", await MessagesDao.getAll());

  socket.on("mensajeNuevo", async ({author: { id, nombre, apellido, edad, alias, avatar}, text}) => {
    const message = {author: { id, nombre, apellido, edad, alias, avatar}, text};
    await MessagesDao.save(message);

    io.sockets.emit("mensajes", await MessagesDao.getAll());
  });

  socket.emit("products", await ProductDao.getAll());

  socket.on("add-product", async (data) => {
    await ProductDao.save(data);
    io.sockets.emit("products", await ProductDao.getAll());
  });
});

app.use('/api/productos-test', routerTest);

const server = httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en puerto ${PORT}`);
});
server.on("error", (error) => {
  console.error(`Error en el servidor ${error}`);
});

