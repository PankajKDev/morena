import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 md:p-8 bg-background">
      <div className="absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-destructive/10 blur-[120px]" />
      <div className="flex flex-col items-center text-center space-y-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          No link page found
        </h1>
        <p className="max-w-md text-muted-foreground">
          The link page you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/links"
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-lg transition-all hover:brightness-110 active:scale-95"
        >
          Go to my pages
        </Link>
      </div>
    </div>
  );
}
