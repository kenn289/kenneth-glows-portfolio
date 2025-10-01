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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const riotName = "Chicken Tikka";
  const riotTag = "Kboy";

  useEffect(() => {
    const controller = new AbortController();

    async function fetchValorantMMR() {
      try {
        setLoading(true);

        const url = `/api/valorant-tracker?name=${encodeURIComponent(
          riotName
        )}&tag=${encodeURIComponent(riotTag)}`;

        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Proxy request failed: ${res.status}`);

        const json = await res.json();

        // Tracker.gg stores rank in segments[0].stats
        const segments = json.data?.segments || [];
        const competitiveSegment = segments.find((s: any) => s.type === "competitive");

        const currentRank =
          competitiveSegment?.stats?.rank?.metadata?.name || "Unknown";
        const rrPoints =
          competitiveSegment?.stats?.rankedRating?.value
            ? `${competitiveSegment.stats.rankedRating.value} RR`
            : undefined;
        const peak =
          competitiveSegment?.stats?.peakRank?.metadata?.name || currentRank;

        // Override display as requested
        setValorantStats({ rank: "Gold 2", rr: rrPoints, peakRank: "Platinum 1" });
        setLastUpdated(new Date());
        setLoading(false);
      } catch (error) {
        console.error("Valorant fetch error:", error);
        // Fallback to requested display values
        setValorantStats({ rank: "Gold 2", peakRank: "Platinum 1" });
        setLoading(false);
      }
    }

    fetchValorantMMR();
    const interval = setInterval(fetchValorantMMR, 1000 * 60 * 2);
    window.addEventListener("valorant-refresh", fetchValorantMMR);

    return () => {
      controller.abort();
      clearInterval(interval);
      window.removeEventListener("valorant-refresh", fetchValorantMMR);
    };
  }, []);

  const hobbies = [
    {
      title: "Valorant Competitive",
      description: "Grinding ranks and perfecting aim",
      icon: Award,
      details: `Tracker: ${riotName}#${riotTag}`,
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
    <section
      id="hobbies"
      className="py-20 px-4 bg-gradient-to-br from-purple-500/15 via-purple-500/5 to-purple-500/15"
    >
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
                    <p className="text-muted-foreground mb-3">{hobby.description}</p>
                    {hobby.details && (
                      <p className="text-sm text-primary font-mono">{hobby.details}</p>
                    )}

                    {hobby.stats && !loading && (
                      <div className="mt-4 flex gap-4 flex-wrap">
                        <div className="bg-surface/50 px-3 py-2 rounded-lg">
                          <p className="text-xs text-muted-foreground">Current</p>
                          <p
                            className={`font-bold ${
                              (hobby.stats.rank || "").toLowerCase().includes("gold")
                                ? "text-yellow-400"
                                : "text-accent"
                            }`}
                          >
                            {hobby.stats.rank} {hobby.stats.rr}
                          </p>
                        </div>
                        <div className="bg-surface/50 px-3 py-2 rounded-lg">
                          <p className="text-xs text-muted-foreground">Peak</p>
                          <p
                            className={`font-bold ${
                              (hobby.stats.peakRank || "").toLowerCase().includes("platinum")
                                ? "text-slate-300"
                                : "text-accent-secondary"
                            }`}
                          >
                            {hobby.stats.peakRank}
                          </p>
                        </div>
                        {lastUpdated && (
                          <div className="px-3 py-2 rounded-lg text-xs text-muted-foreground">
                            Updated {lastUpdated.toLocaleTimeString()}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                {index === 0 && (
                  <div className="mt-4 flex justify-end">
                    <button
                      onClick={() => {
                        setLoading(true);
                        window.dispatchEvent(new Event("valorant-refresh"));
                      }}
                      className="text-xs px-3 py-1 rounded-md border border-border hover:bg-purple-100 dark:hover:bg-purple-900/30"
                    >
                      Refresh
                    </button>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
