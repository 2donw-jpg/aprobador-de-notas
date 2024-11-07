import express from 'express';
import SectionController from './sectionController.js';

const SectionRouter = express.Router();

SectionRouter.post('/sections', SectionController.createSection);
SectionRouter.get('/sections', SectionController.getAllSections);
SectionRouter.get('/sections/:id', SectionController.getSectionById);
SectionRouter.put('/sections/:id', SectionController.updateSection);
SectionRouter.delete('/sections/:id', SectionController.deleteSection);

export default SectionRouter;
