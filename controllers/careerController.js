import CareerService from '../services/careerService.js';

const CareerController = {
    
    createCareer: async (req, res) => {
        try {
            const { name } = req.body;
            const results = await CareerService.createCareer(name);
            res.status(201).json({ id: results.insertId, name });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllCareers: async (req, res) => {
        try {
            const results = await CareerService.getAllCareers();
            res.json(results);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getCareerById: async (req, res) => {
        try {
            const careerId = req.params.id;
            const results = await CareerService.getCareerById(careerId);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Career not found' });
            }
            res.json(results[0]);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    updateCareer: async (req, res) => {
        try {
            const careerId = req.params.id;
            const { name } = req.body;
            const results = await CareerService.updateCareer(careerId, name);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Career not found' });
            }
            res.json({ id: careerId, name });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteCareer: async (req, res) => {
        try {
            const careerId = req.params.id;
            const results = await CareerService.deleteCareer(careerId);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Career not found' });
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default CareerController;
