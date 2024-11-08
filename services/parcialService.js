import db from '../src/db.js';

const ParcialService = {
    // Create a new parcial
    createParcial: (parcial_name, period_id, start_date, end_date) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO Parcial (parcial_name, period_id, start_date, end_date) VALUES (?, ?, ?, ?)';
            db.query(query, [parcial_name, period_id, start_date, end_date], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get all parciales
    getAllParciales: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT parcial_id, parcial_name, period_id, start_date, end_date FROM Parcial';
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get parcial by ID
    getParcialById: (parcialId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT parcial_id, parcial_name, period_id, start_date, end_date FROM Parcial WHERE parcial_id = ?';
            db.query(query, [parcialId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get parciales by period
    getParcialesByPeriod: (period_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT parcial_id, parcial_name, start_date, end_date FROM Parcial WHERE period_id = ?';
            db.query(query, [period_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Update a parcial
    updateParcial: (parcialId, parcial_name, period_id, start_date, end_date) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Parcial SET parcial_name = ?, period_id = ?, start_date = ?, end_date = ? WHERE parcial_id = ?';
            db.query(query, [parcial_name, period_id, start_date, end_date, parcialId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Soft delete a parcial (set end_date as NULL or mark inactive)
    deleteParcial: (parcialId) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE Parcial SET end_date = NULL WHERE parcial_id = ?';
            db.query(query, [parcialId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default ParcialService;
