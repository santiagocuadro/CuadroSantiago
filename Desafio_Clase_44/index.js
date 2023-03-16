import express from 'express';
import { router } from './src/router.js';

const app = express();




app.use('/',router);






app.use("*", (req, res) => {
  res.send({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" });
});

const server = app.listen(PORT, async () => {
  console.log(`Running on port ${PORT}`);
});
server.on("error", (err) => console.log(`Error en el servidor: ${err}`));
