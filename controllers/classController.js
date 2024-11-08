import ClassService from '../services/classService.js'; // Ensure the correct path is used

const ClassController = {
    createClass: async (req, res) => {
        const { class_code, class_name } = req.body;
        try {
            const results = await ClassService.createClass(class_code, class_name);
            res.status(201).json({ id: results.insertId, class_code, class_name });
        } catch (error) {
            console.error("Error creating class:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllClasses: async (req, res) => {
        try {
            const results = await ClassService.getAllClasses();
            res.json(results);
        } catch (error) {
            console.error("Error retrieving classes:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getClassById: async (req, res) => {
        const classId = req.params.id;

        try {
            const results = await ClassService.getClassById(classId);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Class not found' });
            }
            res.json(results[0]);
        } catch (error) {
            console.error("Error retrieving class:", error);
            res.status(500).json({ error: error.message });
        }
    },

    getClassByCode: async (req, res) => {
        const class_code = req.params.class_code;
        try {
            const results = await ClassService.getClassByCode(class_code);
            if (results.length === 0) {
                return res.status(404).json({ error: 'Class not found' });
            }
            res.json(results[0]);
        } catch (error) {
            console.error("Error retrieving class:", error);
            res.status(500).json({ error: error.message });
        }
    },

    updateClass: async (req, res) => {
        const classId = req.params.id;
        const { class_code, class_name } = req.body;

        try {
            const results = await ClassService.updateClass(classId, class_code, class_name);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Class not found' });
            }
            res.json({ id: classId, class_code, class_name });
        } catch (error) {
            console.error("Error updating class:", error);
            res.status(500).json({ error: error.message });
        }
    },

    deleteClass: async (req, res) => {
        const classId = req.params.id;

        try {
            const results = await ClassService.deleteClass(classId);
            if (results.affectedRows === 0) {
                return res.status(404).json({ error: 'Class not found' });
            }
            res.status(204).send(); // No content response
        } catch (error) {
            console.error("Error deleting class:", error);
            res.status(500).json({ error: error.message });
        }
    }
};

export default ClassController;
