import db from '../db.js';

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
    getAllParcials: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT y.year_id, y.year_value, pe.period_id, pe.period_name, pe.start_date as period_start, pe.end_date as period_end, pa.parcial_id, pa.parcial_name, pa.start_date as parcial_start, pa.end_date as parcial_end FROM Parcial pa INNER JOIN Period pe ON pa.period_id = pe.period_id RIGHT JOIN Year y ON pe.year_id = y.year_id';
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
    getParcialsByYear: (period_id) => {
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
