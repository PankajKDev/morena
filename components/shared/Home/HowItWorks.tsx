import { Check, UserCircle, Wand2 } from "lucide-react";

function HowItWorks() {
  const steps = [
    {
      num: 1,
      icon: <UserCircle className="size-5" />,
      title: "Claim your handle",
      text: "Secure your @name and set your aesthetic theme.",
    },
    {
      num: 2,
      icon: <Wand2 className="size-5" />,
      title: "Design your profile",
      text: "Drag blocks, add links, galleries, embeds—make it yours.",
    },
    {
      num: 3,
      icon: <Check className="size-5" />,
      title: "Publish & share",
      text: "Go live with a fast, shareable page that matches your vibe.",
    },
  ];
  return (
    <>
      <h1 className="text-lg text-center tracking-wider text-zinc-500 uppercase">
        How it works?!
      </h1>
      <h2 className="text-4xl  text-center font-extrabold tracking-tight">
        Your profile in three steps
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-6 md:gap-8 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.num}
            className="group relative rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/60 p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-0 ring-black/0 group-hover:ring-2 group-hover:ring-zinc-900/10 dark:group-hover:ring-white/10 transition" />

            <div className="flex items-center gap-3">
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-zinc-900 text-white text-sm font-semibold dark:bg-white dark:text-zinc-900">
                {s.num}
              </span>
              <span className="inline-flex size-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                {s.icon}
              </span>
            </div>

            <h3 className="mt-6 text-xl font-semibold">{s.title}</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">{s.text}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default HowItWorks;
