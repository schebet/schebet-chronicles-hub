import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    "Istorija": "bg-category-history/10 text-category-history border-category-history/20",
    "Kultura": "bg-category-culture/10 text-category-culture border-category-culture/20",
    "Ljudi": "bg-category-people/10 text-category-people border-category-people/20",
    "Priroda": "bg-category-nature/10 text-category-nature border-category-nature/20",
    "Gastronomija": "bg-category-gastronomy/10 text-category-gastronomy border-category-gastronomy/20",
    "Arhitektura": "bg-category-architecture/10 text-category-architecture border-category-architecture/20",
  };
  return colors[category] || "bg-primary/10 text-primary border-primary/20";
};

const blogPosts = [
  {
    id: 1,
    title: "Istorija sela kroz vekove",
    excerpt: "Otkrijte bogatu istoriju sela Šebet, od prvih naseljenika do danas. Priče koje oblikuju našu zajednicu...",
    author: "Marko Petrović",
    date: "15. januar 2025",
    category: "Istorija",
    imageUrl: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=800&q=80",
  },
  {
    id: 2,
    title: "Tradicionalne svečanosti",
    excerpt: "Naše selo čuva jedinstvene tradicije i običaje. Saznajte više o godišnjim proslavama i festivalima...",
    author: "Ana Jovanović",
    date: "10. januar 2025",
    category: "Kultura",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80",
  },
  {
    id: 3,
    title: "Ljudi koji grade zajednicu",
    excerpt: "Upoznajte ljude koji čine srce našeg sela. Priče o pojedincima koji doprinose zajednici...",
    author: "Stefan Nikolić",
    date: "5. januar 2025",
    category: "Ljudi",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&q=80",
  },
  {
    id: 4,
    title: "Prirodne lepote okoline",
    excerpt: "Šebet je okružen prelepi prirodom. Istražite šume, reke i planine koje nas okružuju...",
    author: "Jelena Đorđević",
    date: "1. januar 2025",
    category: "Priroda",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  },
  {
    id: 5,
    title: "Gastronomska baština",
    excerpt: "Tradicionalna seoska kuhinja i recepti koji se prenose generacijama. Ukusi detinjstva...",
    author: "Milica Todorović",
    date: "28. decembar 2024",
    category: "Gastronomija",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  },
  {
    id: 6,
    title: "Arhitektonsko nasleđe",
    excerpt: "Stare kuće, crkve i mostovi koji svedoče o prošlosti. Očuvanje arhitektonskog nasleđa...",
    author: "Nikola Stanković",
    date: "20. decembar 2024",
    category: "Arhitektura",
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&q=80",
  },
];

export const BlogGrid = ({ selectedCategory }: { selectedCategory?: string }) => {
  const filteredPosts = selectedCategory && selectedCategory !== "Sve" 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <section id="blog" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
            {selectedCategory && selectedCategory !== "Sve" ? `${selectedCategory} priče` : "Najnovije priče"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Istražite dokumentarne članke o istoriji, kulturi i ljudima našeg sela
          </p>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground">Nema postova u ovoj kategoriji.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
            <Card
              key={post.id}
              className="flex flex-col overflow-hidden card-hover bg-gradient-card border-border/50"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AspectRatio ratio={16 / 9} className="overflow-hidden">
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                />
              </AspectRatio>
              <CardHeader>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                  <Badge variant="outline" className={`ml-auto border ${getCategoryColor(post.category)}`}>
                    {post.category}
                  </Badge>
                </div>
                <CardTitle className="text-2xl hover:text-primary transition-colors">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {post.excerpt}
                </CardDescription>
              </CardContent>
              <CardFooter className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{post.author}</span>
                </div>
                <Link to={`/blog/${post.id}`}>
                  <Button variant="ghost" size="sm" className="bg-muted text-primary hover:bg-muted/80 hover:text-primary transition-all duration-300">
                    Pročitaj više
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            Prikaži sve članke
          </Button>
        </div>
      </div>
    </section>
  );
};
