import { useCallback, useEffect, useState } from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import type { Engine } from "tsparticles-engine";

const ParticleBackground = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadFull(engine);
    setIsInitialized(true);
  }, []);

  // Ensure particles are being rendered
  useEffect(() => {
    // Check every 3 seconds if particles need to be reinitialized
    const checkParticlesElement = setInterval(() => {
      const particlesElement = document.getElementById("tsparticles");
      if (particlesElement && particlesElement.children.length === 0) {
        // Force re-render if particles didn't render correctly
        setIsInitialized(false);
        console.log("Attempting to re-initialize particles");
      }
    }, 3000);

    return () => clearInterval(checkParticlesElement);
  }, [isInitialized]);

  return (
    <Particles
      id="tsparticles"
      init={particlesInit}
      className="fixed w-full h-full top-0 left-0 -z-10 pointer-events-none"
      style={{ position: "fixed" }} // Ensure it's fixed positioned
      options={{
        fullScreen: {
          enable: true, // Use fullScreen mode for better coverage
          zIndex: -1, // Place it behind everything
        },
        background: {
          color: {
            value: "#000000",
          },
        },
        fpsLimit: 60,
        particles: {
          color: {
            value: ["#ffffff", "#87ceeb", "#e6e6fa", "#add8e6", "#f0f8ff"],
          },
          links: {
            color: "#ffffff",
            distance: 150,
            enable: false,
            opacity: 0.5,
            width: 1,
          },
          collisions: {
            enable: false,
          },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              // This is the key setting to make particles loop back
              default: "bounce",
              top: "bounce",
              bottom: "bounce",
              left: "bounce",
              right: "bounce",
            },
            random: true,
            speed: { min: 0.1, max: 0.5 },
            straight: false,
            trail: {
              enable: true,
              length: 5,
              fillColor: "#000000",
            },
          },
          number: {
            density: {
              enable: true,
              area: 1500, // Increased area for more consistent density
            },
            value: 400, // More particles for better coverage
            limit: 0, // No limit to ensure particles are always visible
          },
          opacity: {
            value: {
              min: 0.1,
              max: 1,
            },
            animation: {
              enable: true,
              speed: 0.2,
              minimumValue: 0.1,
              sync: false,
            },
          },
          shape: {
            type: "circle",
          },
          size: {
            value: { min: 0.5, max: 4 },
            animation: {
              enable: true,
              speed: 0.5,
              minimumValue: 0.1,
              sync: false,
            },
          },
          twinkle: {
            particles: {
              enable: true,
              frequency: 0.05,
              opacity: 1,
              color: {
                value: ["#ffffff", "#ffff00", "#87ceeb"],
              },
            },
            lines: {
              enable: false,
              frequency: 0.005,
              opacity: 1,
            },
          },
          // Remove life duration to make particles permanent
          rotate: {
            value: 0,
            direction: "clockwise",
            animation: {
              enable: false,
              speed: 5,
              sync: false,
            },
          },
          orbit: {
            enable: true,
            animation: {
              enable: true,
              speed: 0.2,
              count: 1,
              sync: false,
            },
            opacity: 0.3,
            rotation: {
              random: true,
            },
          },
          zIndex: {
            value: -1, // Keep particles behind content
            opacityRate: 0.5,
          },
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "grab",
              parallax: {
                enable: true,
                force: 60,
                smooth: 50,
              },
            },
            onClick: {
              enable: true,
              mode: "push",
            },
            resize: true,
          },
          modes: {
            grab: {
              distance: 100,
              line_linked: {
                opacity: 0.3,
              },
            },
            push: {
              quantity: 4,
            },
          },
        },
        detectRetina: true,
        pauseOnBlur: false, // Don't pause when window loses focus
        pauseOnOutsideViewport: false, // Don't pause when not visible
        smooth: true, // Enable smooth animations
        autoPlay: true, // Always play the animation

        // Adding a refresh interval to ensure particles are continuously updated
        manualParticles: [], // Initial particles
        emitters: [
          {
            // Continuous emitter to ensure particles are always being generated
            direction: "none",
            rate: {
              delay: 5,
              quantity: 5
            },
            position: {
              x: 50,
              y: 50
            },
            size: {
              width: 100,
              height: 100
            },
            particles: {
              // Inherit from main particles configuration
              move: {
                speed: { min: 0.1, max: 0.5 }
              },
              opacity: {
                value: { min: 0.1, max: 1 }
              }
            }
          }
        ]
      }}
    />
  );
};

export default ParticleBackground;
