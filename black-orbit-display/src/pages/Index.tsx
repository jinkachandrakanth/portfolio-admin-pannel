import { useEffect } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Experience from "../components/Experience";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import AdminButton from "../components/AdminButton";

const Index = () => {
  useEffect(() => {
    document.title = "Chandra Kanth Jinka - Portfolio";

    // Force particles to be visible by checking the DOM
    const checkParticles = setInterval(() => {
      const particles = document.getElementById("tsparticles");
      if (particles && particles.children.length === 0) {
        // If particles container exists but has no children, try to force a refresh
        window.dispatchEvent(new Event('resize'));
      }
    }, 5000);

    return () => clearInterval(checkParticles);
  }, []);

  return (
    <div className="space-container">
      <div className="min-h-screen text-white relative overflow-x-hidden z-10">
        <Navbar />
        <main className="content">
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Contact />
        </main>
        <Footer />
        <AdminButton />
      </div>
    </div>
  );
};

export default Index;
