import express from "express";
import { router } from "./Routes/ProductsRouter.js";
import { ViewsRouter } from "./Routes/viewsRouters.js";
import handlebars from "express-handlebars";

const PORT = 8080;


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  "hbs",
  handlebars.engine({
    extname: ".hbs",
    defaultLayout: "main.hbs",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use("/", ViewsRouter);
app.use("/api/productos", router);

const server = app.listen(PORT, () =>
  console.log("Running on port " + server.address().port)
);
