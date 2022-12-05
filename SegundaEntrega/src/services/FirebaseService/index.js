import admin from 'firebase-admin';
import { config } from "../../config/index.js";

admin.initializeApp({
	credential: admin.credential.cert(config.DATABASES.config_DB)
})

const init = async () => {
	try {
		const db = admin.firestore();
		console.log('firebase connected');
		return db;		
	} catch (error) {
		console.log('error al conectar firebase');
	}
}

export const FirebaseDBService = {
  init,
};