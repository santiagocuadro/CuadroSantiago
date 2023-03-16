import { ContainerMemory } from '../ContainerMemory.js';
import { buildSchema } from 'graphql';
import crypto from 'crypto'
import { Parser } from 'graphql/language/parser.js';


const ProductDao = new ContainerMemory();


const schema = buildSchema(`
	input ProductoInput {
		title: String,
		description: String,
		code: String,
		thumbnail: String,
		price: Int,
		stock: Int
	}
	type Producto {
		id: ID!
		title: String,
		description: String,
		code: String,
		thumbnail: String,
		price: Int,
		stock: Int
	}
	type Query {
		getAll(campo: String, valor: String): [Producto],
		getById(id: ID!): Producto,
	}
	type Mutation {
		createProduct(datos: ProductoInput): Producto
    updateById(id: ID!, datos: ProductoInput): Producto,
    deleteById(id: ID!): Producto,
	}
`)

class Producto {
  constructor(id, { title, description, code, thumbnail, price, stock }) {
    this.id = id;
    this.title = title;
    this.description = description;
		this.code = code;
		this.thumbnail = thumbnail;
		this.price = price;
		this.stock = stock;
  }
}


const productosMap = {};

const getAll = ({  campo, valor }) => {
const productos = Object.values(productosMap)
if (campo && valor) {
    return productos.filter(p => p[campo] == valor)

  } else {
    return productos
  }
};

const getById = ({ id }) => {
  if (!productosMap[id]) {
    throw new Error('Product not found.')
  }
  return productosMap[id]
};

const createProduct = ({ datos }) => {
  const id = crypto.randomBytes(10).toString('hex');
  const nuevoProducto = new Producto(id, datos);
  productosMap[id] = nuevoProducto;
  return nuevoProducto
};

const updateById = ({ id, datos }) => {
	if (!productosMap[id]) {
    throw new Error('Producto not found');
  }
  const productoActualizado = new Producto(id, datos);
  productosMap[id] = productoActualizado;
  return productoActualizado
}

const deleteById = ({ id }) => {
	if (!productosMap[id]) {
    throw new Error('Producto not found')
  }
  const productoBorrada = productosMap[id]
  delete productosMap[id]
  return productoBorrada
};


export const ProductController = {
	getAll,
	getById,
	createProduct,
	updateById,
	deleteById,
	schema
}
