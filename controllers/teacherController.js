import TeacherService from '../services/teacherService.js';

const TeacherController = {
    
    createTeacher: async (req, res) => {
        try {
            const { teacher_name, teacher_email} = req.body;
            const results = await TeacherService.createTeacher(teacher_name,teacher_email );
            res.status(201).json({ id: results.insertId, teacher_name, teacher_email });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    addCareerToTeacher: async (req, res) => {
        const teacherId = req.params.id;
        try {
            const {career_id } = req.body;
            const results = await TeacherService.addCareerToTeacher(teacherId, career_id);
            res.status(201).json({ id: results.insertId, teacherId, career_id});
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    getAllTeachers: async (req, res) => {
        try {
            const results = await TeacherService.getAllTeachers();
            res.json(results);
        } catch (error) {
            console.error("Error retrieving teachers:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getTeacherById: async (req, res) => {
        const teacherId = req.params.id;
    
        try {
            const results = await TeacherService.getTeacherById(teacherId);
            
            if (results.length === 0) {
                console.log("Error: Teacher not found");
                return res.status(404).json({ error: 'Teacher not found' });
            }
    
            const teacherData = {
                teacher_name: results[0].teacher_name,
                careers: [],
                classes: []
            };
    
            results.forEach(row => {
                if (row.career_name) {
                    teacherData.careers.push({
                        career_id: row.career_id,
                        career_name: row.career_name
                    });
                }
            });
            res.json(teacherData);
        } catch (err) {
            console.error("Error occurred:", err);
            return res.status(500).json({ error: err.message });
        }
    },

    updateTeacher: async (req, res) => {
        try {
            const teacherId = req.params.id;
            const { name } = req.body;
            const results = await TeacherService.updateTeacher(teacherId, name);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Teacher not found' });
            }
            res.json({ id: teacherId, name });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    deleteTeacher: async (req, res) => {
        try {
            const teacherId = req.params.id;
            const results = await TeacherService.deleteTeacher(teacherId);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Teacher not found' });
            }
            res.status(204).send();
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};

export default TeacherController;
