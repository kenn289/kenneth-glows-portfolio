import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Star, ExternalLink, Search, ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Navigation } from "@/components/Navigation";
import { useNavigate } from "react-router-dom";

interface Repo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  owner: {
    login: string;
    avatar_url: string;
  };
  homepage: string | null;
  updated_at: string;
}

const GITHUB_USERNAME = "kenn289";

export default function GitHubStars() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLanguage, setSelectedLanguage] = useState("All");
  const [sortBy, setSortBy] = useState<"stars" | "updated" | "name">("stars");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStarredRepos();
  }, []);

  useEffect(() => {
    filterAndSortRepos();
  }, [repos, searchQuery, selectedLanguage, sortBy]);

  const fetchStarredRepos = async () => {
    try {
      const response = await fetch(
        `https://api.github.com/users/${GITHUB_USERNAME}/starred?per_page=100`
      );
      
      if (!response.ok) {
        throw new Error("Failed to fetch starred repos");
      }

      const data = await response.json();
      setRepos(data);
    } catch (error) {
      console.error("Error fetching starred repos:", error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortRepos = () => {
    let filtered = [...repos];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          repo.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Language filter
    if (selectedLanguage !== "All") {
      filtered = filtered.filter((repo) => repo.language === selectedLanguage);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "stars":
          return b.stargazers_count - a.stargazers_count;
        case "updated":
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

    setFilteredRepos(filtered);
  };

  const languages = Array.from(
    new Set(repos.map((repo) => repo.language).filter(Boolean))
  );

  const copyCloneUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Navigation />
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading starred repos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navigation />
      
      <div className="container mx-auto px-4 pt-24 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Portfolio
          </Button>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              GitHub Stars
            </h1>
            <p className="text-muted-foreground text-lg">
              Repositories I find interesting and worth checking out
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 space-y-4">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search repositories..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 rounded-lg bg-background border border-border text-foreground"
              >
                <option value="stars">Most Stars</option>
                <option value="updated">Recently Updated</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>

            {/* Language Filters */}
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedLanguage === "All" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedLanguage("All")}
              >
                All
              </Button>
              {languages.map((lang) => (
                <Button
                  key={lang}
                  variant={selectedLanguage === lang ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedLanguage(lang as string)}
                >
                  {lang}
                </Button>
              ))}
            </div>
          </div>

          {/* Results Count */}
          <p className="text-muted-foreground mb-6">
            Showing {filteredRepos.length} of {repos.length} repositories
          </p>

          {/* Repos Grid */}
          {filteredRepos.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                No repositories found matching your filters.
              </p>
              <Button onClick={() => { setSearchQuery(""); setSelectedLanguage("All"); }}>
                Clear Filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRepos.map((repo, index) => (
                <motion.div
                  key={repo.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-card border border-border rounded-2xl p-6 hover:shadow-glow-purple transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-bold flex-1 line-clamp-1">
                      {repo.name}
                    </h3>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Star className="h-4 w-4 fill-primary text-primary" />
                      <span className="text-sm">{repo.stargazers_count}</span>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {repo.description || "No description available"}
                  </p>

                  {repo.language && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-3 h-3 rounded-full bg-primary" />
                      <span className="text-sm text-muted-foreground">
                        {repo.language}
                      </span>
                    </div>
                  )}

                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-4">
                      {repo.topics.slice(0, 3).map((topic) => (
                        <span
                          key={topic}
                          className="text-xs px-2 py-1 bg-secondary text-secondary-foreground rounded-full"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="flex-1"
                    >
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="h-3 w-3 mr-2" />
                        View
                      </a>
                    </Button>
                    {repo.homepage && (
                      <Button size="sm" asChild className="flex-1">
                        <a
                          href={repo.homepage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
