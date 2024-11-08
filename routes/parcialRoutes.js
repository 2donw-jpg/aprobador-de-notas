import express from 'express';
import ParcialController from '../controllers/ParcialController.js'; // Ensure the correct path is used

const parcialRouter = express.Router();

parcialRouter.post('/parcials', ParcialController.createParcial);
parcialRouter.get('/parcials', ParcialController.getParcialsByYearGroup);
parcialRouter.get('/parcials/:id', ParcialController.getParcialById);
parcialRouter.get('/parcials/year/:year_id', ParcialController.getParcialsByYearGroup);
parcialRouter.put('/parcials/:id', ParcialController.updateParcial);
parcialRouter.delete('/parcials/:id', ParcialController.deleteParcial);

export default parcialRouter;
