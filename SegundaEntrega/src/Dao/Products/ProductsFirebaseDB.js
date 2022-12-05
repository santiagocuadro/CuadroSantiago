import { MongoDBContainer } from "../../Containers/index.js";
import { FirebaseDBContainer } from '../../containers/index.js';
import { ProductModel } from "../../models/index.js";

export class ProductsFirebase extends FirebaseDBContainer {
  constructor() {
    super({
      collection: ProductModel.ProductsCollection
    });
  }
}