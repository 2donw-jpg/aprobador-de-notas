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

      const teachers = await ClassScheduleController.getClassScheduleByParcial();
      const groupedData = parcials.reduce((acc, parcial) => {

      let yearGroup = acc.find(item => item.id === parcial.year_id);
  
      if (!yearGroup) {
      yearGroup = {
          id: parcial.year_id,
          name: parcial.year_value.toString(),
          title: parcial.year_value.toString(),
          children: []
      };
      acc.push(yearGroup);
      }

      let periodGroup = yearGroup.children.find(item => item.id === parcial.period_id);

      if (!periodGroup) {
      periodGroup = {
          id: parcial.period_id,
          name: parcial.period_name,
          title: parcial.period_name,
          children: []
      };
      yearGroup.children.push(periodGroup);
      }

      periodGroup.children.push({
      id: parcial.parcial_id,
      title: parcial.parcial_name
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