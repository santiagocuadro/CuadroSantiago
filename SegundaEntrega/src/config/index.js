import dotenv from 'dotenv';
dotenv.config();

const PRODUCTS_FILENAME = "products";
const CARTS_FILENAME = "carts";

const config = {
  SERVER: {
    PORT: process.env.PORT || 8080,
    SELECTED_DATABASE: process.env.SELECTED_DB ?? "memory",
  },
  DATABASES: {
    filesystem: {
      PRODUCTS_FILENAME,
      CARTS_FILENAME,
    },
    mongo: {
      url: process.env.MONGO_DB_URL,
      dbName: process.env.MONGO_DB_NAME,
    },
    fireBase: {
      config_DB: process.env.config_DB,
      dbName: process.env.FIREBASE_DB_NAME,
    }
  },
};

export { config };
