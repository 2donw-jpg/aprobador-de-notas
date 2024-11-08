import ParcialService from '../services/parcialService.js'; // Ensure correct path to your service

const ParcialController = {
    createParcial: async (req, res) => {
        const { parcial_name, period_id, start_date, end_date } = req.body;
        try {
            const results = await ParcialService.createParcial(parcial_name, period_id, start_date, end_date);
            res.status(201).json({ id: results.insertId, parcial_name, period_id, start_date, end_date });
        } catch (error) {
            console.error("Error creating parcial:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllParcials: async (req, res) => {
        try {
            const results = await ParcialService.getAllParcials();
            res.json(results);
        } catch (error) {
            console.error("Error retrieving parcials:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getParcialById: async (req, res) => {
        const parcialId = req.params.id;

        try {
            const results = await ParcialService.getParcialById(parcialId);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Parcial not found' });
            }
            res.json(results[0]);
        } catch (error) {
            console.error("Error retrieving parcial:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getParcialsByPeriod: async (req, res) => {
        const period_id = req.params.period_id;
        try {
            const results = await ParcialService.getParcialsByPeriod(period_id);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Parcials not found' });
            }
            res.json(results);
        } catch (error) {
            console.error("Error retrieving parcials:", error);
            res.status(500).json({ error: error.message });
        }
    },

    updateParcial: async (req, res) => {
        const parcialId = req.params.id;
        const { parcial_name, period_id, start_date, end_date } = req.body;

        try {
            const results = await ParcialService.updateParcial(parcialId, parcial_name, period_id, start_date, end_date);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Parcial not found' });
            }
            res.json({ id: parcialId, parcial_name, period_id, start_date, end_date });
        } catch (error) {
            console.error("Error updating parcial:", error);
            res.status(500).json({ error: error.message });
        }
    },

    deleteParcial: async (req, res) => {
        const parcialId = req.params.id;

        try {
            const results = await ParcialService.deleteParcial(parcialId);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Parcial not found' });
            }
            res.status(204).send(); // No content response
        } catch (error) {
            console.error("Error deleting parcial:", error);
            res.status(500).json({ error: error.message });
        }
    }
};

export default ParcialController;
