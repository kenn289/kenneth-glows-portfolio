import { motion } from "framer-motion";
import { Gamepad2, Award } from "lucide-react";
import { useEffect, useState } from "react";

interface ValorantStats {
  rank?: string;
  rr?: string;
  peakRank?: string;
}

export const Hobbies = () => {
  const [valorantStats, setValorantStats] = useState<ValorantStats>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating Valorant stats - in production you'd fetch from Valorant API
    // Note: Valorant doesn't have a public API, so these would need to be manually updated
    // or scraped from tracker.gg
    setTimeout(() => {
      setValorantStats({
        rank: "Your Rank",
        rr: "RR Points",
        peakRank: "Peak Rank"
      });
      setLoading(false);
    }, 1000);
  }, []);

  const hobbies = [
    {
      title: "Valorant Competitive",
      description: "Grinding ranks and perfecting aim",
      icon: Award,
      details: "Tracker: Chicken Tikka #Kboy",
      color: "from-red-500 to-pink-500",
      stats: valorantStats,
    },
    {
      title: "GTA Gaming",
      description: "Exploring Los Santos and beyond",
      icon: Gamepad2,
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section id="hobbies" className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            When I'm Not Coding
          </h2>
          <p className="text-muted-foreground text-lg">
            Gaming, competing, and having fun
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6">
          {hobbies.map((hobby, index) => {
            const Icon = hobby.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="bg-card border border-border rounded-2xl p-6 hover:shadow-glow-purple transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${hobby.color} text-white`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-2">{hobby.title}</h3>
                    <p className="text-muted-foreground mb-3">
                      {hobby.description}
                    </p>
                    {hobby.details && (
                      <p className="text-sm text-primary font-mono">
                        {hobby.details}
                      </p>
                    )}
                    
                    {hobby.stats && !loading && (
                      <div className="mt-4 flex gap-4 flex-wrap">
                        <div className="bg-surface/50 px-3 py-2 rounded-lg">
                          <p className="text-xs text-muted-foreground">Current</p>
                          <p className="font-bold text-accent">{hobby.stats.rank}</p>
                        </div>
                        <div className="bg-surface/50 px-3 py-2 rounded-lg">
                          <p className="text-xs text-muted-foreground">Peak</p>
                          <p className="font-bold text-accent-secondary">{hobby.stats.peakRank}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
