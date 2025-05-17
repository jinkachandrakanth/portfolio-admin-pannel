import mongoose from 'mongoose';
import Project from './models/Project.js';
import Skill from './models/Skill.js';
import Education from './models/Education.js';
import Experience from './models/Experience.js';
import Certification from './models/Certification.js';

// Use the same MONGO_URI as in server.js
const MONGO_URI = 'mongodb+srv://jinkachandrakanth2003:c1618%401234@cluster0.ksop6cl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const migrateData = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected for migration');

    // PASTE YOUR ACTUAL mockData OBJECT FROM FRONTEND HERE
    const mockData = {
      projects: [
        // Example structure (replace with actual data)
        {
          title: "Example Project 1",
          description: "This is a description for example project 1.",
          link: "http://example.com/project1",
          technologies: ["React", "Node.js"],
          image: "http://example.com/image1.png",
          featured: true,
          date: "2023-01-15"
        },
        // ... more projects
      ],
      skills: [
        // Example structure (replace with actual data)
        {
          name: "JavaScript",
          category: "Frontend",
          level: 5,
          icon: "http://example.com/js.png"
        },
        // ... more skills
      ],
      education: [
        // Example structure (replace with actual data)
        {
          degree: "Bachelor of Science",
          institution: "University ABC",
          startDate: "2018-09-01",
          endDate: "2022-05-30",
          description: "Focused on software engineering.",
          location: "City, Country"
        },
        // ... more education entries
      ],
      experience: [
        // Example structure (replace with actual data)
        {
          title: "Software Engineer",
          company: "Tech Company XYZ",
          location: "City, Country",
          startDate: "2022-06-15",
          endDate: "Present",
          description: "Worked on various web applications.",
          technologies: ["React", "TypeScript", "NestJS"]
        },
        // ... more experience entries
      ],
      certifications: [
        // Example structure (replace with actual data)
        {
          title: "Certified Web Developer",
          issuer: "Online Certs Inc.",
          date: "2023-03-10",
          link: "http://example.com/cert1",
          image: "http://example.com/cert1.png"
        },
        // ... more certifications
      ]
    };

    console.log('Starting data migration...');

    // Migrate Projects
    if (mockData.projects && mockData.projects.length > 0) {
      console.log(`Migrating ${mockData.projects.length} projects...`);
      for (const projectData of mockData.projects) {
        const project = new Project(projectData);
        await project.save();
      }
      console.log('Projects migration complete.');
    } else {
      console.log('No projects data to migrate.');
    }


    // Migrate Skills
    if (mockData.skills && mockData.skills.length > 0) {
        console.log(`Migrating ${mockData.skills.length} skills...`);
        for (const skillData of mockData.skills) {
            const skill = new Skill(skillData);
            await skill.save();
        }
        console.log('Skills migration complete.');
    } else {
        console.log('No skills data to migrate.');
    }


    // Migrate Education
    if (mockData.education && mockData.education.length > 0) {
        console.log(`Migrating ${mockData.education.length} education entries...`);
        for (const educationData of mockData.education) {
            const education = new Education(educationData);
            await education.save();
        }
        console.log('Education migration complete.');
    } else {
        console.log('No education data to migrate.');
    }


    // Migrate Experience
    if (mockData.experience && mockData.experience.length > 0) {
        console.log(`Migrating ${mockData.experience.length} experience entries...`);
        for (const experienceData of mockData.experience) {
            const experience = new Experience(experienceData);
            await experience.save();
        }
        console.log('Experience migration complete.');
    } else {
        console.log('No experience data to migrate.');
    }


    // Migrate Certifications
    if (mockData.certifications && mockData.certifications.length > 0) {
        console.log(`Migrating ${mockData.certifications.length} certifications...`);
        for (const certificationData of mockData.certifications) {
            const certification = new Certification(certificationData);
            await certification.save();
        }
        console.log('Certifications migration complete.');
    } else {
        console.log('No certifications data to migrate.');
    }


    console.log('Data migration finished.');

  } catch (err) {
    console.error('Data migration failed:', err);
  } finally {
    mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
};

migrateData();