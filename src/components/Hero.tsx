import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, BookOpen, Users, Landmark, Mountain, UtensilsCrossed, Building2 } from "lucide-react";
import heroImage from "@/assets/hero-village.jpg";

const categories = [
  { name: "Istorija", icon: BookOpen, color: "from-pink-500 to-rose-500" },
  { name: "Kultura", icon: Landmark, color: "from-purple-500 to-indigo-500" },
  { name: "Ljudi", icon: Users, color: "from-blue-500 to-cyan-500" },
  { name: "Priroda", icon: Mountain, color: "from-green-500 to-emerald-500" },
  { name: "Gastronomija", icon: UtensilsCrossed, color: "from-yellow-500 to-orange-500" },
  { name: "Arhitektura", icon: Building2, color: "from-red-500 to-pink-500" },
];

export const Hero = ({ onCategorySelect }: { onCategorySelect?: (category: string) => void }) => {
  const [scrollY, setScrollY] = useState(0);
  const [showCategories, setShowCategories] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
          <div className="flex flex-col items-center gap-6">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-glow"
                onClick={() => setShowCategories(!showCategories)}
              >
                {showCategories ? "Sakrij kategorije" : "Istražite priče"}
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                onClick={() => window.location.hash = "#gallery"}
              >
                Pogledajte galeriju
              </Button>
            </div>

            {/* Category Buttons */}
            {showCategories && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-2xl animate-fade-in">
                {categories.map((category, index) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.name}
                      size="lg"
                      className={`bg-gradient-to-r ${category.color} text-white hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl animate-scale-in`}
                      style={{ animationDelay: `${index * 0.05}s` }}
                      onClick={() => {
                        onCategorySelect?.(category.name);
                        window.location.hash = "#blog";
                      }}
                    >
                      <Icon className="w-5 h-5 mr-2" />
                      {category.name}
                    </Button>
                  );
                })}
              </div>
            )}
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
