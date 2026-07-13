import Link from "next/link";
import {
  BarChart3,
  MousePointerClick,
  Eye,
  TrendingUp,
  ArrowRight,
} from "lucide-react";

const barHeights = [40, 65, 50, 80, 45, 90, 60];

const skeletonClass =
  "rounded-lg bg-gradient-to-r from-muted/60 via-muted/40 to-muted/60 bg-[length:200%_100%] animate-pulse";

const AnalyticsEmpty = () => {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden">
      {/* Decorative background orbs */}
      <div className="absolute top-1/4 -left-20 size-64 rounded-full bg-primary/5 blur-[100px]" />
      <div className="absolute bottom-1/3 -right-20 size-80 rounded-full bg-accent/5 blur-[120px]" />

      {/* Blurred analytics skeleton background */}
      <div className="absolute inset-0">
        <div className="container mx-auto px-4 md:px-6 py-8 space-y-8 blur-sm pointer-events-none select-none">
          {/* Header skeleton */}
          <div className="flex items-center justify-between">
            <div className={`h-8 w-48 ${skeletonClass}`} />
            <div className={`h-9 w-32 ${skeletonClass}`} />
          </div>

          {/* Stat cards skeleton */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[BarChart3, MousePointerClick, Eye, TrendingUp].map((Icon, i) => (
              <div key={i} className="rounded-xl border bg-card p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <Icon className="size-4 text-muted-foreground/40" />
                  <div className={`h-3 w-16 ${skeletonClass}`} />
                </div>
                <div className={`h-8 w-20 ${skeletonClass}`} />
                <div className={`h-3 w-24 ${skeletonClass}`} />
              </div>
            ))}
          </div>

          {/* Chart skeleton */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className={`h-5 w-32 ${skeletonClass}`} />
            <div className="flex items-end gap-2 h-40">
              {barHeights.map((h, i) => (
                <div
                  key={i}
                  className={`flex-1 rounded-t ${skeletonClass}`}
                  style={{ height: `${h}%`, animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </div>

          {/* Links table skeleton */}
          <div className="rounded-xl border bg-card p-6 space-y-4">
            <div className={`h-5 w-40 ${skeletonClass}`} />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className={`h-4 w-8 ${skeletonClass}`} />
                  <div className={`h-4 w-48 ${skeletonClass}`} />
                  <div className={`h-4 w-16 ${skeletonClass} ml-auto`} />
                  <div className={`h-4 w-12 ${skeletonClass}`} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-linear-to-b from-black/20 via-black/30 to-black/20 backdrop-blur-md p-4">
        <div className="relative w-full max-w-md rounded-2xl border bg-background p-8 shadow-2xl text-center space-y-6 animate-in fade-in zoom-in-95 duration-300">
          {/* Glowing ring behind icon */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 size-28 rounded-full bg-primary/20 blur-2xl" />

          <div className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-linear-to-br from-primary/10 to-primary/5 ring-1 ring-primary/20">
            <BarChart3 className="size-8 text-primary" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">
              No link pages yet
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Start tracking your clicks, views, and engagement. Create your
              first link page and see your analytics come to life.
            </p>
          </div>

          <Link
            href="/create/linkpage"
            className="group inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-linear-to-b from-primary to-primary/90 px-6 text-base font-bold text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-xl hover:shadow-primary/30 active:scale-[0.97]"
          >
            Create your first link page
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AnalyticsEmpty;
