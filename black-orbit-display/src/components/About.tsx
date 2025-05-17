
import { useEffect } from "react";

const About = () => {
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

    const hiddenElements = document.querySelectorAll(".about-hidden");
    hiddenElements.forEach((el) => observer.observe(el));

    return () => {
      hiddenElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <section id="about" className="py-20 md:py-28">
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 about-hidden opacity-0">
              About Me
            </h2>
            
            <div className="space-y-4 about-hidden opacity-0" style={{ transitionDelay: "200ms" }}>
              <p className="text-gray-300">
                I'm an Integrated MTech student in Computer Science with Data Science at Vellore Institute of Technology, 
                maintaining a strong CGPA of 8.83. My academic journey is focused on AI and Machine Learning, with a strong interest 
                in developing innovative solutions.
              </p>
              
              <p className="text-gray-300">
                As a passionate developer, I enjoy working with modern technologies to create efficient applications.
                My expertise spans various areas including full-stack development, database management, and data science.
                I pride myself on being a logical thinker with a detail-oriented and innovative approach to problem-solving.
              </p>
              
              <p className="text-gray-300">
                Currently focused on expanding my knowledge in AI and Machine Learning, I'm continuously learning and 
                applying emerging technologies to build cutting-edge solutions. My goal is to leverage technology to 
                make a meaningful impact in the field of data science and artificial intelligence.
              </p>
            </div>
            
            <div className="mt-8 about-hidden opacity-0" style={{ transitionDelay: "400ms" }}>
              <a 
                href="#contact" 
                className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                Let's Connect
              </a>
            </div>
          </div>
          
          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-64 h-64 md:w-80 md:h-80 about-hidden opacity-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent animate-pulse-slow"></div>
              <div className="absolute inset-4 rounded-full border-2 border-white/30 animate-spin" style={{ animationDuration: "15s" }}></div>
              <div className="absolute inset-8 rounded-full border border-white/20 animate-spin" style={{ animationDuration: "10s", animationDirection: "reverse" }}></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-48 h-48 md:w-60 md:h-60 rounded-full bg-black border-2 border-white/20 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-3xl md:text-4xl font-bold">
                    <span className="text-gradient">CK</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
