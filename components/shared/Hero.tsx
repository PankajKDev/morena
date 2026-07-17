import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Background "Aura" - Gen Z style subtle glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-100 w-150 -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Quirky Pill Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary animate-bounce-subtle">
            <span>✨ No more messy bios, fr fr.</span>
          </div>

          {/* Main Headline */}
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            One link to <span className="text-primary italic">rule</span> them
            all. <br className="hidden md:block" />
            <span className="bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Main character energy
            </span>{" "}
            only.
          </h1>

          {/* Subtext */}
          <p className="max-w-175 text-lg text-muted-foreground md:text-xl leading-relaxed">
            Stop sending people to 5 different places. Build a link-in-bio that
            actually hits different. It&apos;s giving... organized. 💅
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/sign-up"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90 active:scale-95"
            >
              Get Started (it&apos;s free)
            </Link>
          </div>

          {/* Demo Preview */}
          <div className="mt-16 w-full max-w-sm mx-auto rounded-3xl overflow-hidden shadow-2xl border border-border">
            <iframe
              src={process.env.DEMO_URL}
              className="w-full aspect-9/16"
              title="Demo preview"
            />
          </div>

          {/* Trust bit */}
          <div className="pt-12 text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Highly customizable not those plain old link in bio pages
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
