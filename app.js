// index.js
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';


import careerRoutes from './src/career/careerRoutes.js';
import teacherRoutes from './src/teacher/teacherRoutes.js';
import classRouter from './src/class/classRoutes.js';
import SectionRouter from './src/section/sectionRoutes.js';

const app = express();
const PORT = 3000;
var corsOptions = {
    origin: "http://localhost:8081",
};


app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', careerRoutes);
app.use('/api', teacherRoutes);
app.use('/api', classRouter);
app.use('/api', SectionRouter);

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on port ${PORT}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
