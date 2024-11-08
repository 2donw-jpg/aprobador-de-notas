import express from 'express';
import ClassScheduleController from '../controllers/classScheduleController.js';

const scheduleRouter = express.Router();

scheduleRouter.post('/schedule', ClassScheduleController.createClassSchedule);
scheduleRouter.get('/schedule', ClassScheduleController.getAllClassSchedules);
scheduleRouter.get('/schedule/:id', ClassScheduleController.getClassScheduleById);
scheduleRouter.get('/schedule/:id', ClassScheduleController.getClassScheduleByParcial);
scheduleRouter.put('/schedule/:id', ClassScheduleController.updateClassSchedule);
scheduleRouter.delete('/schedule/:id', ClassScheduleController.deleteClassSchedule);

export default scheduleRouter;
