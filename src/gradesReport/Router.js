import express from 'express';
import Controller from './Controller.js';

const GradesReportRouter = express.Router();

GradesReportRouter.post('/grade-report', Controller.createGradesReport);
GradesReportRouter.put('/grade-report/:schedule', Controller.updateGradeStatus);
GradesReportRouter.get('/grade-report/parcial/:parcial', Controller.getListByParcial);


export default GradesReportRouter;