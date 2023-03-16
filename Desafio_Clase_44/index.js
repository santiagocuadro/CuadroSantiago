import express from 'express';
// import { routerProducts } from './src/router.js';
import { graphqlHTTP } from 'express-graphql';
import { ProductController } from './src/controllers/productsController.js';

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// app.use('/', routerProducts);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: ProductController.schema,
    rootValue: {
      getAll: ProductController.getAll,
      getById: ProductController.getById,
      createProduct: ProductController.createProduct,
      updateById: ProductController.updateById,
      deleteById: ProductController.deleteById
    },
		graphiql: true,
  })
);





app.use("*", (req, res) => {
  res.send({ error: -1, descripcion: "ruta 'x' método 'y' no autorizada" });
});


const server = app.listen(PORT, async () => {
  console.log(`Running on port ${PORT}`);
});
server.on("error", (err) => console.log(`Error en el servidor: ${err}`));
