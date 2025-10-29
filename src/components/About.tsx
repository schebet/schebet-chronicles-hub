import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Users, Calendar, Heart } from "lucide-react";

const stats = [
  {
    icon: MapPin,
    value: "25 km²",
    label: "Površina",
    color: "text-primary",
  },
  {
    icon: Users,
    value: "1,200",
    label: "Stanovnika",
    color: "text-secondary",
  },
  {
    icon: Calendar,
    value: "1450",
    label: "Godina osnivanja",
    color: "text-accent",
  },
  {
    icon: Heart,
    value: "∞",
    label: "Ljubav prema selu",
    color: "text-primary",
  },
];

export const About = () => {
  return (
    <section id="about" className="py-20 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gradient-primary">
              O selu Šebet
            </h2>
            <p className="text-xl text-muted-foreground">
              Naša priča, naša istorija, naš dom
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card
                  key={index}
                  className="text-center card-hover bg-gradient-card border-border/50"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="pt-6">
                    <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                    <div className={`text-3xl font-bold mb-1 ${stat.color}`}>
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <Card className="bg-gradient-card border-border/50 card-hover">
            <CardContent className="p-8 space-y-6">
              <p className="text-lg leading-relaxed">
                Selo Šebet je jedno od najstarijih naselja u ovom kraju, sa bogatom
                istorijom koja seže u daleku prošlost. Osnovano 1450. godine, naše
                selo je kroz vekove bilo dom mnogim generacijama koje su čuvale
                tradiciju i kulturu ovog kraja.
              </p>
              <p className="text-lg leading-relaxed">
                Smештeno u preleпoj prirodi, okruženo zelenim brdima i čistim
                rekama, Šebet pruža mir i spokojstvo daleko od gradske vreve.
                Naši stanovnici su poznati po gostoprimstvu, vrednoći i ljubavi
                prema svojoj zemlji.
              </p>
              <p className="text-lg leading-relaxed">
                Danas, Šebet je zajednica koja spaja tradiciju i modernost,
                čuvajući svoje korene dok gleda prema budućnosti. Naš cilj je
                dokumentovati i podeliti priče koje čine našu zajednicu posebnom.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
