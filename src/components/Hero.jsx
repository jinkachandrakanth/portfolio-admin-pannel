import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Hero = () => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    const variants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    return (
        <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center" ref={ref}>
                <motion.div
                    initial="hidden"
                    animate={inView ? "visible" : "hidden"}
                    variants={variants}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
                        <span className="text-secondary">Hi, I'm Chandra Kanth</span>
                    </h1>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-textSecondary">
                        Full Stack Developer
                    </h2>
                    <p className="text-lg sm:text-xl text-textSecondary mb-12 max-w-2xl mx-auto">
                        I build exceptional digital experiences that make an impact.
                        Specializing in creating beautiful, functional, and user-centered websites.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a href="#projects" className="btn-primary">
                            View My Work
                        </a>
                        <a href="#contact" className="btn-primary">
                            Get In Touch
                        </a>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero; 