import express from 'express';
import TeacherController from '../controllers/teacherController.js';

const teacherRouter = express.Router();

teacherRouter.post('/teachers', TeacherController.createTeacher);
teacherRouter.post('/teachers/:id/career', TeacherController.addCareerToTeacher);
teacherRouter.get('/teachers', TeacherController.getAllTeachers);
teacherRouter.get('/teachers/:id', TeacherController.getTeacherById);
teacherRouter.put('/teachers/:id', TeacherController.updateTeacher);
teacherRouter.delete('/teachers/:id', TeacherController.deleteTeacher);


export default teacherRouter;
