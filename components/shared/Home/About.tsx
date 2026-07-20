const About = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
            Hey, I&apos;m a solo dev
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mx-auto">
            I built Morena because I wanted a link-in-bio tool that was
            actually free, fully customizable, and not packed with upsells.
            No team, no investors — just me building things I care about.
          </p>
        </div>
      </div>
    </section>
  );
};

export { About };
