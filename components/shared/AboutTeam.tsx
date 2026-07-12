const AboutTeam = () => {
  return (
    <section className="border-t bg-muted/30 py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center space-y-6">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
            <span>🛠️ Solo dev energy</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Made by one person who actually cares
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            No VC bloat, no corporate roadmap. Just me, some coffee, and a vision
            to build the link-in-bio tool I always wanted. Every feature ships
            because I believe it matters — not because a board said so.
          </p>
          <div className="flex justify-center gap-2 text-sm text-muted-foreground pt-4">
            <span className="rounded-full border px-3 py-1">🧑‍💻 Solo founder</span>
            <span className="rounded-full border px-3 py-1">❤️ Community first</span>
            <span className="rounded-full border px-3 py-1">🚀 Ship fast</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutTeam;
