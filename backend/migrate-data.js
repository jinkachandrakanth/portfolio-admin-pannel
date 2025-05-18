import mongoose from 'mongoose';
import dotenv from 'dotenv';

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

// Real mock data with your links
const mockData = {
  projects: [
    {
      title: "Autonomous Drone Navigation System",
      description: "Developed an AI-powered navigation system for drones that can autonomously navigate through complex environments using computer vision.",
      techStack: ["Python", "TensorFlow", "OpenCV", "ROS"],
      imageUrl: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=1000&auto=format&fit=crop",
      githubLink: "https://github.com/chandrakanth-jinka/Facial-Expression-based-Music-Recommendation-",
      liveDemoLink: "https://github.com/chandrakanth-jinka/Facial-Expression-based-Music-Recommendation-", // Using GitHub link for now
      date: "2023-06-15",
      featured: true
    },
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website built with React and TailwindCSS featuring interactive elements and animations.",
      techStack: ["React", "TailwindCSS", "TypeScript", "Vite"],
      imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop",
      githubLink: "https://github.com/chandrakanth-jinka/portfolio-admin-pannel",
      liveDemoLink: "https://github.com/chandrakanth-jinka/portfolio-admin-pannel", // Using GitHub link for now
      date: "2023-04-20",
      featured: false
    },
    {
      title: "AutoML",
      description: "An automated machine learning platform that combines powerful various models. This platform automates the entire machine learning workflow, from data preprocessing to model deployment.",
      techStack: ["Python", "scikit-learn", "XGBoost", "Pandas", "NumPy", "Matplotlib", "Seaborn", "ReportLab"],
      imageUrl: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      githubLink: "https://github.com/chandrakanth-jinka/AutoML",
      liveDemoLink: "https://github.com/chandrakanth-jinka/AutoML", // Using GitHub link for now
      date: "2024-01-10",
      featured: true
    },
    {
      title: "Flight Booking Application",
      description: "A full-stack flight booking application with user authentication and admin panel.",
      techStack: ["React", "Node.js", "Express", "MongoDB", "JWT"],
      imageUrl: "https://images.unsplash.com/photo-1527853787696-f7ba6c280b9f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      githubLink: "https://github.com/chandrakanth-jinka/flight-booking-application",
      liveDemoLink: "https://github.com/chandrakanth-jinka/flight-booking-application", // Using GitHub link for now
      date: "2023-11-20",
      featured: false
    },
    {
      title: "Multi-Link News Articles Analysis",
      description: "Tool to analyze news articles from multiple links, performing sentiment analysis and topic modeling.",
      techStack: ["Python", "NLTK", "spaCy", "scikit-learn"],
      imageUrl: "https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      githubLink: "https://github.com/chandrakanth-jinka/multi-link-news-articles-analysis--tool",
      liveDemoLink: "https://github.com/chandrakanth-jinka/multi-link-news-articles-analysis--tool", // Using GitHub link for now
      date: "2023-09-01",
      featured: true
    },
    {
      title: "Superstore Sales Analysis",
      description: "Interactive dashboard and sales forecast for a superstore dataset using Tableau and Python.",
      techStack: ["Tableau", "Python", "Pandas", "Matplotlib"],
      imageUrl: "https://images.unsplash.com/photo-1563907888057-5303759f3c3c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      githubLink: "https://github.com/chandrakanth-jinka/Super-Store-Dashboard-and-Forecast",
      liveDemoLink: "https://github.com/chandrakanth-jinka/Super-Store-Dashboard-and-Forecast", // Using GitHub link for now
      date: "2023-07-15",
      featured: false
    },
    {
      title: "Personal Finance Tracker",
      description: "Web application to track personal income and expenses.",
      techStack: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "MongoDB"],
      imageUrl: "https://images.unsplash.com/photo-1551288259-cd747c6fd0c5?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      githubLink: "https://github.com/chandrakanth-jinka/Personal-Finance-Tracker",
      liveDemoLink: "https://github.com/chandrakanth-jinka/Personal-Finance-Tracker", // Using GitHub link for now
      date: "2023-05-01",
      featured: false
    }
  ],
  skills: [
    {
      category: "Frontend",
      skills: ["React", "Vue", "Angular", "TailwindCSS", "Sass", "JavaScript", "TypeScript"]
    },
    {
      category: "Backend",
      skills: ["Node.js", "Express", "Django", "Flask", "MongoDB", "PostgreSQL", "Firebase"]
    },
    {
      category: "DevOps",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git", "GitHub Actions"]
    }
  ],
  education: [
    {
      degree: "Master of Computer Science",
      institution: "Stanford University",
      startDate: "2021-09-01",
      endDate: "2023-06-30",
      cgpa: "3.8/4.0",
      description: "Focused on advanced topics in AI and Machine Learning.",
      location: "Stanford, CA"
    },
    {
      degree: "Bachelor of Engineering in Computer Science",
      institution: "MIT",
      startDate: "2017-09-01",
      endDate: "2021-05-30",
      cgpa: "3.9/4.0",
      description: "Specialized in software engineering and data structures.",
      location: "Cambridge, MA"
    }
  ],
  experience: [
    {
      role: "Senior Software Engineer",
      company: "Google",
      duration: "2021 - Present",
      responsibilities: [
        "Developed scalable microservices architecture",
        "Led a team of 5 junior developers",
        "Implemented CI/CD pipeline reducing deployment time by 40%"
      ]
    },
    {
      role: "Software Developer",
      company: "Amazon",
      duration: "2019 - 2021",
      responsibilities: [
        "Built RESTful APIs using Node.js and Express",
        "Optimized database queries reducing response time by 30%",
        "Implemented automated testing with Jest"
      ]
    }
  ],
  certifications: [
    {
      title: "Microsoft AI-900 Certification",
      issuer: "Microsoft",
      issueDate: "2023-08-15",
      certificateLink: "https://drive.google.com/file/d/1pVPBR49nh76XYBzHQGTncpNckU16Mf6m/view"
    },
    {
      title: "MongoDB Beginner Certification",
      issuer: "MongoDB",
      issueDate: "2023-07-01",
      certificateLink: "https://drive.google.com/file/d/1nQSoS2ogso0TlAHiHiP4htskNaiLI00x/view"
    },
    {
      title: "IBM NoSQL Certification",
      issuer: "IBM",
      issueDate: "2022-12-10",
      certificateLink: "https://drive.google.com/file/d/1jHt4Oh_Eb950SBQhaJkKYzUR5yCSPBsd/view"
    },
    {
      title: "Great Learning - Prompt Engineering",
      issuer: "Great Learning",
      issueDate: "2024-04-01",
      certificateLink: "https://drive.google.com/file/d/1YnMLfE2TcoYhL9YXcKnUwun0FlYaGUtM/view"
    },
    {
      title: "Smart Internz Full Stack Developer (MERN Stack)",
      issuer: "Smart Internz",
      issueDate: "2023-10-25",
      certificateLink: "https://skillwallet.smartinternz.com/internships/mongo_db/d91caca74114d81fdfc578fca82f8d72"
    }
  ]
};

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