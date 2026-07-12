const AboutHero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="absolute top-1/2 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <span>💭 Our story</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            We built Morena because <span className="text-primary italic">we</span> were tired of mid.
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl leading-relaxed">
            Link-in-bio tools were giving 2015. We wanted something that actually
            respects your vibe — fast, customizable, and actually fun to use.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
