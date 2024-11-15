import ClassScheduleService from './Service.js';
import ClassService from '../class/Service.js';
import TeacherService from '../teacher/Service.js';
import SectionService from '../section/Service.js';
import GradesReportService from '../gradesReport/Service.js';

const ClassScheduleController = {
  createClassSchedule: async (req, res) => {
    const schedules = req.body;  // An array of schedule objects
    try {
      // Insert each schedule into the database
      const results = await Promise.all(schedules.map(schedule =>
        ClassScheduleService.createClassSchedule(
          schedule.teacher_id, schedule.teacher_name, 
          schedule.class_id, schedule.class_name, 
          schedule.section_id, schedule.section_name,
          schedule.parcial_id, schedule.parcial_name,
          schedule.period_name, schedule.year_name
        )
      ));

      // Collect the results and send a response
      const insertedSchedules = results.map(result => ({
        schedule_id: result.insertId,  // Assuming insertId is returned after insert
        parcial_id: result.parcial_id,
        teacher_id: result.teacher_id,
        class_id: result.class_id,
        section_id: result.section_id,
        period_name: result.period_name,
        year_name: result.year_name,
      }));

      res.status(201).json({
        message: 'Class schedules created successfully',
        schedules: insertedSchedules,  // Send back the details of the inserted schedules
      });

      // Optionally trigger a grades report creation for each schedule
      results.forEach(result => {
        GradesReportService.createGradesReport(result.insertId);
      });

    } catch (error) {
      console.error("Error creating class schedules:", error);
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
      teacher_id, teacher_name, class_id, class_name, section_id, section_name, 
      parcial_id, parcial_name, period_name, year_name, notes 
    } = req.body;

    try {
      const result = await ClassScheduleService.updateClassSchedule(
        schedule_id, teacher_id, teacher_name, class_id, class_name, section_id, 
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


  getFormData: async (req, res) =>{
    try {
      const [teachers, classes, sections] = await Promise.all([
        TeacherService.getList(),
        ClassService.getList(),
        SectionService.getAllSections()
      ]);

      const responseData = {
        teachers,
        classes,
        sections
      };

      res.json(responseData);
  } catch (error) {
      console.error("Error processing parcials:", error);
      res.status(500).json({ error: error.message });
  }
  }

};


export default ClassScheduleController;