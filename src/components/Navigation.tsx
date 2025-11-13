import { useState } from "react";
import { Menu, X, Moon, Sun, Facebook, Instagram, Mail, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const categories = ["Sve", "Istorija", "Kultura", "Ljudi", "Priroda", "Gastronomija", "Arhitektura"];

export const Navigation = ({ selectedCategory, onCategoryChange }: { 
  selectedCategory?: string; 
  onCategoryChange?: (category: string) => void 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <nav className="fixed top-0 w-full bg-card/80 backdrop-blur-lg border-b border-border z-50 shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <a href="#home" className="text-2xl font-bold text-gradient-primary">
            Šebet
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-foreground hover:text-primary transition-colors">
              Početna
            </a>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-foreground hover:text-primary">
                  {selectedCategory || "Blog"}
                  <ChevronDown className="ml-2 w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card z-50">
                {categories.map((category) => (
                  <DropdownMenuItem
                    key={category}
                    onClick={() => {
                      onCategoryChange?.(category);
                      window.location.hash = "#blog";
                    }}
                    className={`cursor-pointer ${
                      selectedCategory === category ? "bg-primary/10 text-primary font-medium" : ""
                    }`}
                  >
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <a href="#gallery" className="text-foreground hover:text-primary transition-colors">
              Galerija
            </a>
            <a href="#about" className="text-foreground hover:text-primary transition-colors">
              O selu
            </a>
            
            <div className="flex items-center gap-4 ml-4 border-l border-border pl-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:info@seloSebet.com"
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="hover:bg-muted"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-4 animate-fade-in-up">
            <a href="#home" className="block text-foreground hover:text-primary transition-colors">
              Početna
            </a>
            <div className="space-y-2">
              <div className="text-foreground font-medium px-2">Blog kategorije:</div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => {
                    onCategoryChange?.(category);
                    window.location.hash = "#blog";
                    setIsOpen(false);
                  }}
                  className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                    selectedCategory === category 
                      ? "bg-primary/10 text-primary font-medium" 
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            <a href="#gallery" className="block text-foreground hover:text-primary transition-colors">
              Galerija
            </a>
            <a href="#about" className="block text-foreground hover:text-primary transition-colors">
              O selu
            </a>
            <div className="flex items-center gap-4 pt-4 border-t border-border">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="mailto:info@seloSebet.com"
                 className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
