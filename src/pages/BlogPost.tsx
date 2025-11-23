import { useParams, Link } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { BackToTop } from "@/components/BackToTop";
import { Comments } from "@/components/Comments";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Calendar, User, ArrowLeft, Tag, ArrowRight, Home } from "lucide-react";
import { blogPosts as blogPostsData, getCategoryColor } from "@/data/blogPosts";

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPostsData.find((p) => p.id === Number(id));

  const getRelatedPosts = () => {
    if (!post) return [];
    return blogPostsData
      .filter((p) => p.category === post.category && p.id !== post.id)
      .slice(0, 3);
  };

  const relatedPosts = getRelatedPosts();

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Članak nije pronađen</h1>
            <Link to="/">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Nazad na početnu
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <article className="container mx-auto px-4 py-12 max-w-4xl">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/" className="flex items-center gap-1">
                    <Home className="w-4 h-4" />
                    Početna
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/#blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/#blog">{post.category}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-8 animate-fade-in-up">
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4" />
                <Badge variant="outline" className={`border ${getCategoryColor(post.category)}`}>
                  {post.category}
                </Badge>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient-primary">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              {post.excerpt}
            </p>

            <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-lg mb-8">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="object-cover w-full h-full"
              />
            </AspectRatio>
          </div>

          <div 
            className="prose prose-lg max-w-none animate-fade-in-up"
            style={{ animationDelay: "0.1s" }}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>

        {/* Comments Section */}
        <Comments postId={id!} />

        <article className="container mx-auto px-4 max-w-4xl">
          {relatedPosts.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border">
              <h2 className="text-3xl font-bold mb-8 text-gradient-primary">Srodni članci</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="flex flex-col overflow-hidden hover-scale">
                    <AspectRatio ratio={16 / 9} className="overflow-hidden">
                      <img
                        src={relatedPost.imageUrl}
                        alt={relatedPost.title}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                      />
                    </AspectRatio>
                    <CardHeader>
                      <Badge variant="outline" className={`w-fit mb-2 border ${getCategoryColor(relatedPost.category)}`}>
                        {relatedPost.category}
                      </Badge>
                      <CardTitle className="text-xl line-clamp-2">{relatedPost.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-sm text-muted-foreground line-clamp-3 mb-4">
                        {relatedPost.excerpt}
                      </p>
                      <Link to={`/blog/${relatedPost.id}`}>
                        <Button variant="ghost" size="sm" className="w-full">
                          Pročitaj više
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          <div className="mt-12 pt-8 border-t border-border">
            <Link to="/#blog">
              <Button size="lg">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Vidi sve članke
              </Button>
            </Link>
          </div>
        </article>
      </main>
      <BackToTop />
      <Footer />
    </div>
  );
};

export default BlogPost;
