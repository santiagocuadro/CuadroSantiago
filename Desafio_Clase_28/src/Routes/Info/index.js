import express from 'express';
import parseArgs from 'minimist';

const args = parseArgs(process.argv.slice(2));

const router = express.Router();

router.get('/', (req,res) => {
	const result = {
		args
	}
	res.send(result);
})

export {router as routerInfo};