//const Container = require("../container");
import { Container } from "../container.js";

class User extends Container {
  constructor(archivo) {
    super(archivo);
  }
  getBySocketId(socketId) {
    try {
      const { data } = this.getData();
      const foundData = data.find((element) => element.socketId === socketId);
      if (!foundData) throw new Error("Elemento no encontrado");
      return foundData;
    } catch (error) {
      console.log(
        `Error al obtener un usuario por su socketId: ${error.message}`
      );
    }
  }
}

const Users = new User("Users");

//module.exports = Users;
export { User };
