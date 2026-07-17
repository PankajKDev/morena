"use client";

import { useState } from "react";
import Link from "next/link";
import { Show, UserButton } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-xl tracking-tight"
        >
          <span className="text-primary">Morena</span>
        </Link>

        <Show when="signed-in">
          <div className="hidden md:flex items-center gap-1 rounded-xl bg-muted/60 p-1">
            <Link
              href="/"
              className="rounded-lg px-4 py-1.5 text-sm font-medium transition-colors hover:bg-background hover:text-foreground text-muted-foreground"
            >
              Dashboard
            </Link>
            <Link
              href="/links"
              className="rounded-lg px-4 py-1.5 text-sm font-medium transition-colors hover:bg-background hover:text-foreground text-muted-foreground"
            >
              Links
            </Link>

            <Link
              href="/userpages"
              className="rounded-lg px-4 py-1.5 text-sm font-medium transition-colors hover:bg-background hover:text-foreground text-muted-foreground"
            >
              Profiles
            </Link>
          </div>
        </Show>

        <div className="flex items-center gap-4">
          <Show when="signed-out">
            <Link
              href="/sign-in"
              className="text-sm font-medium hover:text-primary transition-colors hidden sm:inline"
            >
              Sign In
            </Link>
            <Link
              href="/sign-up"
              className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
            >
              Sign Up
            </Link>
          </Show>
          <Show when="signed-in">
            <UserButton />
          </Show>

          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            <div className="relative size-5">
              <span
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileOpen
                    ? "rotate-90 opacity-0 scale-75"
                    : "rotate-0 opacity-100 scale-100"
                }`}
              >
                <Menu className="size-5" />
              </span>
              <span
                className={`absolute inset-0 transition-all duration-300 ${
                  mobileOpen
                    ? "rotate-0 opacity-100 scale-100"
                    : "-rotate-90 opacity-0 scale-75"
                }`}
              >
                <X className="size-5" />
              </span>
            </div>
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden absolute left-0 right-0 top-full border-t bg-background/95 backdrop-blur shadow-2xl transition-all duration-300 ease-out overflow-hidden ${
          mobileOpen
            ? "max-h-96 opacity-100 translate-y-0"
            : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <div className="px-4 py-5 space-y-2">
          <Show when="signed-out">
            <div
              className="h-px bg-border my-3"
              style={{ animationDelay: "200ms" }}
            />
            <MobileLink
              href="/sign-in"
              index={1}
              visible={mobileOpen}
              onClick={() => setMobileOpen(false)}
            >
              Sign In
            </MobileLink>
            <MobileLink
              href="/sign-up"
              index={2}
              visible={mobileOpen}
              onClick={() => setMobileOpen(false)}
              primary
            >
              Sign Up
            </MobileLink>
          </Show>
          <Show when="signed-in">
            <MobileLink
              href="/"
              index={0}
              visible={mobileOpen}
              onClick={() => setMobileOpen(false)}
            >
              Dashboard
            </MobileLink>

            <MobileLink
              href="/links"
              index={2}
              visible={mobileOpen}
              onClick={() => setMobileOpen(false)}
            >
              Links
            </MobileLink>

            <MobileLink
              href="/userpages"
              index={3}
              visible={mobileOpen}
              onClick={() => setMobileOpen(false)}
            >
              Profiles
            </MobileLink>
          </Show>
        </div>
      </div>
    </nav>
  );
};

interface MobileLinkProps {
  href: string;
  children: React.ReactNode;
  index: number;
  visible: boolean;
  onClick: () => void;
  primary?: boolean;
}

const MobileLink = ({
  href,
  children,
  index,
  visible,
  onClick,
  primary,
}: MobileLinkProps) => {
  const base =
    "block w-full rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200";
  const delay = `${index * 60}ms`;

  if (primary) {
    return (
      <Link
        href={href}
        onClick={onClick}
        style={{ animationDelay: delay }}
        className={`${base} bg-primary text-primary-foreground text-center hover:bg-primary/90 active:scale-[0.98] ${
          visible ? "animate-in fade-in slide-in-from-bottom-2" : ""
        }`}
      >
        {children}
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      style={{ animationDelay: delay }}
      className={`${base} text-foreground hover:bg-muted active:scale-[0.98] ${
        visible ? "animate-in fade-in slide-in-from-bottom-2" : ""
      }`}
    >
      {children}
    </Link>
  );
};

export default Navbar;
