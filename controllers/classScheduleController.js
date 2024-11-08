import ClassScheduleService from '../services/classScheduleService.js';

const ClassScheduleController = {
  createClassSchedule: async (req, res) => {
    try {
      const { 
          teacher_id, teacher_name, class_id, class_code, class_name, section_id, section_name, 
          parcial_id, parcial_name, period_name, year_name, notes 
      } = req.body;

      const result = await ClassScheduleService.createClassSchedule(
        teacher_id, teacher_name, class_id, class_code, class_name, section_id, section_name,
        parcial_id, parcial_name, period_name, year_name, notes
      );

      res.status(201).json({ message: 'Class schedule created successfully', schedule_id: result.insertId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get all class schedules
  getAllClassSchedules: async (req, res) => {
    try {
      const schedules = await ClassScheduleService.getAllClassSchedules();
      res.status(200).json(schedules);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Get class schedule by ID
  getClassScheduleById: async (req, res) => {
    const { schedule_id } = req.params;
    try {
      const schedule = await ClassScheduleService.getClassScheduleById(schedule_id);
      if (schedule.length > 0) {
        res.status(200).json(schedule[0]);
      } else {
        res.status(404).json({ message: 'Class schedule not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClassScheduleByParcial: async (req, res) => {
    const { parcial_id } = req.params;
    try {
      const schedule = await ClassScheduleService.getClassScheduleByParcial(parcial_id);
      if (schedule.length > 0) {
        res.status(200).json(schedule[0]);
      } else {
        res.status(404).json({ message: 'Class schedule not found' });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getClassScheduleByParcialGroup: async (req, res) => {
    try {

        const { parcial_id } = req.params;
        const teachers = await ClassScheduleService.getClassScheduleByParcial(parcial_id);

        const groupedData = teachers.reduce((acc, teacher) => {

          let teacherGroup = acc.find(item => item.idCatedratico === teacher.teacher_id);            
          
          if (!teacherGroup) {
              teacherGroup = {
                idCatedratico: teacher.teacher_id,
                nombre:teacher.teacher_name,
                clases: []
                };
                acc.push(teacherGroup);
            }

            teacherGroup.clases.push({
                code: teacher.class_code,
                class: teacher.class_name,
                section: teacher.section_name,
                grade_status: true,
            });

            return acc;
        }, []);


        res.json(groupedData);
    } catch (error) {
        console.error("Error processing parcials:", error);
        res.status(500).json({ error: error.message });
    }
  },

  // Update a class schedule
  updateClassSchedule: async (req, res) => {
    const { schedule_id } = req.params;
    const { 
      teacher_id, teacher_name, class_id,class_code, class_name, section_id, section_name, 
      parcial_id, parcial_name, period_name, year_name, notes 
    } = req.body;

    try {
      const result = await ClassScheduleService.updateClassSchedule(
        schedule_id, teacher_id, teacher_name, class_id, class_code,class_name, section_id, 
        section_name, parcial_id, parcial_name, period_name, year_name, notes
      );

      res.status(200).json({ message: 'Class schedule updated successfully', affectedRows: result.affectedRows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  // Soft delete a class schedule
  deleteClassSchedule: async (req, res) => {
    const { schedule_id } = req.params;
    try {
      const result = await ClassScheduleService.deleteClassSchedule(schedule_id);
      res.status(200).json({ message: 'Class schedule marked as deleted', affectedRows: result.affectedRows });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

};


export default ClassScheduleController;