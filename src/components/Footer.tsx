import { Heart } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-8 px-4 border-t border-border bg-surface">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="text-muted-foreground">
              © {currentYear} Kenneth Oswin. All rights reserved.
            </p>
          </div>

          <div className="flex items-center gap-2 text-muted-foreground">
            <span>Built with</span>
            <Heart className="h-4 w-4 text-primary fill-primary animate-pulse" />
            <span>using React & Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
