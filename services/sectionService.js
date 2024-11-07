import db from '../src/db.js';

const SectionService = {
    createSection: (section_name) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO section(section_name) VALUES (?)';
            db.query(query, [section_name], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getAllSections: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM section';
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getSectionById: (sectionId) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM section WHERE section_id = ?';
            db.query(query, [sectionId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    updateSection: (sectionId, section_name) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE section SET section_name = ? WHERE section_id = ?';
            db.query(query, [section_name, sectionId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    deleteSection: (sectionId) => {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM section WHERE section_id = ?';
            db.query(query, [sectionId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default SectionService;