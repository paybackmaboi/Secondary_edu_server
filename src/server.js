const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./models');
const studentRoutes = require('./routes/studentRoutes');
const gradeRoutes = require('./routes/gradeRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const observedValueRoutes = require('./routes/observedValueRoutes');
const subjectRoutes = require('./routes/subjectRoutes');
const remedialRoutes = require('./routes/remedialRoutes');
const schoolRecordRoutes = require('./routes/schoolRecordRoutes');
const accountRoutes = require('./routes/accountRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/students', studentRoutes);
app.use('/api/grades', gradeRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/observed-values', observedValueRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/remedial-classes', remedialRoutes);
app.use('/api/school-records', schoolRecordRoutes);
app.use('/api/accounts', accountRoutes);

// Database sync
db.sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});
