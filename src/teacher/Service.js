import db from '../db.js';

const TeacherService = {
    createTeacher: (teacher_name,teacher_email) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO teacher(teacher_name, teacher_email) VALUES (?,?)';
            db.query(query, [teacher_name,teacher_email], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getAllTeachers: () => {
        return new Promise((resolve, reject) => {
            const query = 
            `SELECT t.teacher_id, t.teacher_name, t.teacher_email, t.teacher_active, c.career_id, c.career_name
            FROM teacher AS t 
            LEFT JOIN teachercareer AS tc ON t.teacher_id = tc.teacher_id 
            LEFT JOIN career AS c ON tc.career_id = c.career_id`;
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getList: () => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT teacher_id, teacher_name FROM teacher WHERE teacher_active = 1';
            db.query(query, (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    getTeacherById: (teacherId) => {
        return new Promise((resolve, reject) => {
            const query = 
            `SELECT t.teacher_id, t.teacher_name, t.teacher_email, t.teacher_active, c.career_id, c.career_name
            FROM teacher AS t 
            LEFT JOIN teachercareer AS tc ON t.teacher_id = tc.teacher_id 
            LEFT JOIN career AS c ON tc.career_id = c.career_id
            WHERE t.teacher_id = ?`;
    
            db.query(query, [teacherId], (err, results) => {
                if (err) {
                    reject(new Error('Failed to retrieve teacher information.'));
                } else {
                    resolve(results);
                }
            });
        });
    },

    addCareerToTeacher: (teacherId, carrerId) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO teachercareer(teacher_id, career_id) VALUES (?,?)';
            db.query(query, [teacherId, carrerId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    updateTeacher: (teacherId, name) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE teacher SET teacher_name = ? WHERE teacher_id = ?';
            db.query(query, [name, teacherId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    deleteTeacher: (teacherId) => {
        return new Promise((resolve, reject) => {
            const query = 'UPDATE teacher SET teacher_active = FALSE WHERE teacher_id = ?';
            db.query(query, [ teacherId], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }
};

export default TeacherService;
