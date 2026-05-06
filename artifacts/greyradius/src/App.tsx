import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import { Header } from "@/components/Header";

const queryClient = new QueryClient();

const services = [
  {
    title: "Strategy & Transformation",
    description:
      "We help organizations navigate complex change — from market entry and growth strategy to large-scale operational transformation.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
      </svg>
    ),
  },
  {
    title: "Digital & Technology",
    description:
      "From cloud modernisation to AI adoption, we advise on technology decisions that create durable competitive advantage.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0H3" />
      </svg>
    ),
  },
  {
    title: "Operations Excellence",
    description:
      "We design leaner, faster processes that reduce cost and free your teams to focus on work that matters to customers.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 107.5 7.5h-7.5V6z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0013.5 3v7.5z" />
      </svg>
    ),
  },
  {
    title: "People & Organisation",
    description:
      "Effective change starts with people. We support leadership alignment, capability building, and culture change at every level.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "200+", label: "Engagements delivered" },
  { value: "18", label: "Industries served" },
  { value: "94%", label: "Client satisfaction" },
  { value: "35+", label: "Expert consultants" },
];

function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />

      {/* Hero */}
      <section className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-6 py-28 md:py-36 grid md:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4">
              Management Consulting
            </span>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-foreground mb-6">
              Clarity that drives<br />
              <span className="text-primary">lasting results.</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-lg">
              GreyRadius partners with ambitious organisations to solve their most complex strategic and operational challenges — with rigour, pragmatism, and a relentless focus on impact.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="#contact"
                className="inline-block px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
              >
                Start a conversation
              </a>
              <a
                href="#services"
                className="inline-block px-7 py-3 border border-border text-foreground font-semibold rounded-md hover:bg-muted transition-colors"
              >
                Our services
              </a>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="relative w-full max-w-sm aspect-square rounded-2xl bg-muted flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white via-muted to-border opacity-80" />
              <div className="relative z-10 grid grid-cols-2 gap-6 p-8">
                {stats.map((stat) => (
                  <div key={stat.label} className="bg-white rounded-xl p-5 shadow-sm text-center border border-border">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-muted-foreground mt-1 leading-tight">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-border" />
      </section>

      {/* Stats bar (mobile) */}
      <section className="md:hidden bg-muted border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" className="bg-background py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl mb-14">
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              What we do
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Services built around your agenda
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              We don't offer off-the-shelf solutions. Every engagement is shaped around your unique context, goals, and constraints.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.title}
                className="group p-7 bg-white rounded-xl border border-border hover:shadow-md transition-shadow"
              >
                <div className="mb-5 text-primary">{service.icon}</div>
                <h3 className="font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="bg-white py-24 border-t border-border">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-3">
              About GreyRadius
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Straightforward advice.<br />Measurable impact.
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              Founded by practitioners who spent years inside complex organisations, GreyRadius brings a distinctive blend of strategic thinking and hands-on delivery expertise. We work as true partners — embedded in your teams, accountable for outcomes.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our name reflects our belief that the most valuable insights live in the grey space between obvious answers — and that finding the right radius of action takes experience, nuance, and courage.
            </p>
            <a
              href="#contact"
              className="inline-block px-7 py-3 bg-primary text-primary-foreground font-semibold rounded-md hover:opacity-90 transition-opacity"
            >
              Learn more about us
            </a>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-muted p-7 flex flex-col gap-2 border border-border">
              <div className="text-3xl font-bold text-foreground">10+</div>
              <div className="text-sm text-muted-foreground">Years of combined senior consulting experience</div>
            </div>
            <div className="rounded-xl bg-primary/10 p-7 flex flex-col gap-2 border border-primary/20">
              <div className="text-3xl font-bold text-primary">Global</div>
              <div className="text-sm text-muted-foreground">Reach with clients across Europe, MENA, and Asia-Pacific</div>
            </div>
            <div className="rounded-xl bg-primary/10 p-7 flex flex-col gap-2 border border-primary/20">
              <div className="text-3xl font-bold text-primary">Deep</div>
              <div className="text-sm text-muted-foreground">Sector expertise in financial services, healthcare, and energy</div>
            </div>
            <div className="rounded-xl bg-muted p-7 flex flex-col gap-2 border border-border">
              <div className="text-3xl font-bold text-foreground">Lean</div>
              <div className="text-sm text-muted-foreground">Teams — senior practitioners from day one, no bench-warmer overhead</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="bg-foreground py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-5">
            Ready to move forward?
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto leading-relaxed">
            Tell us about your challenge. We'll respond within one business day to explore how we can help.
          </p>
          <a
            href="mailto:hello@greyradius.com"
            className="inline-block px-9 py-4 bg-primary text-white font-semibold rounded-md hover:opacity-90 transition-opacity text-lg"
          >
            hello@greyradius.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <img
            src={`${import.meta.env.BASE_URL}logo.png`}
            alt="GreyRadius Consulting"
            className="h-7 w-auto brightness-0 invert opacity-70"
          />
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} GreyRadius Consulting. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
