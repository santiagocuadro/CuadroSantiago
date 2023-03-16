// import axios from  'axios'
// import {strictEqual, deepStrictEqual} from 'assert'
// import {ProductDao} from '../Dao/index.js';
import {app} from '../index.js';
import {expect} from 'chai'
import request from 'supertest'

// const agregar = product => axios.post('http://localhost:8080/api/productos', {product});
// const devolverTodos =()=> axios.get('http://localhost:8080/api/productos')


describe("comprobar que el servidor funcione bien",function(){

	it('deberia agregar un producto', async function(){
		const product = {
			"title": "producto", 
    	"description": "hola", 
    	"code": 1234, 
    	"thumbnail": "foto", 
    	"stock": 55,
    	"price": 50000 
		}

		const response = await request(app).post('/api/productos').send(product);

		expect(response.body.product.title).to.contains("producto");
		expect(response.status).to.equal(200);
	})

	it('deberia devolver todos los productos', async function(){ 

		const response = await request(app).get('/api/productos');
		
		expect(response.body.products.length).to.equal(1);
		expect(response.status).to.equal(200);

	})

	it('deberia devolver un producto segun su id', async function(){ 

		const response = await request(app).get('/api/productos/1');

		expect(response.body.products.id).to.equal(1);
		expect(response.status).to.equal(200);

	})

	it('deberia actualizar un producto por su id', async function(){ 
		const product = {
			"title": "producto actualizado",
    	"description": "hola",
    	"code": 1234,
    	"thumbnail": "foto",
    	"stock": 55,
    	"price": 50000
		}
		const response = await request(app).put('/api/productos/1').send(product);

		expect(response.body.updated.title).to.equal("producto actualizado");
		expect(response.status).to.equal(200);

	})

	it('deberia eliminar un producto por su id', async function(){ 

		const response = await request(app).delete('/api/productos/1');

		expect(response.body.success).to.equal(true);
		expect(response.status).to.equal(200);

	})

	

})