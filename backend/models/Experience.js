import mongoose from 'mongoose';

const experienceSchema = new mongoose.Schema({
    role: {
        title: {
            type: String,
            required: true
        }
    },
    company: {
        type: String,
        required: true
    },
    location: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    description: {
        type: String
    },
    technologies: {
        type: [String]
    }
}, {
    timestamps: true
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;