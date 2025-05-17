import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { mockData } from './data/mockData.js';

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
    if (mockData.projects && mockData.projects.length > 0) {
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
      console.log(`Migrated ${projects.length} projects`);
    } else {
      console.log('No project data to migrate');
    }

    // Insert skills
    if (mockData.skills && mockData.skills.length > 0) {
      const skillsToInsert = mockData.skills.flatMap(skillCategory =>
        skillCategory.skills.map(skillName => ({
          name: skillName,
          category: skillCategory.category,
          level: 0, // Default level if not in mockData
          icon: '' // Default icon if not in mockData
        }))
      );
      await Skill.insertMany(skillsToInsert);
      console.log(`Migrated ${skillsToInsert.length} skills`);
    } else {
      console.log('No skill data to migrate');
    }

    // Insert education
    if (mockData.education && mockData.education.length > 0) {
      const education = mockData.education.map(edu => ({
        degree: edu.degree,
        institution: edu.institution,
        startDate: edu.startDate,
        endDate: edu.endDate,
        description: edu.description, // Assuming description exists in mockData
        location: edu.location // Assuming location exists in mockData
      }));
      await Education.insertMany(education);
      console.log(`Migrated ${education.length} education entries`);
    } else {
      console.log('No education data to migrate');
    }

    // Insert experience
    if (mockData.experience && mockData.experience.length > 0) {
      const experience = mockData.experience.map(exp => ({
        title: exp.role, // Mapping role to title
      company: exp.company,
      startDate: exp.duration.split(' - ')[0],
      endDate: exp.duration.split(' - ')[1] === 'Present' ? null : exp.duration.split(' - ')[1],
        description: exp.responsibilities.join('\n'),
      technologies: []
    }));
      await Experience.insertMany(experience);
      console.log(`Migrated ${experience.length} experience entries`);
    } else {
      console.log('No experience data to migrate');
    }

    // Insert certifications
    const certifications = mockData.certifications.map(cert => ({
      title: cert.title,
      issuer: cert.issuer,
      date: cert.issueDate,
      link: cert.certificateLink
    }));
    if (mockData.certifications && mockData.certifications.length > 0) {
      const certifications = mockData.certifications.map(cert => ({
        title: cert.title,
        issuer: cert.issuer,
        date: cert.issueDate,
        link: cert.certificateLink
      }));
      await Certification.insertMany(certifications);
      console.log(`Migrated ${certifications.length} certifications`);
    } else {
      console.log('No certification data to migrate');
    }

    console.log('Migration completed successfully');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateData();