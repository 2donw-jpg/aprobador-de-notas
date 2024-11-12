// index.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


import careerRoutes from './routes/careerRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import classRouter from './routes/classRoutes.js';
import sectionRouter from './routes/sectionRoutes.js';
import peridoRouter from './routes/periodRoutes.js';
import parcialRouter from './routes/parcialRoutes.js';
import scheduleRouter from './routes/classScheduleRoutes.js';
import GradesReportRouter from './src/gradesReport/Router.js';

const app = express();
const PORT = 4000;
var corsOptions = {
    origin: "*",
};


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', careerRoutes);
app.use('/api', teacherRoutes);
app.use('/api', classRouter);
app.use('/api', sectionRouter);
app.use('/api', peridoRouter);
app.use('/api', parcialRouter);
app.use('/api', scheduleRouter);
app.use('/api',GradesReportRouter);

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on port ${PORT}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
