import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Calendar, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { blogPosts, getCategoryColor } from "@/data/blogPosts";

export const BlogGrid = ({ selectedCategory }: { selectedCategory?: string }) => {
  const filteredPosts = selectedCategory && selectedCategory !== "Sve" 
    ? blogPosts.filter(post => post.category === selectedCategory)
    : blogPosts;

  return (
    <section id="blog" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12 animate-fade-in-up">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-back-to-top">
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
