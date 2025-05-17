import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import projectsRouter from './routes/projects.js';

const app = express();
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://jinkachandrakanth2003:c1618%401234@cluster0.ksop6cl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.use(cors());
app.use(express.json());

// Basic root route
app.get('/', (req, res) => {
    res.send('Portfolio API is running');
});

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('MongoDB connected');
        app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch((err) => console.error('MongoDB connection error:', err));

app.use('/api/projects', projectsRouter); 