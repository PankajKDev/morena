import { Coffee } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background py-6 mt-auto">
      <div className="container mx-auto px-4 md:px-6 flex flex-col items-center gap-3 text-sm text-muted-foreground">
        <p>&copy; {currentYear} Morena</p>
        <a
          href="https://ko-fi.com/morenabio"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-all hover:brightness-110 hover:scale-105 active:scale-95"
        >
          <Coffee size={16} />
          Support on Ko-fi
        </a>
      </div>
    </footer>
  );
};

export default Footer;
