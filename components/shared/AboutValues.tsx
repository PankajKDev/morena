const values = [
  {
    emoji: "⚡",
    title: "Speed first",
    desc: "Your page should load before your followers blink. We optimize every byte.",
  },
  {
    emoji: "🎨",
    title: "Aesthetic freedom",
    desc: "No templates that all look the same. You get the keys to the design.",
  },
  {
    emoji: "🔒",
    title: "Privacy gang",
    desc: "We don't sell your data. Period. Your analytics are yours.",
  },
  {
    emoji: "💬",
    title: "Community driven",
    desc: "Every feature starts with a creator asking 'yo can it do this?'",
  },
];

const AboutValues = () => {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center text-center space-y-3 mb-14">
          <span className="text-sm font-medium text-muted-foreground/60 uppercase tracking-[0.2em]">
            What we stand for
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Built different, on purpose
          </h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <div
              key={v.title}
              className="group rounded-2xl border bg-card p-6 transition-all hover:shadow-md hover:border-primary/30"
            >
              <span className="text-3xl">{v.emoji}</span>
              <h3 className="mt-4 font-semibold text-lg">{v.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutValues;
