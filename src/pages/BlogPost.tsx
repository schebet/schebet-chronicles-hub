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

const blogPostsData = [
  {
    id: 1,
    title: "Istorija sela kroz vekove",
    excerpt: "Otkrijte bogatu istoriju sela Šebet, od prvih naseljenika do danas. Priče koje oblikuju našu zajednicu...",
    author: "Marko Petrović",
    date: "15. januar 2025",
    category: "Istorija",
    imageUrl: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b7?w=1200&q=80",
    content: `
      <h2>Početak naselja</h2>
      <p>Selo Šebet ima bogatu istoriju koja seže nekoliko vekova unazad. Prvi pisani tragovi o selu datiraju iz 15. veka, kada je ovo područje bilo deo većeg feudalnog poseda.</p>
      
      <h2>Razvoj kroz vekove</h2>
      <p>Tokom 18. i 19. veka, selo je doživelo značajan razvoj. Građene su prve škole, crkve i javne zgrade koje su postale centar društvenog života zajednice.</p>
      
      <p>Stanovništvo se bavilo uglavnom poljoprivredom, stočarstvom i tradicionalnim zanatima. Mnoge od ovih tradicija su očuvane i dan danas.</p>
      
      <h2>Moderne prilike</h2>
      <p>U 20. veku, selo je prošlo kroz modernizaciju infrastrukture. Elektrifikacija, putevi i vodosnabdevanje su značajno poboljšali kvalitet života stanovnika.</p>
      
      <p>Danas, Šebet predstavlja spoj tradicionalnog seoskog života i modernih pogodnosti, čuvajući svoje nasleđe dok gleda ka budućnosti.</p>
    `,
  },
  {
    id: 2,
    title: "Tradicionalne svečanosti",
    excerpt: "Naše selo čuva jedinstvene tradicije i običaje. Saznajte više o godišnjim proslavama i festivalima...",
    author: "Ana Jovanović",
    date: "10. januar 2025",
    category: "Kultura",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=1200&q=80",
    content: `
      <h2>Godišnji običaji</h2>
      <p>Selo Šebet neguje bogatu tradiciju kulturnih i verskih praznika koji se slave tokom cele godine. Ove svečanosti okupljaju zajednicu i prenose tradiciju sa kolena na koleno.</p>
      
      <h2>Slava sela</h2>
      <p>Svake godine u julu, selo proslavlja svoju krsnu slavu, koja okuplja sva domaćinstva i goste iz okolnih mesta. Ovo je najvažniji događaj u seoskom kalendaru.</p>
      
      <h2>Tradicionalni festivali</h2>
      <p>Pored verskih praznika, održavaju se i tradicionalni festivali: berba grožđa u jesen, žetveni praznik u leto, i zimski sajam u decembru.</p>
      
      <p>Ovi događaji uključuju folklorne igre, tradicionalnu muziku, izložbe domaćih proizvoda i takmičenja u pripremi autentičnih jela.</p>
    `,
  },
  {
    id: 3,
    title: "Ljudi koji grade zajednicu",
    excerpt: "Upoznajte ljude koji čine srce našeg sela. Priče o pojedincima koji doprinose zajednici...",
    author: "Stefan Nikolić",
    date: "5. januar 2025",
    category: "Ljudi",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=1200&q=80",
    content: `
      <h2>Seoska zajednica</h2>
      <p>Srce svakog sela su njegovi ljudi. U Šebetu živi zajednica koja čuva tradiciju, ali i gradi budućnost kroz svoje svakodnevne aktivnosti i doprinos.</p>
      
      <h2>Lokalni proizvođači</h2>
      <p>Mnoge porodice se bave organskom proizvodnjom hrane, pčelarstvom i tradiconalnim zanatima. Njihovi proizvodi su poznati širom regiona po kvalitetu i autentičnosti.</p>
      
      <h2>Aktivisti i volonteri</h2>
      <p>Mlađe generacije su pokrenule brojne inicijative za očuvanje životne sredine, obnovu starih kuća, i digitalizaciju seoskog arhiva.</p>
      
      <p>Kroz volonterski rad u udruženjima i lokalnim akcijama, građani Šebeta pokazuju da zajedništvo i solidarnost nisu izgubljene vrednosti.</p>
    `,
  },
  {
    id: 4,
    title: "Prirodne lepote okoline",
    excerpt: "Šebet je okružen prelepi prirodom. Istražite šume, reke i planine koje nas okružuju...",
    author: "Jelena Đorđević",
    date: "1. januar 2025",
    category: "Priroda",
    imageUrl: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&q=80",
    content: `
      <h2>Geografski položaj</h2>
      <p>Selo Šebet se nalazi u podnožju planinskog masiva, okruženo šumama i livadama. Ovaj prirodni ambijent pruža neverovatne mogućnosti za aktivnosti na otvorenom.</p>
      
      <h2>Planinske staze</h2>
      <p>Brojne planinarske staze vode kroz okolne šume do vidikovaca sa kojih se pruža spektakularan pogled na dolinu. Najpoznatija staza vodi do vrha Veliki kamen.</p>
      
      <h2>Reke i izvori</h2>
      <p>Kroz selo protiče kristalno čista planinska reka, koja je dom brojnih riba i divljih životinja. Prirodni izvori vode su poznati po svom kvalitetu.</p>
      
      <h2>Flora i fauna</h2>
      <p>Područje je dom raznovrsnog biljnog i životinjskog sveta. U šumama žive srne, divlje svinje, lisice, a mogu se uočiti i retke vrste ptica.</p>
    `,
  },
  {
    id: 5,
    title: "Gastronomska baština",
    excerpt: "Tradicionalna seoska kuhinja i recepti koji se prenose generacijama. Ukusi detinjstva...",
    author: "Milica Todorović",
    date: "28. decembar 2024",
    category: "Gastronomija",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200&q=80",
    content: `
      <h2>Tradicionalna kuhinja</h2>
      <p>Gastronomija Šebeta je rezultat vekova kulinarskog nasleđa. Recepti se prenose sa kolena na koleno, čuvajući autentične ukuse i tehnike pripreme.</p>
      
      <h2>Karakteristična jela</h2>
      <p>Posebno su poznati domaći sir, pršuta sušena na planinski način, ajvar, kiseli kupus i zimnica. Svaka domaćica ima svoje tajne sastojke koji čine jelo jedinstvenim.</p>
      
      <h2>Slavska gozba</h2>
      <p>Za velike proslave priprema se tradicionalna gozba: pečenje na ražnju, sarma, gibanica, različiti kolaći i domaće rakije. Ova jela su neodvojivi deo svakog slavlja.</p>
      
      <h2>Domaći proizvodi</h2>
      <p>Većina namirnica potiče iz sopstvenih bašta i ekonomija. Organski uzgajano voće i povrće, domaće životinje i pčelinji proizvodi čine osnovu svake trpeze.</p>
    `,
  },
  {
    id: 6,
    title: "Arhitektonsko nasleđe",
    excerpt: "Stare kuće, crkve i mostovi koji svedoče o prošlosti. Očuvanje arhitektonskog nasleđa...",
    author: "Nikola Stanković",
    date: "20. decembar 2024",
    category: "Arhitektura",
    imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=1200&q=80",
    content: `
      <h2>Tradicionalna gradnja</h2>
      <p>Arhitektura Šebeta odražava tradicionalni stil gradnje karakterističan za ovaj region. Stare kuće su građene od prirodnih materijala - kamena, drveta i ćerpiča.</p>
      
      <h2>Seoska crkva</h2>
      <p>Crkva Svetog Nikole, građena u 18. veku, predstavlja najznačajniji spomenik u selu. Freske i ikonostas su delo poznatih umetnika tog doba.</p>
      
      <h2>Kameni mostovi</h2>
      <p>Nekoliko starih kamenih mostova preko potoka i reke svedoče o majstorstvu graditelja prošlosti. Ovi mostovi su još uvek u funkciji i predstavljaju vredne arhitektonske spomenike.</p>
      
      <h2>Projekti očuvanja</h2>
      <p>Pokrenute su inicijative za restauraciju najstarijih zgrada i njihovo pretvaranje u muzejski prostor i kulturne centre, kako bi se očuvalo nasleđe za buduće generacije.</p>
    `,
  },
];

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
