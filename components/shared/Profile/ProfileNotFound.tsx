const ProfileNotFound = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 md:p-8 bg-background">
      <div className="absolute top-0 left-1/2 -z-10 h-100 w-150 -translate-x-1/2 rounded-full bg-destructive/10 blur-[120px]" />
      <div className="relative z-10 flex flex-col items-center text-center space-y-6">
        <div className="text-8xl font-extrabold tracking-tight text-muted-foreground/20">
          404
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Profile couldn&apos;t be found
        </h1>
        <p className="max-w-md text-muted-foreground text-lg">
          This link page doesn&apos;t exist or may have been deleted. Check the
          URL and try again.
        </p>
      </div>
    </div>
  );
};

export { ProfileNotFound };
