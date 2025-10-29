import { Navigation } from "@/components/Navigation";
import { Hero } from "@/components/Hero";
import { BlogGrid } from "@/components/BlogGrid";
import { Gallery } from "@/components/Gallery";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main>
        <Hero />
        <BlogGrid />
        <Gallery />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
