import express from 'express';
import PeriodController from '../controllers/periodController.js'; // Ensure the correct path is used

const periodRouter = express.Router();

periodRouter.post('/periods', PeriodController.createPeriod);
periodRouter.get('/periods', PeriodController.getPeriodsByYearGroup);
periodRouter.get('/periods/:id', PeriodController.getPeriodById);
periodRouter.get('/periods/year/:year', PeriodController.getPeriodsByYear);
periodRouter.put('/periods/:id', PeriodController.updatePeriod);
periodRouter.delete('/periods/:id', PeriodController.deletePeriod);

export default periodRouter;
