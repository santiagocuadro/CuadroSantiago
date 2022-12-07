import { faker } from "@faker-js/faker";
faker.locale = "es";

const createFakeUser = (id) => {
  return {
    nombre:faker.internet.email(),
    price:faker.random.numeric(),
    foto:faker.image.imageUrl(),
  }
};
export {
  createFakeUser,
};
