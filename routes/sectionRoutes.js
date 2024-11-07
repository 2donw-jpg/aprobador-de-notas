import express from 'express';
import SectionController from '../controllers/sectionController.js';

const sectionRouter = express.Router();

sectionRouter.post('/sections', SectionController.createSection);
sectionRouter.get('/sections', SectionController.getAllSections);
sectionRouter.get('/sections/:id', SectionController.getSectionById);
sectionRouter.put('/sections/:id', SectionController.updateSection);
sectionRouter.delete('/sections/:id', SectionController.deleteSection);

export default sectionRouter;
