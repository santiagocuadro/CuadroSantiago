import express from "express";
import { Server as IOServer } from "socket.io";
import { Server as HttpServer } from "http";
import { routerProducts, routerMessages, routerTest } from "./Routes/index.js";

const app = express();

const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



const PORT = 8080;

app.use(express.static("public"));


io.on("connection", async (socket) => {

  socket.emit("mensajes", await MessagesDao.getAll());

  socket.on("mensajeNuevo", async ({ email, text }) => {
    const message = { email, text, timestamp: DATE_UTILS.getTimestamp() };
    await MessagesDao.save(message);

    io.sockets.emit("mensajes", await MessagesDao.getAll());
  });
});





app.use("/api/productos", routerProducts);
app.use("/api/messages", routerMessages);
app.use("/api/productos-test", routerTest);


app.use("*", (req, res) => {
  res.send({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" });
});

const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
server.on("error", (err) => console.log(err));
