import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BlogGrid } from "@/components/BlogGrid";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Sve");

  return (
    <div className="min-h-screen">
      <Navigation selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
      <main>
        <Hero onCategorySelect={setSelectedCategory} />
        <BlogGrid selectedCategory={selectedCategory} />
        <Gallery />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
