
import { useEffect, useRef } from 'react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const { clientX, clientY } = e;
      const rect = containerRef.current.getBoundingClientRect();
      
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const moveX = (x - centerX) / 25;
      const moveY = (y - centerY) / 25;
      
      containerRef.current.style.transform = `translate(${moveX}px, ${moveY}px)`;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden py-20">
      <div className="absolute inset-0 z-0">
        {/* Additional particle effects will be handled by ParticleBackground component */}
      </div>
      
      <div 
        ref={containerRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10 transition-transform duration-300"
      >
        <p className="text-gray-400 mb-3 text-lg animate-fade-in opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
          Hello, I'm
        </p>
        
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 opacity-0 animate-fade-in leading-tight" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
          <span className="text-gradient">Chandra Kanth Jinka</span>
        </h1>
        
        <h2 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-300 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
          Data Science & Full Stack Developer
        </h2>
        
        <p className="text-gray-400 max-w-xl mx-auto mb-12 opacity-0 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'forwards' }}>
          Enthusiastic about AI, Machine Learning, and developing innovative solutions.
          A detail-oriented and logical thinker with a passion for emerging technologies.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4 opacity-0 animate-fade-in" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
          <a 
            href="#projects" 
            className="bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
          >
            View My Work
          </a>
          
          <a 
            href="#contact" 
            className="border border-white text-white px-6 py-3 rounded-md font-medium hover:bg-white/10 transition-colors"
          >
            Contact Me
          </a>
        </div>

        <div className="mt-16 animate-bounce">
          <a href="#about" className="text-gray-400 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mx-auto">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
