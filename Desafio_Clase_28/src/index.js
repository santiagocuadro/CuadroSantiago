import express from 'express';
import {engine} from 'express-handlebars';
import session from "express-session";
import MongoStore from 'connect-mongo';
import mongoose from "mongoose";
import passport from 'passport';
import cookieParser from "cookie-parser";
import {Strategy as LocalStrategy} from 'passport-local';
import * as strategy from './passport/strategy.js';
import { User } from './models/index.js';
import { routerProducts, routerMessage, routerTest, routerSession, routerInfo, routerRandoms } from './Routes/index.js';
import parseArgs from 'minimist';

const app = express();
const args = parseArgs(process.argv.slice(2))
const PORT =  args.PORT;

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", engine({extname: ".hbs",defaultLayout: "index.hbs",}));
app.set("view engine", "hbs");
app.set('views', './public');

const MONGO_DB_URI = process.env.MONGO_DB_URL || 'mongodb://localhost:27017';

app.use(session({
  store:MongoStore.create({
    mongoUrl: MONGO_DB_URI,
    ttl:600, 
    collectionName:'sessions'
}),
secret:'secret',
resave: false,
saveUninitialized: false,
rolling: false,
cookie: {
  maxAge: 600000,
}
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  "login",
  new LocalStrategy({ passReqToCallback: true }, strategy.login)
);

passport.use(
  "register",
  new LocalStrategy({ passReqToCallback: true }, strategy.register)
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});


app.use('/', routerSession);

app.use('/api/productos', routerProducts);
app.use('/api/mensajes', routerMessage);

// Mocks para productos
app.use('/api/products-test', routerTest);

app.use('/info', routerInfo);
app.use('/api/randoms', routerRandoms);

app.use('*', (req, res) => {
  res.send({ error: -1, descripcion: 'ruta "x" método "y" no autorizada' });
});

const server = app.listen(PORT, async () => {
  console.log(`Running on port ${PORT}`)
  try {
    await mongoose.connect(MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected DB");
  } catch (error) {
    console.log(`Error en conexión de Base de datos: ${error}`);
  }
});
server.on('error', (err) => console.log(err));
