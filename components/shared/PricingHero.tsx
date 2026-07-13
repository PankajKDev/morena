const PricingHero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-28">
      <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center space-y-6">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <span>🧪 Open beta — it&apos;s free rn</span>
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl">
            No price traps. <br />
            <span className="text-primary italic">Just vibes.</span>
          </h1>
          <p className="text-lg text-muted-foreground md:text-xl leading-relaxed max-w-2xl mx-auto">
            We&apos;re in open beta, which means everything is free while we cook.
            Grab a plan — or don&apos;t. No card needed. No FOMO.
          </p>
          <div className="text-sm text-muted-foreground/60">
            ⏳ Pro features are locked for now, but you can still peek at what&apos;s coming.
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingHero;
