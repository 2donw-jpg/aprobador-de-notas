import SectionService from './sectionService.js';

const SectionController = {

    createSection: async (req, res) => {
        try {
            const { section_name } = req.body;
            const results = await SectionService.createSection(section_name);
            res.status(201).json({ id: results.insertId, section_name });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllSections: async (req, res) => {
        try {
            const results = await SectionService.getAllSections();
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getSectionById: async (req, res) => {
        try {
            const sectionId = req.params.id;
            const results = await SectionService.getSectionById(sectionId);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Section not found' });
            }
            res.json(results[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateSection: async (req, res) => {
        try {
            const sectionId = req.params.id;
            const { section_name } = req.body;
            const results = await SectionService.updateSection(sectionId, section_name);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Section not found' });
            }
            res.json({ id: sectionId, section_name });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteSection: async (req, res) => {
        try {
            const sectionId = req.params.id;
            const results = await SectionService.deleteSection(sectionId);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Section not found' });
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default SectionController;
