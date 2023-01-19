import express from 'express';
import { fork } from 'child_process';

const router = express.Router();

router.get('/', (req, res) => {

	const forked = fork('src/factory/child.js');
	const cant = req.query.cant;
	
	forked.on('message', (msg, cant) => {
		 if (msg == 'listo') {
				 forked.send('Hola, ');
		 } else {
				 res.send('el resultado de la suma es: ' + msg);
		 }
	})
	
});

export { router as routerRandoms };
