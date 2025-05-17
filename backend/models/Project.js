import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String },
    technologies: [String],
    image: { type: String },
    featured: { type: Boolean, default: false },
    date: { type: String },
}, { timestamps: true }); // createdAt and updatedAt are automatically handled

export default mongoose.model('Project', projectSchema); 