import Service from './Service.js';
import { dateFormater } from '../dateFormater.js';

const Controller = {
    createGradesReport: async (req, res) => {
        const { schedule_id } = req.body;
        try {
            const results = await Service.createGradesReport(schedule_id);
            res.status(201).json({ id: results.insertId, schedule_id});
        } catch (error) {
            console.error("Error creating grades report:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getListByParcial: async (req, res) => {
        const { parcial } = req.params;
        const teachers = await Service.getListByParcial(parcial);

        const groupedData = teachers.reduce((acc, teacher) => {

        let teacherGroup = acc.find(item => item.nombre === teacher.teacher_name);            
          
          if (!teacherGroup) {
              teacherGroup = {
                nombre:teacher.teacher_name,
                clases: []
                };
                acc.push(teacherGroup);
            }

            teacherGroup.clases.push({
                schedule_id: teacher.schedule_id,
                code: teacher.class_code,
                class: teacher.class_name,
                section: teacher.section_name,
                grade_status: teacher.status,
                responsable_id: teacher.responsable_id == null,
                responsible_name: teacher.responsible_name == null? "" : teacher.responsible_name,
                grade_status_date: teacher.status_date == null? "": dateFormater(teacher.status_date)
            });

            return acc;
        }, []);


        res.json(groupedData);
    },

    updateGradeStatus: async (req, res) => {
        const schedule_id = req.params.schedule;
        const { responsible_id } = req.body;
        try {
            const results = await Service.updateGradeStatus(responsible_id, schedule_id);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Schedule not found' });
            }
            res.json({ id: responsible_id, schedule_id});
        } catch (error) {
            console.error("Error updating grades report:", error);
            res.status(500).json({ error: error.message });
        }
    },
};

export default Controller;
