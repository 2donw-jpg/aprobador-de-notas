import db from '../src/db.js';

const ClassService = {
    createClass: (class_code, class_name) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO class(class_code, class_name) VALUES (?,?)';
            db.query(query, [class_code, class_name], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getAllClasses: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT class_code, class_name FROM class WHERE class_active = TRUE';
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getClassById: (classId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT class_code, class_name FROM class WHERE class_id = ?';
            db.query(query, [classId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    updateClass: (classId,class_code, class_name) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE class SET class_code = ?, class_name = ? WHERE class_id = ?';
            db.query(query, [class_code, class_name, classId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    deleteClass: (classId) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE class SET class_active = FALSE WHERE class_id = ?';
            db.query(query, [classId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default ClassService;
