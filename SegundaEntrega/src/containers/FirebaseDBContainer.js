
class FirebaseDBContainer {
  constructor({ collection }) {
    this.model = collection.doc();
  }

  async getAll() {
    try {
			const response = await this.model.get();
    	return response.docs.map(doc => { return {...doc.data(), id:doc.id}} );	
		} catch (error) {
			console.log('error en getAll', error);
		}
		
  }

  async save(element) {
    const response = await this.model.create(element);
    return response;
  }

  async getById(id) {
    const response = await this.model.doc(id).get();

    return response.data();
  }

  async updateById(id, newData) {
		try {
			const response = await this.model.doc(id);
			await response.update(newData);
			return response;		
		} catch (error) {
			console.log('error en update', error);
		}
  }

  async deleteById(id) {
		try {
			const response = await this.model.doc(id);
			await response.delate();
    	return response;	
		} catch (error) {
			console.log('error en delateById', error);
		}
		
  }
}

export { FirebaseDBContainer };
