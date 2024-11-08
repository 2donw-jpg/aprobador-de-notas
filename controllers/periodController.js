import PeriodService from '../services/periodService.js'; 

const PeriodController = {
    createPeriod: async (req, res) => {
        const { period_name,year_id, start_date, end_date } = req.body;
        try {
            const results = await PeriodService.createPeriod(period_name,year_id, start_date, end_date);
            res.status(201).json({ id: results.insertId, period_name,year_id, start_date, end_date});
        } catch (error) {
            console.error("Error creating period:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllPeriods: async (req, res) => {
        try {
            const results = await PeriodService.getAllPeriods();
            res.json(results);
        } catch (error) {
            console.error("Error retrieving periods:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getPeriodById: async (req, res) => {
        const periodId = req.params.id;

        try {
            const results = await PeriodService.getPeriodById(periodId);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Period not found' });
            }
            res.json(results[0]);
        } catch (error) {
            console.error("Error retrieving periods:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getPeriodsByYear: async (req, res) => {
        const period_year = req.params.year;
        try {
            const results = await PeriodService.getPeriodsByYear(period_year);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Periods not found' });
            }
            res.json(results[0]);
        } catch (error) {
            console.error("Error retrieving periods:", error);
            res.status(500).json({ error: error.message });
        }
    },

    updatePeriod: async (req, res) => {
        const periodId = req.params.id;
        const {period_name, year_id, start_date, end_date} = req.body;

        try {
            const results = await PeriodService.updatePeriod(periodId, period_name, year_id, start_date, end_date);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Class not found' });
            }
            res.json({ id: periodId, period_name, year_id, start_date, end_date });
        } catch (error) {
            console.error("Error updating period:", error);
            res.status(500).json({ error: error.message });
        }
    },

    deletePeriod: async (req, res) => {
        const periodId = req.params.id;

        try {
            const results = await PeriodService.deletePeriod(periodId);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Period not found' });
            }
            res.status(204).send(); // No content response
        } catch (error) {
            console.error("Error deleting period:", error);
            res.status(500).json({ error: error.message });
        }
    }
};

export default PeriodController;
