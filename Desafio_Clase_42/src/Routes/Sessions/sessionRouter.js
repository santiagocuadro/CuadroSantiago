import express from 'express';
import passport from "passport";
import { ProductDao } from '../../Dao/index.js';
import Authenticated from '../../middlewares/authenticated.js';
import { DATE_UTILS } from '../../utils/date-utils.js';
import nodemailer from 'nodemailer';

const router = express.Router();


router.post("/register", passport.authenticate("register", { failureRedirect: "/failregister" }), (req, res) => {
  //Enviar email con info del usuario creado
  res.redirect("/");
});

router.post("/login", passport.authenticate("login", { failureRedirect: "/faillogin" }), (req, res) => {
  res.redirect("/");
});

router.get("/", Authenticated, (req, res) => {
  res.redirect("/login");
});

router.get("/login", Authenticated, (req, res) => {
  res.render("view/login");
});

router.get("/logout", (req, res) => {
  const { username } = req.user;
  req.logOut({}, () => true);
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
  try {
    const { title, description, code, thumbnail, price, stock } = req.body;
    const product = { title, description, code, thumbnail, price, stock, timestamp:DATE_UTILS.getTimestamp() };
    await ProductDao.save(product);
    const products = await ProductDao.getAll();

    res.render('view/home', { productos: products, username: req.user.username });
    res.status(200);
  } catch (error) {
    console.log(`Error ${error}`);
    res.status(404);
  }
});



export { router as routerSession } 
