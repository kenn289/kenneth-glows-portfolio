import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";

const experiences = [
  {
    company: "Crestron",
    role: "Associate SDET",
    period: "Jul 2025 — Present",
    current: true,
    responsibilities: [
      "Leading test automation initiatives using Robot Framework and Python",
      "Implementing CI/CD pipelines with Jenkins for continuous testing",
      "Mentoring team members on best practices in test automation",
    ],
  },
  {
    company: "Crestron",
    role: "QA Automation Intern",
    period: "Jan 2025 — Jun 2025",
    current: false,
    responsibilities: [
      "Developed automation scripts using Robot Framework and Python",
      "Automated test cases and integrated with Jenkins",
      "Collaborated with dev team to enhance test coverage and product reliability",
    ],
  },
];

export const Experience = () => {
  return (
    <section id="experience" className="py-20 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Experience
          </h2>
          <p className="text-muted-foreground text-lg">
            My professional journey in test automation
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-border md:transform md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative mb-12 ${
                  index % 2 === 0 ? "md:pr-1/2" : "md:pl-1/2 md:text-right"
                }`}
              >
                <div className={`flex ${index % 2 === 0 ? "" : "md:justify-end"}`}>
                  <div
                    className={`relative pl-12 md:pl-0 ${
                      index % 2 === 0 ? "md:pr-12" : "md:pl-12"
                    } w-full md:w-1/2`}
                  >
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-0 md:left-auto ${
                        index % 2 === 0 ? "md:right-[-25px]" : "md:left-[-25px]"
                      } top-0 w-12 h-12 rounded-full border-4 border-background flex items-center justify-center ${
                        exp.current
                          ? "bg-primary animate-pulse-glow"
                          : "bg-secondary"
                      }`}
                    >
                      <Briefcase className="h-5 w-5" />
                    </div>

                    {/* Content Card */}
                    <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-glow-purple transition-shadow duration-300">
                      <div className="flex items-center justify-between mb-2">
                        <span
                          className={`text-sm font-medium px-3 py-1 rounded-full ${
                            exp.current
                              ? "bg-primary/10 text-primary border border-primary/20"
                              : "bg-secondary text-secondary-foreground"
                          }`}
                        >
                          {exp.period}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                      <p className="text-lg text-primary mb-4">{exp.company}</p>

                      <ul className="space-y-2 text-muted-foreground">
                        {exp.responsibilities.map((resp, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
