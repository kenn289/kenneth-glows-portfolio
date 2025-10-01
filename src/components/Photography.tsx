import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useMemo } from "react";
// Dynamically import all images except the profile
const allImages = import.meta.glob("@/assets/*.{png,jpg,jpeg,webp}", { eager: true, import: "default" }) as Record<string, string>;

export const Photography = () => {
  const photos = useMemo(() => {
    return Object.entries(allImages)
      .filter(([path]) => !/kenneth-profile\.jpg$/i.test(path))
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([, src]) => src);
  }, []);

  return (
    <section id="photography" className="py-20 px-4">
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
          <div className="bg-card border border-border rounded-2xl p-8 text-center hover:shadow-glow-purple transition-all duration-300">
            <h3 className="text-2xl font-bold mb-6">Photography Slideshow</h3>
            <div className="relative max-w-4xl mx-auto">
              <Carousel className="w-full">
                <CarouselContent>
                  {photos.map((src, idx) => (
                    <CarouselItem key={idx} className="flex items-center justify-center p-2">
                      <div className="w-full flex items-center justify-center">
                        <img
                          src={src}
                          alt={`photo-${idx + 1}`}
                          className="max-h-[70vh] md:max-h-[75vh] w-auto object-contain rounded-xl border border-border"
                          loading="lazy"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:-left-4 hover:bg-purple-100 dark:hover:bg-purple-900/30" />
                <CarouselNext className="right-2 md:-right-4 hover:bg-purple-100 dark:hover:bg-purple-900/30" />
              </Carousel>
            </div>
            <p className="text-muted-foreground text-sm mt-4">More photos coming soon.</p>
          </div>

          
        </motion.div>
      </div>
    </section>
  );
};
