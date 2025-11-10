import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Faq() {
  return (
    <>
      <h1 className="mt-10 md:mt-20 font-bold text-2xl md:text-4xl text-center">
        Frequently Asked Questions
      </h1>
      <Accordion
        type="single"
        collapsible
        className="w-full mt-6 md:mt-10"
        defaultValue="item-1"
      >
        <AccordionItem value="item-1">
          <AccordionTrigger>What is Morena?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Morena is your personal page that represents you — your vibe, your
              answers, your music. You can customize colors, banner, and
              background music, get anonymous questions, and showcase your
              favorite things.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Is it really anonymous?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Yes. When someone asks you a question, their identity isn’t stored
              or shown. We only keep a hashed IP internally to prevent spam or
              abuse — not to identify anyone.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Can I change my handle later?</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-4 text-balance">
            <p>
              Yes, you can edit your handle anytime — as long as the new one
              isn’t taken.
            </p>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </>
  );
}
