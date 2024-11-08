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
app.use('/api', sectionRouter);
app.use('/api', peridoRouter);
app.use('/api', parcialRouter);

app.listen(PORT, (error) => {
    if (!error) {
        console.log(`Server is running on port ${PORT}`);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});
