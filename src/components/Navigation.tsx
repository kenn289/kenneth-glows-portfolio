import { Github, Linkedin, Youtube, Instagram, Code2, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const socialLinks = [
  { icon: Github, href: "/github-stars", label: "GitHub", internal: true },
  { icon: Linkedin, href: "https://linkedin.com/in/kenneth-oswin-206100236/", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@kennethoswin", label: "YouTube" },
  { icon: Instagram, href: "https://instagram.com/kennethoswin", label: "Instagram" },
  { icon: Code2, href: "https://leetcode.com/u/kenn289/", label: "LeetCode" },
];

export const Navigation = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-border backdrop-blur-md bg-background/80"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-xl font-bold text-gradient-purple cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            Kenneth Oswin
          </motion.div>

          {/* Desktop Social Links */}
          <div className="hidden md:flex items-center gap-2">
            {socialLinks.map((link) => {
              if (link.internal) {
                return (
                  <motion.button
                    key={link.label}
                    onClick={() => navigate(link.href)}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </motion.button>
                );
              }
              return (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </motion.a>
              );
            })}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden pt-4 pb-2 flex flex-wrap gap-3 justify-center"
          >
            {socialLinks.map((link) => {
              if (link.internal) {
                return (
                  <button
                    key={link.label}
                    onClick={() => {
                      navigate(link.href);
                      setMobileMenuOpen(false);
                    }}
                    className="p-2 rounded-lg hover:bg-secondary transition-colors"
                    aria-label={link.label}
                  >
                    <link.icon className="h-5 w-5" />
                  </button>
                );
              }
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg hover:bg-secondary transition-colors"
                  aria-label={link.label}
                >
                  <link.icon className="h-5 w-5" />
                </a>
              );
            })}
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
};
