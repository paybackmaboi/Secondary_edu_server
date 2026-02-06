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
const analyticsRoutes = require('./routes/analyticsRoutes');
const reportsRoutes = require('./routes/reportsRoutes');
const authRoutes = require('./routes/authRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000'
];

if (process.env.CORS_ORIGIN) {
    allowedOrigins.push(process.env.CORS_ORIGIN);
}

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);

        if (process.env.CORS_ALLOW_ALL === 'true') {
            return callback(null, true);
        }

        const isAllowed = allowedOrigins.includes(origin) ||
            (process.env.CORS_ORIGIN && process.env.CORS_ORIGIN.split(',').includes(origin));

        if (isAllowed) {
            return callback(null, true);
        }

        // Optional: Allow all for debugging if needed, or strictly enforce:
        // return callback(new Error('Not allowed by CORS'));
        return callback(null, true); // TEMPORARY: Allow all to prevent deployment issues
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'x-user-id'],
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
app.use('/api/analytics', analyticsRoutes);
app.use('/api/reports', reportsRoutes);
app.use('/api/auth', authRoutes);

// Database sync
db.sequelize.sync({ alter: true }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to sync database:', err);
});

