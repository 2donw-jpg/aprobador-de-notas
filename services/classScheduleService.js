import db from '../src/db.js';

const ClassScheduleService = {
    // Create a new class schedule
    createClassSchedule: (teacher_id, teacher_name, class_id, class_code, class_name, section_id, section_name, parcial_id, parcial_name, period_name, year_name, notes) => {
        return new Promise((resolve, reject) => {
            const query = `
                INSERT INTO ClassSchedule 
                (teacher_id, teacher_name, class_id,class_code, class_name, section_id, section_name, parcial_id, parcial_name, period_name, year_name, notes) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
            `;
            db.query(query, [teacher_id, teacher_name, class_id, class_code, class_name, section_id, section_name, parcial_id, parcial_name, period_name, year_name, notes], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get all class schedules
    getAllClassSchedules: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ClassSchedule';
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get class schedule by ID
    getClassScheduleById: (schedule_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ClassSchedule WHERE schedule_id = ?';
            db.query(query, [schedule_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getClassScheduleByParcial: (parcial_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ClassSchedule WHERE parcial_id = ?';
            db.query(query, [parcial_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Get class schedules by teacher
    getClassSchedulesByTeacher: (teacher_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM ClassSchedule WHERE teacher_id = ?';
            db.query(query, [teacher_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Update a class schedule
    updateClassSchedule: (schedule_id, teacher_id, teacher_name, class_id,class_code, class_name, section_id, section_name, parcial_id, parcial_name, period_name, year_name, notes) => {
        return new Promise((resolve, reject) => {
            const query = `
                UPDATE ClassSchedule 
                SET teacher_id = ?, teacher_name = ?, class_id = ?, class_code = ?, class_name = ?, section_id = ?, section_name = ?, parcial_id = ?, parcial_name = ?, period_name = ?, year_name = ?, notes = ? 
                WHERE schedule_id = ?
            `;
            db.query(query, [teacher_id, teacher_name, class_id, class_code, class_name, section_id, section_name, parcial_id, parcial_name, period_name, year_name, notes, schedule_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    // Soft delete a class schedule (set notes to NULL or mark as inactive)
    deleteClassSchedule: (schedule_id) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE ClassSchedule SET notes = NULL WHERE schedule_id = ?';
            db.query(query, [schedule_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default ClassScheduleService;
