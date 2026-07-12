import Link from "next/link";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-32">
      {/* Background "Aura" - Gen Z style subtle glow */}
      <div className="absolute top-0 left-1/2 -z-10 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />
      
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-8">
          
          {/* Quirky Pill Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary animate-bounce-subtle">
            <span>✨ No more messy bios, fr fr.</span>
          </div>

          {/* Main Headline */}
          <h1 className="max-w-4xl text-5xl font-extrabold tracking-tight sm:text-6xl md:text-7xl lg:text-8xl">
            One link to <span className="text-primary italic">rule</span> them all. <br className="hidden md:block" /> 
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Main character energy</span> only.
          </h1>

          {/* Subtext */}
          <p className="max-w-[700px] text-lg text-muted-foreground md:text-xl leading-relaxed">
            Stop sending people to 5 different places. Build a link-in-bio that actually hits different. It&apos;s giving... organized. 💅
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/sign-up"
              className="inline-flex h-12 items-center justify-center rounded-xl bg-primary px-8 text-base font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:bg-primary/90 active:scale-95"
            >
              Get Started (it&apos;s free)
            </Link>
            <Link
              href="/pricing"
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-primary/20 bg-transparent px-8 text-base font-bold transition-all hover:bg-primary/5 active:scale-95"
            >
              See Pricing
            </Link>
          </div>

          {/* Visual Hook / Placeholder for Phone Mockup */}
          <div className="relative mt-16 w-full max-w-2xl aspect-[16/9] rounded-3xl border-2 border-dashed border-muted-foreground/20 bg-muted/30 flex items-center justify-center group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-50" />
            <p className="text-muted-foreground font-medium group-hover:text-primary transition-colors">
              [ Insanely aesthetic dashboard preview goes here ]
            </p>
            
            {/* Quirky floating elements */}
            <div className="absolute -top-4 -right-4 h-12 w-12 rounded-full bg-primary/20 animate-pulse" />
            <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-accent/20 animate-bounce-slow" />
          </div>

          {/* Trust bit */}
          <div className="pt-12 text-sm font-medium text-muted-foreground uppercase tracking-widest">
            Used by 10k+ creators who understand the assignment
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
