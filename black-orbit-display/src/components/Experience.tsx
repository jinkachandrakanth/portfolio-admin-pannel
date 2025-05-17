
import { useEffect } from "react";

const experienceData = [
  {
    company: "SMARTINTERNZ",
    position: "Project Intern",
    period: "June 2024 - July 2024",
    description: "Developed a highly responsive flight booking application using MERN stack. Gained hands-on expertise in building full-stack applications with MongoDB, Express.js, React, and Node.js. Acquired practical experience in authentication, database management, API integration, and deployment, completing 52 hours of intensive development work."
  }
];

const educationData = [
  {
    institution: "Vellore Institute of Technology",
    degree: "Integrated MTech - CSE with Data Science",
    period: "Sept 2021 - ongoing",
    details: "CGPA: 8.83. Relevant Coursework: Machine Learning, Database Systems, Data Science, Web Development, Artificial Intelligence"
  },
  {
    institution: "Sri Chaitanya Junior College",
    degree: "Board of Intermediate Education",
    period: "June 2019 - May 2021",
    details: "Marks: 951/1000"
  },
  {
    institution: "Sri Chaitanya School",
    degree: "Board of Secondary Education",
    period: "Completed April 2019",
    details: "CGPA: 9.8"
  }
];

const certificationData = [
  "IBM NoSQL Certification",
  "Microsoft AI-900 Certification",
  "Great Learning Prompt Engineering Certificate",
  "MongoDB Certification",
  "Smart Internz MERN Full Stack Certification"
];

const ExperienceItem = ({ 
  experience,
  index 
}: { 
  experience: typeof experienceData[0],
  index: number
}) => {
  return (
    <div 
      className="experience-item opacity-0 mb-12 relative"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {index < experienceData.length - 1 && (
        <div className="absolute left-3 top-10 bottom-0 w-px bg-gray-700"></div>
      )}
      
      <div className="flex gap-6">
        <div className="flex-shrink-0 relative z-10">
          <div className="h-6 w-6 rounded-full bg-white"></div>
        </div>
        
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <h3 className="text-xl font-semibold">{experience.position}</h3>
            <span className="text-gray-400 text-sm sm:text-base">@ {experience.company}</span>
          </div>
          
          <p className="text-gray-500 mb-3">{experience.period}</p>
          <p className="text-gray-300">{experience.description}</p>
        </div>
      </div>
    </div>
  );
};

const EducationItem = ({ 
  education,
  index 
}: { 
  education: typeof educationData[0],
  index: number
}) => {
  return (
    <div 
      className="education-item opacity-0 mb-12 relative"
      style={{ animationDelay: `${index * 200}ms` }}
    >
      {index < educationData.length - 1 && (
        <div className="absolute left-3 top-10 bottom-0 w-px bg-gray-700"></div>
      )}
      
      <div className="flex gap-6">
        <div className="flex-shrink-0 relative z-10">
          <div className="h-6 w-6 rounded-full bg-white"></div>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold mb-1">{education.institution}</h3>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
            <span className="font-medium">{education.degree}</span>
            <span className="text-gray-400 text-sm sm:text-base">{education.period}</span>
          </div>
          <p className="text-gray-300">{education.details}</p>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
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

    const hiddenElements = document.querySelectorAll(".experience-item, .education-item, .certification-item");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="experience" className="py-20 md:py-28 bg-black/30">
      <div className="section-container">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          Experience & Education
        </h2>
        <p className="text-gray-400 text-center max-w-2xl mx-auto mb-16">
          My professional journey and academic background
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-2xl font-bold mb-8 border-b border-gray-700 pb-2">Work Experience</h3>
            <div className="max-w-2xl mx-auto">
              {experienceData.map((experience, index) => (
                <ExperienceItem key={experience.company} experience={experience} index={index} />
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="text-2xl font-bold mb-8 border-b border-gray-700 pb-2">Education</h3>
            <div className="max-w-2xl mx-auto">
              {educationData.map((education, index) => (
                <EducationItem key={education.institution} education={education} index={index} />
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-16">
          <h3 className="text-2xl font-bold mb-8 border-b border-gray-700 pb-2 text-center">Certifications</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {certificationData.map((cert, index) => (
              <div 
                key={cert} 
                className="certification-item opacity-0 glass-card p-4 rounded-lg text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="font-medium">{cert}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
