import db from '../db.js';

const PeriodService = {
    // Create a new period
    createPeriod: (period_name, year_id, start_date, end_date) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Period (period_name, year_id, start_date, end_date) VALUES (?, ?, ?, ?)';
            db.query(query, [period_name, year_id, start_date, end_date], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get all periods
    getAllPeriods: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT p.year_id, y.year_value, p.period_id, p.period_name, p.start_date, p.end_date FROM Period p INNER JOIN Year y ON y.year_id = p.year_id ORDER BY p.year_id';
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get period by ID
    getPeriodById: (periodId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT period_id, period_name, year_id, start_date, end_date FROM Period WHERE period_id = ?';
            db.query(query, [periodId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get period by year
    getPeriodByYear: (year_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT period_id, period_name, start_date, end_date FROM Period WHERE year_id = ?';
            db.query(query, [year_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Update a period
    updatePeriod: (periodId, period_name, year_id, start_date, end_date) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Period SET period_name = ?, year_id = ?, start_date = ?, end_date = ? WHERE period_id = ?';
            db.query(query, [period_name, year_id, start_date, end_date, periodId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Soft delete a period (set end_date as NULL or mark inactive)
    //TODO: Fix this
    deletePeriod: (periodId) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Period SET end_date = NULL WHERE period_id = ?';
            db.query(query, [periodId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default PeriodService;
