import { motion } from "framer-motion";
import { Github, Star, GitFork } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

interface GitHubRepo {
  id: number;
  name: string;
  description: string;
  html_url: string;
  homepage?: string;
  language?: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
}

export const Projects = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStarredRepos = async () => {
      try {
        const response = await fetch("https://api.github.com/users/kenn289/starred");
        const data = await response.json();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching starred repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStarredRepos();
  }, []);

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
            Starred repositories from GitHub
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        ) : (
          <div className="max-w-5xl mx-auto px-12">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {repos.map((repo) => (
                  <CarouselItem key={repo.id} className="md:basis-1/2 lg:basis-1/3">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -8 }}
                      className="group bg-card border border-border rounded-2xl p-6 hover:shadow-glow-purple transition-all duration-300 h-full"
                    >
                      <div className="mb-4">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold group-hover:text-primary transition-colors line-clamp-1">
                            {repo.name}
                          </h3>
                        </div>
                        <p className="text-muted-foreground line-clamp-3 min-h-[4.5rem]">
                          {repo.description || "No description available"}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4 min-h-[2rem]">
                        {repo.language && (
                          <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full font-medium">
                            {repo.language}
                          </span>
                        )}
                        {repo.topics.slice(0, 2).map((topic, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          <span>{repo.stargazers_count}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <GitFork className="h-4 w-4" />
                          <span>{repo.forks_count}</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild className="flex-1">
                          <a
                            href={repo.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="h-4 w-4 mr-2" />
                            View
                          </a>
                        </Button>
                      </div>
                    </motion.div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        )}
      </div>
    </section>
  );
};
