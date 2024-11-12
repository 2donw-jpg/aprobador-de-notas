import express from 'express';
import ClassController from '../controllers/classController.js'; // Ensure the correct path is used

const classRouter = express.Router();

classRouter.post('/classes', ClassController.createClass);
classRouter.get('/classes', ClassController.getAllClasses);
classRouter.get('/classes/list', ClassController.getList);
classRouter.get('/classes/:id', ClassController.getClassById);
classRouter.get('/classes/code/:class_code', ClassController.getClassByCode);
classRouter.put('/classes/:id', ClassController.updateClass);
classRouter.delete('/classes/:id', ClassController.deleteClass);

export default classRouter;