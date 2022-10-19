import express from "express";
import { router } from "./Routes/productos.js";
// import path, { extname } from 'path';
// import { fileURLToPath } from 'url';
import handlebars from "express-handlebars";
import { ViewsRouter } from "./Routes/viewsRouters.js";


// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8080;

app.engine('hbs', handlebars.engine({
    extname: '.hbs',
    defaultLayout: 'main.hbs'
}))
app.set("view engine", "hbs");
app.set("views", "./views");

app.use(express.json());

app.use('/', ViewsRouter);
app.use('/api/productos', router);  

app.use(express.urlencoded({ extended: true }));

// app.use('/formulario', express.static(__dirname+'/public/index.html'))


const server = app.listen(PORT, () => console.log(`Server listening on PORT ${PORT}`));
server.on('error', error => console.log(`Error: ${error}`));
