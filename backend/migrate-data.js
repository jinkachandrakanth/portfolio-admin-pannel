import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { mockData } from '../black-orbit-display/src/lib/utils.js';

// Load environment variables
dotenv.config();

// MongoDB connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb+srv://jinkachandrakanth2003:c1618@1234@cluster0.ksop6cl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

// Connect to MongoDB
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

// Import models
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Education from './models/Education.js';
import Experience from './models/Experience.js';
import Certification from './models/Certification.js';

async function migrateData() {
  try {
    // Clear existing data
    await Promise.all([
      Project.deleteMany({}),
      Skill.deleteMany({}),
      Education.deleteMany({}),
      Experience.deleteMany({}),
      Certification.deleteMany({})
    ]);
    console.log('Cleared existing data');

    // Insert projects
    const projects = mockData.projects.map(project => ({
      title: project.title,
      description: project.description,
      technologies: project.techStack,
      image: project.imageUrl,
      link: project.liveDemoLink,
      date: project.date,
      featured: project.featured
    }));
    await Project.insertMany(projects);
    console.log('Migrated projects');

    // Insert skills
    const skills = mockData.skills.map(skill => ({
      category: skill.category,
      skills: skill.skills
    }));
    await Skill.insertMany(skills);
    console.log('Migrated skills');

    // Insert education
    const education = mockData.education.map(edu => ({
      degree: edu.degree,
      institution: edu.institution,
      startDate: edu.startDate,
      endDate: edu.endDate,
      cgpa: edu.cgpa
    }));
    await Education.insertMany(education);
    console.log('Migrated education');

    // Insert experience
    const experience = mockData.experience.map(exp => ({
      role: exp.role,
      company: exp.company,
      startDate: exp.duration.split(' - ')[0],
      endDate: exp.duration.split(' - ')[1] === 'Present' ? null : exp.duration.split(' - ')[1],
      description: exp.responsibilities.join('\n'),
      technologies: []
    }));
    await Experience.insertMany(experience);
    console.log('Migrated experience');

    // Insert certifications
    const certifications = mockData.certifications.map(cert => ({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.issueDate,
      link: cert.certificateLink
    }));
    await Certification.insertMany(certifications);
    console.log('Migrated certifications');

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();