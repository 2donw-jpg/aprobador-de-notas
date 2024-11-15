import ParcialService from './Service.js'; // Ensure correct path to your service
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

    getParcialsByYear: async (req, res) => {
        const year_id = req.params.year_id;
        try {
            const results = await ParcialService.getParcialsByYear(period_id);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Parcials not found' });
            }
            res.json(results);
        } catch (error) {
            console.error("Error retrieving parcials:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getParcialsByYearGroup: async (req, res) => {
        try {

            const parcials = await ParcialService.getAllParcials();
            const groupedData = parcials.reduce((acc, parcial) => {

            let yearGroup = acc.find(item => item.id === parcial.year_id);
        
            if (!yearGroup) {
            yearGroup = {
                id: parcial.year_id,
                name: parcial.year_value.toString(),
                title: parcial.year_value.toString(),
                children: []
            };
            acc.push(yearGroup);
            }
    
            let periodGroup = yearGroup.children.find(item => item.id === parcial.period_id);
    
            if (!periodGroup) {
            periodGroup = {
                id: parcial.period_id,
                name: parcial.period_name,
                title: parcial.period_name,
                start_date: parcial.period_start,
                end_date: parcial.period_end,
                children: []
            };
            yearGroup.children.push(periodGroup);
            }
    
            periodGroup.children.push({
            id: parcial.parcial_id,
            title: parcial.parcial_name,
            start_date: parcial.parcial_start,
            end_date: parcial.parcial_end,
            });
        
              return acc;
            }, []);
        
            res.json(groupedData);
        } catch (error) {
            console.error("Error processing parcials:", error);
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
