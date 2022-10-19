import { Router } from "express";
// import { ContainerMemory } from "../Containers/Container.js"

const ViewsRouter = Router();
// const ProductApi = new ContainerMemory(); 

ViewsRouter.get("/", (req, res) => {
  res.render("form-products");
});

// ViewsRouter.post("/productos", async (req, res) => {
//   const { title, price, thumbnail } = req.body;

//   ProductApi.save({ title, price, thumbnail });

//   res.redirect("/");
// });

// ViewsRouter.get("/productos", async (req, res) => {
//   const products = ProductApi.getAll();
//   res.render("table-products", { productos: products });
// });

export { ViewsRouter };
