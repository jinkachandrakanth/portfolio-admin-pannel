
import { useEffect } from "react";

const projectsData = [
  {
    title: "Auto ML",
    description: "End-to-end AutoML pipeline automating ML workflow stages including preprocessing, model selection and hyperparameter tuning.",
    tech: ["Python", "TensorFlow", "Scikit-Learn", "PyTorch"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?q=80&w=800&auto=format&fit=crop",
    link: "#",
    date: "Jan 2025"
  },
  {
    title: "Multi-Link News Articles Analysis",
    description: "Web app that extracts and processes news articles for AI-powered chatbot interactions with comprehensive insights.",
    tech: ["Streamlit", "LangChain", "FAISS", "Hugging Face"],
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=800&auto=format&fit=crop",
    link: "#",
    date: "Dec 2024"
  },
  {
    title: "Superstore Sales Analysis",
    description: "Interactive Power BI dashboard analyzing sales data with time-series forecasting for business planning.",
    tech: ["Power BI", "DAX", "Excel"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
    link: "#",
    date: "Nov 2025"
  },
  {
    title: "Facial Expression Music Recommendation",
    description: "CNN model for facial emotion recognition with web scraping for lyrics-based emotion classification.",
    tech: ["TensorFlow", "OpenCV", "BeautifulSoup", "Hugging Face"],
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=800&auto=format&fit=crop",
    link: "#",
    date: "Jan 2025"
  },
  {
    title: "Personal Finance Tracker",
    description: "Full-stack web application for personal finance management with expense tracking and analytics.",
    tech: ["Python", "Flask", "SQLAlchemy", "Chart.js"],
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=800&auto=format&fit=crop",
    link: "#",
    date: "2024"
  },
  {
    title: "Flight Booking Application",
    description: "Full-stack MERN application with responsive UI and RESTful APIs for flight reservation management.",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js"],
    image: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=800&auto=format&fit=crop",
    link: "#",
    date: "July 2024"
  }
];

const ProjectCard = ({ project, index }: { project: typeof projectsData[0], index: number }) => {
  return (
    <div 
      className="glass-card rounded-lg overflow-hidden project-item opacity-0"
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <div className="h-48 bg-gray-800 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover object-center opacity-70 hover:opacity-100 transition-opacity duration-300"
        />
      </div>
      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold">{project.title}</h3>
          <span className="text-sm text-gray-400">{project.date}</span>
        </div>
        <p className="text-gray-400 mb-4">{project.description}</p>
        <div className="flex flex-wrap gap-2 mb-5">
          {project.tech.map((tech) => (
            <span key={tech} className="text-xs bg-white/10 px-2 py-1 rounded-full text-gray-300">
              {tech}
            </span>
          ))}
        </div>
        <a 
          href={project.link} 
          className="inline-flex items-center text-white font-medium hover:underline"
          target="_blank" 
          rel="noopener noreferrer"
        >
          View Project
          <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

const Projects = () => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-fade-in");
          entry.target.classList.remove("opacity-0");
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1
    });

    const hiddenElements = document.querySelectorAll(".project-item");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="projects" className="py-20 md:py-28">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Featured Projects
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          A selection of my recent work
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
