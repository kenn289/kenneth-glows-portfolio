import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const projects = [
  {
    title: "E-commerce Testing with Playwright",
    description:
      "Comprehensive test suite for e-commerce workflows including login, cart operations, and checkout using Playwright with JavaScript and Page Object Model.",
    date: "July 2024",
    tech: ["Playwright", "JavaScript", "POM", "CI/CD"],
    links: {
      demo: "https://github.com/kenn289",
    },
  },
  {
    title: "Weather Pilot",
    description:
      "Flight management system with real-time weather integration using OpenWeatherMap API. Features secure registration, role-based dashboards, and flight status tools.",
    date: "June 2024",
    tech: ["Django", "Python", "OpenWeatherMap API", "HTML", "CSS"],
    links: {
      github: "https://github.com/kenn289",
    },
  },
  {
    title: "InfoRover: Library Management System",
    description:
      "Full-featured library management system handling book transactions, inventory, user authentication, and community engagement.",
    date: "Jan. 2024",
    tech: ["Flask", "MySQL", "JavaScript", "HTML", "CSS"],
    links: {
      github: "https://github.com/kenn289",
    },
  },
];

export const Projects = () => {
  return (
    <section id="projects" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Projects
          </h2>
          <p className="text-muted-foreground text-lg">
            Building things that matter
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-card border border-border rounded-2xl p-6 hover:shadow-glow-purple transition-all duration-300"
            >
              <div className="mb-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                    {project.date}
                  </span>
                </div>
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-2">
                {project.links.github && (
                  <Button variant="outline" size="sm" asChild>
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-2" />
                      Code
                    </a>
                  </Button>
                )}
                {project.links.demo && (
                  <Button size="sm" asChild>
                    <a
                      href={project.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Demo
                    </a>
                  </Button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
