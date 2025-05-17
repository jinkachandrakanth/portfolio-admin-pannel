import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

// Utility function to merge class names with Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Schema definitions for different portfolio sections
export const sectionSchemas = {
  projects: {
    title: { type: "string", required: true, label: "Project Title" },
    description: { type: "text", required: true, label: "Description" },
    tech: { type: "array", required: true, label: "Tech Stack" },
    image: { type: "string", required: true, label: "Project Image URL" },
    link: { type: "string", required: false, label: "Project Link" },
    date: { type: "string", required: true, label: "Date" },
    featured: { type: "boolean", required: false, label: "Featured Project" }
  },
  skills: {
    category: { type: "string", required: true, label: "Category" },
    skills: { type: "array", required: true, label: "Skills" }
  },
  education: {
    degree: { type: "string", required: true, label: "Degree" },
    institution: { type: "string", required: true, label: "Institution" },
    startDate: { type: "string", required: true, label: "Start Date" },
    endDate: { type: "string", required: false, label: "End Date" },
    cgpa: { type: "string", required: false, label: "CGPA" }
  },
  experience: {
    role: { type: "string", required: true, label: "Role" },
    company: { type: "string", required: true, label: "Company" },
    duration: { type: "string", required: true, label: "Duration" },
    responsibilities: { type: "array", required: true, label: "Responsibilities" }
  },
  certifications: {
    title: { type: "string", required: true, label: "Certification Title" },
    issuer: { type: "string", required: true, label: "Issuer" },
    issueDate: { type: "string", required: true, label: "Issue Date" },
    certificateLink: { type: "string", required: false, label: "Certificate Link" }
  }
};

// Generate dynamic form fields based on schema
export function generateFormFields(schema: any, data: any = {}) {
  return Object.entries(schema).map(([key, config]: [string, any]) => {
    return {
      name: key,
      ...config,
      value: data[key] || (config.type === 'array' ? [] : config.type === 'boolean' ? false : '')
    };
  });
}

// Format dates for display
export function formatDate(dateString: string): string {
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
  } catch (e) {
    return dateString;
  }
}

// Generate a unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Check if user is authenticated
export function isAuthenticated(): boolean {
  return localStorage.getItem("adminAuthenticated") === "true";
}

// Get JWT token
export function getToken(): string | null {
  return localStorage.getItem("adminToken");
}

// Mock data for development purposes
export const mockData = {
  projects: [
    {
      id: "1",
      title: "Autonomous Drone Navigation System",
      description: "Developed an AI-powered navigation system for drones that can autonomously navigate through complex environments using computer vision.",
      techStack: ["Python", "TensorFlow", "OpenCV", "ROS"],
      imageUrl: "https://images.unsplash.com/photo-1506947411487-a56738267384?q=80&w=1000&auto=format&fit=crop",
      githubLink: "https://github.com/username/drone-nav",
      liveDemoLink: "https://demo.example.com/drone-nav",
      date: "2023-06-15",
      featured: true
    },
    {
      id: "2",
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website built with React and TailwindCSS featuring interactive elements and animations.",
      techStack: ["React", "TailwindCSS", "TypeScript", "Vite"],
      imageUrl: "https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1000&auto=format&fit=crop",
      githubLink: "https://github.com/username/portfolio",
      liveDemoLink: "https://portfolio.example.com",
      date: "2023-04-20",
      featured: false
    }
  ],
  skills: [
    {
      id: "1",
      category: "Frontend",
      skills: ["React", "Vue", "Angular", "TailwindCSS", "Sass", "JavaScript", "TypeScript"]
    },
    {
      id: "2",
      category: "Backend",
      skills: ["Node.js", "Express", "Django", "Flask", "MongoDB", "PostgreSQL", "Firebase"]
    },
    {
      id: "3",
      category: "DevOps",
      skills: ["Docker", "Kubernetes", "AWS", "CI/CD", "Git", "GitHub Actions"]
    }
  ],
  education: [
    {
      id: "1",
      degree: "Master of Computer Science",
      institution: "Stanford University",
      startDate: "2021-09-01",
      endDate: "2023-06-30",
      cgpa: "3.8/4.0"
    },
    {
      id: "2",
      degree: "Bachelor of Engineering in Computer Science",
      institution: "MIT",
      startDate: "2017-09-01",
      endDate: "2021-05-30",
      cgpa: "3.9/4.0"
    }
  ],
  experience: [
    {
      id: "1",
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
      id: "2",
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
      id: "1",
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      issueDate: "2022-05-10",
      certificateLink: "https://example.com/cert/aws123"
    },
    {
      id: "2",
      title: "Google Cloud Professional Data Engineer",
      issuer: "Google Cloud",
      issueDate: "2021-11-15",
      certificateLink: "https://example.com/cert/gcp456"
    }
  ]
};
