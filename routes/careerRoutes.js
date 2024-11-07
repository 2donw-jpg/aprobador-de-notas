import express from 'express';
import CareerController from '../controllers/careerController.js';

const careerRouter = express.Router();

careerRouter.post('/careers', CareerController.createCareer);
careerRouter.get('/careers', CareerController.getAllCareers);
careerRouter.get('/careers/:id', CareerController.getCareerById);
careerRouter.put('/careers/:id', CareerController.updateCareer);
careerRouter.delete('/careers/:id', CareerController.deleteCareer);

export default careerRouter;
