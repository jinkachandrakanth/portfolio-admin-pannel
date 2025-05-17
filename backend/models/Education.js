import mongoose from 'mongoose';

const educationSchema = new mongoose.Schema({
    degree: {
        type: String,
        required: true,
    },
    institution: {
        type: String,
        required: true,
    },
    startDate: {
        type: String,
    },
    endDate: {
        type: String,
    },
    location: {
        type: String,
    },
    description: {
        type: String,
    },
});

const Education = mongoose.model('Education', educationSchema);

export default Education;