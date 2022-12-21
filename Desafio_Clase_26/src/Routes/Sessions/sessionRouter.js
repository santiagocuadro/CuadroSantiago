import express from 'express';
import passport from "passport";
import { ProductDao } from '../../Dao/index.js';
import Authenticated from '../../middlewares/authenticated.js';

const router = express.Router();


router.post("/register", passport.authenticate("register", { failureRedirect: "/failregister" }), (req, res) => {
  res.redirect("/");
});

router.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), (req, res) => {
  res.redirect("/");
});

router.get("/", Authenticated, (req, res) => {
  res.redirect("/login");
});

router.get("/login", Authenticated,(req, res) => {
  res.render("view/login");
});

router.get("/logout", (req, res) => {
  const { username } = req.user;
  req.logout();
  res.render("view/logout", { username: username });
});

router.get("/register", (req, res) => {
  res.render("view/register");
});

router.get("/failregister", (req, res) => {
  res.render("view/register-error", {});
});

router.get("/faillogin", (req, res) => {
	res.render("view/login-error", {});
});


router.post('/productos', async (req, res) => {
  const { producto, precio, urlImagen } = req.body;
  const productoParaGuardar = { producto, precio, urlImagen };
  await ProductDao.save(productoParaGuardar);
  const productos = ProductDao.getAll();
  res.render('view/home', { productos, username: req.user.username })
});


export { router as routerSession } 
