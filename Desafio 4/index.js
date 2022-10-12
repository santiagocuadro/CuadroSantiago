import express from "express";
import { router } from "./Routes/productos.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
const PORT = 8080;
const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', error => console.log(`Error: ${error}`));

app.use('/api/productos', router);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/formulario', express.static(__dirname+'/public/index.html'))



