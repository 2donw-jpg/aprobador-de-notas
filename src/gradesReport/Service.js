import db from '../db.js';

const GradesReportService = {
    /**
     * Crea un reporte vacio para 
     * @param {*} schedule_id El registro de horario a espera de notas
     * @returns {Promise}
     */
    createGradesReport: (schedule_id) => {
        return new Promise((resolve, reject) => {
            const query = `INSERT INTO GradesReport (schedule_id, status) VALUES (?, false)`;
            db.query(query, [schedule_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    /**
     * Recibe todos los registros de horario 
     * @param {number} parcial_id El parcial a realizar el filtro de reportes
     * @returns {Promise}
     */
    getListByParcial: (parcial_id) => {
        return new Promise((resolve, reject) => {
            const query = 'SELECT c.teacher_name, c.schedule_id, c.class_code, c.class_name, c.section_name, g.status, r.responsible_name,g.status_date FROM GradesReport g INNER JOIN ClassSchedule c ON c.schedule_id = g.schedule_id LEFT JOIN responsible r ON r.responsible_id = g.responsible_id WHERE c.parcial_id = ?';
            db.query(query, [parcial_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    },

    /**
     * Recibe todos los registros de horario 
     * @param {*} responsible_id El responsable del cambio 
     * @param {*} schedule_id El id de la asignación del catedrático al cual entrega notas
     * @returns {Promise}
     */
    updateGradeStatus: (responsible_id, schedule_id) => {
        console.log("Responsible: ", responsible_id);
        console.log("Schedule: ", schedule_id);
        return new Promise((resolve, reject) => {
            const query = `UPDATE GradesReport SET status = true, status_date = NOW(), responsible_id = ? WHERE schedule_id = ?`;
            db.query(query, [responsible_id, schedule_id], (err, results) => {
                if (err) reject(err);
                else resolve(results);
            });
        });
    }


   
};

export default GradesReportService;
