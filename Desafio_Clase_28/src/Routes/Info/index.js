import express from 'express';
import parseArgs from 'minimist';
import os from 'os';

const cantCpus = os.cpus().length;

const router = express.Router();

router.get("/",  (_req, res) => {
	const info = {
			argumentosDeEntrada: parseArgs(process.argv.slice(2)),
			nombreDeSistemaOperativo: process.platform,
			vercionDeNode: process.version,
			memoriaTotalReservada: process.memoryUsage(),
			pathDeEjecucion: process.execPath,
			processID: process.pid,
			carpetaDeProyecto: process.cwd(),
			cantidadDeProcesadores: cantCpus
			}
	res.send(info);
});

export {router as routerInfo};
