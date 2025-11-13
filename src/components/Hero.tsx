import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import heroImage from "@/assets/hero-village.jpg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const categories = [
  { name: "Istorija", color: "bg-amber-500 hover:bg-amber-600" },
  { name: "Kultura", color: "bg-purple-500 hover:bg-purple-600" },
  { name: "Ljudi", color: "bg-blue-500 hover:bg-blue-600" },
  { name: "Priroda", color: "bg-green-500 hover:bg-green-600" },
  { name: "Gastronomija", color: "bg-orange-500 hover:bg-orange-600" },
  { name: "Arhitektura", color: "bg-red-500 hover:bg-red-600" },
];

export const Hero = ({ onCategorySelect }: { onCategorySelect?: (category: string) => void }) => {
  const [scrollY, setScrollY] = useState(0);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategoryClick = (category: string) => {
    onCategorySelect?.(category);
    setOpen(false);
    // Scroll to blog section
    document.getElementById("blog")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="relative h-screen overflow-hidden">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${heroImage})`,
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-gradient-primary">
            Selo Šebet
          </h1>
          <p className="text-xl md:text-2xl text-foreground mb-8 max-w-2xl mx-auto">
            Dokumentarni sajt o selu — istorija, kultura, ljudi i priče našeg sela
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button 
                  size="lg" 
                  className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                >
                  Istražite priče
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-64 p-2">
                <div className="grid gap-2">
                  {categories.map((category) => (
                    <Button
                      key={category.name}
                      onClick={() => handleCategoryClick(category.name)}
                      className={`${category.color} text-white w-full justify-start`}
                    >
                      {category.name}
                    </Button>
                  ))}
                </div>
              </PopoverContent>
            </Popover>
            <Button 
              size="lg" 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              onClick={() => document.getElementById("gallery")?.scrollIntoView({ behavior: "smooth" })}
            >
              Pogledajte galeriju
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <a
        href="#blog"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-primary animate-bounce cursor-pointer"
      >
        <ChevronDown className="w-8 h-8" />
      </a>
    </section>
  );
};
