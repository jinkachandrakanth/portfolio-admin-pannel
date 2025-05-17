
import { useEffect } from "react";
import { 
  FileCode2, Database, Code, Code2, ChevronsRight, FlaskConical, BookOpen, FileJson, 
  LayoutGrid, Server, MonitorSmartphone, BarChart2, 
  Cpu, BrainCircuit, Box, Atom
} from "lucide-react";

const getSkillIcon = (icon: string) => {
  switch (icon.toLowerCase()) {
    case "python": return <FileCode2 className="h-8 w-8" />;
    case "java": return <Code className="h-8 w-8" />;
    case "js": case "javascript": return <FileJson className="h-8 w-8" />;
    case "sql": return <Database className="h-8 w-8" />;
    case "c": return <Code2 className="h-8 w-8" />;
    case "react": return <Atom className="h-8 w-8" />;
    case "flask": return <FlaskConical className="h-8 w-8" />;
    case "html": return <BookOpen className="h-8 w-8" />;
    case "api": return <Server className="h-8 w-8" />;
    case "mongodb": return <Database className="h-8 w-8" />;
    case "postgresql": return <Database className="h-8 w-8" />;
    case "mysql": return <Database className="h-8 w-8" />;
    case "powerbi": return <BarChart2 className="h-8 w-8" />;
    case "tableau": return <BarChart2 className="h-8 w-8" />;
    case "ai": return <BrainCircuit className="h-8 w-8" />;
    case "lang": return <ChevronsRight className="h-8 w-8" />;
    case "sklearn": return <Cpu className="h-8 w-8" />;
    case "pytorch": return <Cpu className="h-8 w-8" />;
    case "tensorflow": return <Cpu className="h-8 w-8" />;
    case "streamlit": return <LayoutGrid className="h-8 w-8" />;
    default: return <Box className="h-8 w-8" />;
  }
};

const skillsData = [
  { name: "Python", icon: "python" },
  { name: "Java", icon: "java" },
  { name: "JavaScript", icon: "js" },
  { name: "SQL", icon: "sql" },
  { name: "C", icon: "c" },
  { name: "React", icon: "react" },
  { name: "Flask", icon: "flask" },
  { name: "HTML/CSS", icon: "html" },
  { name: "RESTful APIs", icon: "api" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "MySQL", icon: "mysql" },
  { name: "Power BI", icon: "powerbi" },
  { name: "Tableau", icon: "tableau" },
  { name: "Generative AI", icon: "ai" },
  { name: "Langchain", icon: "lang" },
  { name: "Scikit-Learn", icon: "sklearn" },
  { name: "PyTorch", icon: "pytorch" },
  { name: "TensorFlow", icon: "tensorflow" },
  { name: "Streamlit", icon: "streamlit" },
];

const SkillItem = ({ name, icon, delay }: { name: string; icon: string; delay: number }) => {
  return (
    <div 
      className="glass-card rounded-lg p-4 flex flex-col items-center opacity-0 skill-item"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="h-12 w-12 flex items-center justify-center mb-3 text-white">
        {getSkillIcon(icon)}
      </div>
      <h3 className="text-center font-medium">{name}</h3>
    </div>
  );
};

const Skills = () => {
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

    const hiddenElements = document.querySelectorAll(".skill-item");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="skills" className="py-20 md:py-28 bg-black/30">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Technical Skills
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-12">
          Technologies I've been working with
        </p>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skillsData.map((skill, index) => (
            <SkillItem 
              key={skill.name} 
              name={skill.name} 
              icon={skill.icon}
              delay={index * 100}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
