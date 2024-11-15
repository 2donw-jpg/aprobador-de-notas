import TeacherService from './Service.js';

const TeacherController = {
    
    createTeacher: async (req, res) => {
        try {
            const { teacher_name, teacher_email, teacher_careers } = req.body;
            const results = await TeacherService.createTeacher(teacher_name, teacher_email);
            const teacherId = results.insertId;
            if (teacher_careers.length > 0) {
                for (const careerId of teacher_careers) {
                    await TeacherService.addCareerToTeacher(teacherId, careerId);
                }
            }
    
            // Send the response with the teacher's information
            res.status(201).json({ id: teacherId, teacher_name, teacher_email });
    
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
            const teachers = await TeacherService.getAllTeachers();
            const groupedData = teachers.reduce((acc, teacher) => {
                // Find the teacher group by teacher_id
                let teacherGroup = acc.find(item => item.teacher_id === teacher.teacher_id);
    
                if (!teacherGroup) {
                    // If the teacher group doesn't exist, create a new one
                    teacherGroup = {
                        teacher_id: teacher.teacher_id,
                        teacher_name: teacher.teacher_name,
                        teacher_email: teacher.teacher_email,
                        teacher_active: teacher.teacher_active,
                        teacher_careers: [] // Initialize the 'careers' array
                    };
                    acc.push(teacherGroup);
                }
    
                if (teacher.career_id !== null) {
                    teacherGroup.teacher_careers.push({
                        career_id: teacher.career_id,
                        career_name: teacher.career_name,
                    });
                }
    
                return acc;
            }, []);
    
            res.json(groupedData);
        } catch (error) {
            console.error("Error processing teachers:", error);
            res.status(500).json({ error: error.message });
        }
    },
    

    getList: async (req, res) => {
        try {
            const results = await TeacherService.getList();
            res.json(results);
        } catch (error) {
            console.error("Error retrieving teacher list:", error);
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
                teacher_email: results[0].teacher_email,
                careers: [],
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
