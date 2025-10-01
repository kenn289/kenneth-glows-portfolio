import { motion } from "framer-motion";
import { Camera, Instagram } from "lucide-react";
import { Button } from "./ui/button";

export const Photography = () => {
  const instagramHandle = "kenn._.ethh";

  return (
    <section id="photography" className="py-20 px-4 bg-surface">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-8 w-8 text-primary" />
            <h2 className="text-3xl md:text-5xl font-bold">
              Photography
            </h2>
          </div>
          <p className="text-muted-foreground text-lg mb-6">
            Capturing moments through my lens
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-glow-cyan transition-all duration-300">
            <div className="mb-6">
              <div className="inline-block p-4 rounded-full bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 mb-4">
                <Instagram className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2">Check Out My Work</h3>
              <p className="text-muted-foreground mb-1">
                I share my photography journey on Instagram
              </p>
              <p className="text-primary font-mono text-lg">
                @{instagramHandle}
              </p>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-primary to-accent-secondary hover:opacity-90 transition-opacity"
            >
              <a
                href={`https://instagram.com/${instagramHandle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="gap-2"
              >
                <Instagram className="h-5 w-5" />
                View on Instagram
              </a>
            </Button>
          </div>

          {/* Optional: Add a grid placeholder for featured photos */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4"
          >
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-primary/20 to-accent-secondary/20 border border-border hover:border-primary transition-colors cursor-pointer group overflow-hidden"
              >
                <div className="w-full h-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Camera className="h-8 w-8 text-muted-foreground/50" />
                </div>
              </div>
            ))}
          </motion.div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            Featured shots coming soon — follow me for updates!
          </p>
        </motion.div>
      </div>
    </section>
  );
};
