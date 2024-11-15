import PeriodService from './Service.js'; 

const PeriodController = {
    createPeriod: async (req, res) => {
        console.log("Request Body:", req.body);  
        const {period_name,year_id, start_date, end_date} = req.body;
        try {
            const results = await PeriodService.createPeriod(period_name,year_id, start_date, end_date);
            res.status(201).json({ id: results.insertId, period_name, year_id, start_date, end_date});
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

    getPeriodsByYearGroup: async (req, res) => {
        try {
            const periods = await PeriodService.getAllPeriods();
            const groupedData = periods.reduce((acc, period) => {

                let yearGroup = acc.find(item => item.id === period.year_id);

                if (!yearGroup) {
                  yearGroup = {
                    id: period.year_id,
                    name: period.year_value.toString(),
                    title: period.year_value.toString(),
                    children: []
                  };
                  acc.push(yearGroup);
                }
          
                yearGroup.children.push({
                  id: period.period_id,
                  name: period.period_name,
                  title: period.period_name,
                  start_date: period.start_date,
                  end_date: period.end_date,
                });
          
                return acc;
              }, []);
          
              res.json(groupedData);
            } catch (error) {
              console.error("Error fetching periods:", error);
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
