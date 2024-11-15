import express from 'express';
import ClassScheduleController from './Controller.js';

const scheduleRouter = express.Router();

scheduleRouter.post('/schedule', ClassScheduleController.createClassSchedule);
scheduleRouter.get('/schedule', ClassScheduleController.getAllClassSchedules);
scheduleRouter.get('/data/schedule', ClassScheduleController.getFormData);
scheduleRouter.get('/schedule/:id', ClassScheduleController.getClassScheduleById);
scheduleRouter.get('/schedule/parcial/:parcial_id', ClassScheduleController.getClassScheduleByParcialGroup);
scheduleRouter.put('/schedule/:id', ClassScheduleController.updateClassSchedule);
scheduleRouter.delete('/schedule/:id', ClassScheduleController.deleteClassSchedule);

export default scheduleRouter;
