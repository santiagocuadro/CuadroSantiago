import { DATE_UTILS } from '../utils/index.js';

class SQLContainer {
  // esta clase recibe el knex ya con sus options (esto está en el DAO/index.js, y el nombre de la tabla)
  constructor(knex, tableName) {
    this.knex = knex;
    this.table = tableName;
  }

  async getAll() {
    try {
      const response = await this.knex.select("*").from(this.table);
      return response;
    } catch (error) {
      return error;
    }
  }

  async save(element) {
    try {
      const response = await this.knex.insert(element).into(this.table);
      return response;
    } catch (error) {
      return error;
    }
  }

  async getById(id) {
    try {
      const response = await this.knex.from(this.table).where({id: id}).first();
      return response;
    } catch (error) {
      return error;
    }
  }

  async updateById(id, newData) {
    let response;
    try {
      if (this.table === 'products'){
        response = await this.knex.where({id: id}).update({title: newData.title, price: newData.price, thumbnail: newData.thumbnail, timestamp: DATE_UTILS.getTimestamp()});
      }
      if (this.table === 'messages'){
        response = await this.knex.where({id: id}).update({email: newData.email, text: newData.text, timestamp: DATE_UTILS.getTimestamp()});
      }
      return response;  
    } catch (error) {
      return error;
    }
  }

  async deleteById(id) {
    try {
      const response = await this.knex.from(this.table).where({id: id}).del();
      return response;
    } catch (error) {
      return error;
    }
  }

}

export { SQLContainer };
