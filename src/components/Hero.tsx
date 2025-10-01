import { motion } from "framer-motion";
import { Download, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import profileImage from "@/assets/kenneth-profile.jpg";

export const Hero = () => {
  const scrollToProjects = () => {
    const element = document.getElementById("projects");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center pt-20 px-4">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-sm font-medium px-4 py-2 rounded-full bg-primary/10 text-primary border border-primary/20">
                Associate SDET
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold leading-tight"
            >
              Hey — I'm{" "}
              <span className="text-gradient-purple">Kenneth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-muted-foreground"
            >
              Associate SDET → automation + testing nerd.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-muted-foreground max-w-xl"
            >
              Building robust test automation with Playwright, Robot Framework, and Python. 
              Passionate about quality, efficiency, and breaking things before users do.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                size="lg"
                className="group"
                asChild
              >
                <a href="/KENNETH_OSWIN.pdf" download="Kenneth_Oswin_Resume.pdf" target="_blank" rel="noopener noreferrer">
                  <Download className="mr-2 h-4 w-4 group-hover:animate-bounce" />
                  View Resume
                </a>
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={scrollToProjects}
                className="group"
              >
                See Projects
                <ArrowDown className="ml-2 h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative group">
              <motion.div
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(var(--neon-purple) / 0.3)",
                    "0 0 40px hsl(var(--neon-cyan) / 0.4)",
                    "0 0 20px hsl(var(--neon-purple) / 0.3)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative w-72 h-72 md:w-96 md:h-96 rounded-full overflow-hidden border-4 border-primary/20"
              >
                <img
                  src={profileImage}
                  alt="Kenneth Oswin"
                  className="w-full h-full object-cover"
                />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
