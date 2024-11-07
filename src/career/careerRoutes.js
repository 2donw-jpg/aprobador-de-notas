import express from 'express';
import CareerController from './careerController.js';

const CareerRouter = express.Router();

CareerRouter.post('/careers', CareerController.createCareer);
CareerRouter.get('/careers', CareerController.getAllCareers);
CareerRouter.get('/careers/:id', CareerController.getCareerById);
CareerRouter.put('/careers/:id', CareerController.updateCareer);
CareerRouter.delete('/careers/:id', CareerController.deleteCareer);

export default CareerRouter;
