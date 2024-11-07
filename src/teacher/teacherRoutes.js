import express from 'express';
import TeacherController from './teacherController.js';

const TeacherRouter = express.Router();

TeacherRouter.post('/teachers', TeacherController.createTeacher);
TeacherRouter.post('/teachers/:id/career', TeacherController.addCareerToTeacher);
TeacherRouter.get('/teachers', TeacherController.getAllTeachers);
TeacherRouter.get('/teachers/:id', TeacherController.getTeacherById);
TeacherRouter.put('/teachers/:id', TeacherController.updateTeacher);
TeacherRouter.delete('/teachers/:id', TeacherController.deleteTeacher);


export default TeacherRouter;
