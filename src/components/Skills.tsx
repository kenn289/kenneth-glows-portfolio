import { motion } from "framer-motion";
import { Code, Wrench, Rocket } from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code,
    skills: ["Java", "C", "Python"],
    color: "primary",
  },
  {
    title: "Testing & Automation",
    icon: Wrench,
    skills: ["Robot Framework", "Playwright", "Selenium", "Jenkins", "Jira"],
    color: "accent",
  },
  {
    title: "Frameworks & Tools",
    icon: Rocket,
    skills: ["Django", "Flask", "OpenCV", "scikit-learn", "Pandas", "VSCode"],
    color: "secondary",
  },
];

export const Skills = () => {
  return (
    <section id="skills" className="py-20 px-4 bg-surface">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Technical Skills
          </h2>
          <p className="text-muted-foreground text-lg">
            Tools and technologies I work with
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-glow-cyan transition-shadow duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <category.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1.5 bg-secondary text-secondary-foreground rounded-lg text-sm font-medium border border-border hover:border-primary transition-colors cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
