import express from 'express';
import { engine } from 'express-handlebars';
import session from 'express-session';
import { routerProducts, routerMessage, routerTest, routerSession } from './Routes/index.js';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = 8080;

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './public');


app.use(session({
  secret:'secret',
  resave: false,
  saveUninitialized: false
}))


app.use('/', routerSession);
app.use('/api/productos', routerProducts);
app.use('/api/mensajes', routerMessage);
app.use('/api/products-test', routerTest);

app.use('*', (req, res) => {
  res.send({ error: -1, descripcion: 'ruta "x" método "y" no autorizada' });
});

const server = app.listen(PORT, () => console.log(`Running on port ${PORT}`));
server.on('error', (err) => console.log(err));
