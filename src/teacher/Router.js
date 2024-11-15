import express from 'express';
import TeacherController from './Controller.js';

const teacherRouter = express.Router();

teacherRouter.get('/teachers', TeacherController.getAllTeachers);
teacherRouter.get('/teachers/list', TeacherController.getList);
teacherRouter.get('/teachers/:id', TeacherController.getTeacherById);

teacherRouter.post('/teachers', TeacherController.createTeacher);
teacherRouter.post('/teachers/:id/career', TeacherController.addCareerToTeacher);

teacherRouter.put('/teachers/:id', TeacherController.updateTeacher);

teacherRouter.delete('/teachers/:id', TeacherController.deleteTeacher);


export default teacherRouter;
