import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import projectsRouter from './routes/projects.js';
import skillsRouter from './routes/skills.js';
import educationRouter from './routes/education.js';
import experienceRouter from './routes/experience.js';
import certificationsRouter from './routes/certifications.js';
import contactRouter from './routes/contact.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://jinkachandrakanth2003:c1618%401234@cluster0.ksop6cl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors({
    origin: ['http://localhost:8080', 'http://localhost:3000'],
    credentials: true
}));
app.use(express.json());

// Basic root route
app.get('/', (req, res) => {
    res.send('Portfolio API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Connect to MongoDB and start server
const startServer = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');

        const server = app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

        // Handle server shutdown
        process.on('SIGTERM', () => {
            console.log('SIGTERM received. Shutting down gracefully...');
            server.close(() => {
                console.log('Server closed');
                mongoose.connection.close(false, () => {
                    console.log('MongoDB connection closed');
                    process.exit(0);
                });
            });
        });

    } catch (err) {
        console.error('Failed to start server:', err);
        process.exit(1);
    }
};

// Routes
app.use('/api/projects', projectsRouter);

app.use('/api/skills', skillsRouter);
app.use('/api/education', educationRouter);
app.use('/api/experience', experienceRouter);
app.use('/api/certifications', certificationsRouter);
app.use('/api/contact', contactRouter);
// Start the server
startServer(); 