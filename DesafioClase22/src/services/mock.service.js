import { createFakeUser } from "../utils/index.js";

class MockService   {
  constructor(){
    this.items=[]
  }
  getAll(){
    this.populate(6);
    return  this.items
  }
  getOne(id){
    return this.items.find(item => item.id==id)
  }
  insert(obj){
    this.items.push(obj)
  }
  populate(limit){
    for (let index = 1; index < limit; index++) {
      this.insert( createFakeUser(index) );
    }
  }
 
}

export { MockService };
