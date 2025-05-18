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
                href="https://www.linkedin.com/in/chandra-kanth-jinka-1a7183351/"
                className="inline-block bg-white text-black px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors"
              >
                Let's Connect
              </a>
            </div>
          </div>

          <div className="order-1 lg:order-2 flex justify-center">
            <div className="relative w-96 h-96 md:w-[32rem] md:h-[32rem] lg:w-[36rem] lg:h-[36rem] about-hidden opacity-0">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-72 h-72 md:w-[24rem] md:h-[24rem] lg:w-[28rem] lg:h-[28rem] rounded-full bg-black border-2 border-white/20 overflow-hidden">
                  <img
                    src="/Naphoto.png"
                    alt="Your Photo"
                    className="w-[110%] h-[110%] object-cover"
                  />
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
