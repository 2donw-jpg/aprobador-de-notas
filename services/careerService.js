import db from '../src/db.js';

const CareerService = {
    createCareer: (name) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO career(career_name) VALUES (?)';
            db.query(query, [name], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getAllCareers: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM career';
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getCareerById: (careerId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM career WHERE career_id = ?';
            db.query(query, [careerId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    updateCareer: (careerId, name) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE career SET career_name = ? WHERE career_id = ?';
            db.query(query, [name, careerId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    deleteCareer: (careerId) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM career WHERE career_id = ?';
            db.query(query, [careerId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default CareerService;
