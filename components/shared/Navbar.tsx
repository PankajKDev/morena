import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight"
        >
          <span className="text-primary">Morena</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/about" className="hover:text-primary transition-colors">
            About
          </Link>
          <Link
            href="/features"
            className="hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="hover:text-primary transition-colors"
          >
            Pricing
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              Sign Up
            </Link>
          </Show>
          <Show when="signed-in">
            <Link
              href="/dashboard"
              className="hidden md:inline-flex text-sm font-medium hover:text-primary transition-colors mr-2"
            >
              Dashboard
            </Link>
            <UserButton />
          </Show>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
