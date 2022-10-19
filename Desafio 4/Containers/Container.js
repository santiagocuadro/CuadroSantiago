

class ContainerMemory{

    constructor(){
        this.elements = [];
    }

    getAll(){
        return this.elements;
    }

    save(obj){
        obj.id = 
        this.elements.length === 0 
            ? 1 
            :this.elements[this.elements.length - 1].id + 1;
        
        this.elements.push(obj);
        return obj;
    }

    getById(id){
        return this.elements.find((element) => element.id === id);
    }

    updateById(id, newData){
        const elementIndex = this.elements.findIndex((element) => element.id == id);

        if (elementIndex === -1) return null;

        const foundElement = this.elements[elementIndex];

        for (const key in newData) {
            if (foundElement.hasOwnProperty(key)) {
                foundElement[key] = newData[key];
            }
        }
      
        return this.elements[elementIndex];
    }

    deleteById(id){
        this.elements.filter((element) => element.id != id);
        return { success: true };
    }

}

export {ContainerMemory};