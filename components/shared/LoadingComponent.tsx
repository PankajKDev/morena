const LoadingComponent = () => {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden p-4 md:p-8 bg-background">
      <div className="absolute top-1/2 left-1/2 -z-10 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px] animate-pulse" />
      <div className="flex flex-col items-center gap-4">
        <div className="relative size-12">
          <div className="absolute inset-0 rounded-full border-2 border-muted" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary animate-spin" />
        </div>
        <p className="text-sm text-muted-foreground animate-pulse">Loading</p>
      </div>
    </div>
  );
};

export { LoadingComponent };
