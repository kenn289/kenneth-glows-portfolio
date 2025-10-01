import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";

const education = [
  {
    institution: "RV Institute Of Technology And Management",
    degree: "B.E. in Information Science",
    period: "Dec. 2021 – 2025",
    location: "Bangalore, Karnataka",
    grade: "CGPA 8.36",
    color: "primary",
  },
  {
    institution: "St. Joseph's Pre-University College",
    degree: "PU State Board",
    period: "2019 – 2021",
    location: "Bangalore, Karnataka",
    grade: "94%",
    color: "accent",
  },
  {
    institution: "Bishop Cotton Boys' School",
    degree: "ICSE",
    period: "2007 – 2019",
    location: "Bangalore, Karnataka",
    grade: "94.6%",
    color: "secondary",
  },
];

export const Education = () => {
  return (
    <section id="education" className="py-20 px-4 bg-surface">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Education
          </h2>
          <p className="text-muted-foreground text-lg">
            Academic background and achievements
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-6">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-card border border-border rounded-2xl p-6 hover:shadow-glow-cyan transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <GraduationCap className="h-6 w-6" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-xl font-bold">{edu.institution}</h3>
                    <span className="text-sm text-muted-foreground mt-1 md:mt-0">
                      {edu.period}
                    </span>
                  </div>

                  <p className="text-lg text-primary mb-1">{edu.degree}</p>
                  <p className="text-muted-foreground mb-2">{edu.location}</p>
                  <p className="text-foreground font-medium">{edu.grade}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Relevant Coursework */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 max-w-4xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Relevant Coursework</h3>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "Data Structures",
              "Machine Learning",
              "Software Testing",
              "DBMS",
              "Data Science",
              "Algorithms Analysis",
              "COA and OS",
              "Computer Networks",
            ].map((course, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -2 }}
                className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium border border-border hover:border-primary transition-colors cursor-default"
              >
                {course}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
