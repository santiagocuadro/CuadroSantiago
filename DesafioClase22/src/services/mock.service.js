import { createFakeUser } from "../utils/index.js";

class MockService   {
    items=[]
    constructor(){}
  getAll(qty = 5) {
    for (let i = 1; i <= qty; i++) {
      const newItem = createFakeUser(i);
      this.items.push(newItem);
    }
    return this.items;
  }
 
}

export { MockService };
