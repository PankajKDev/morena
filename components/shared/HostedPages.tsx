interface HostedPage {
  pageUrl: string;
  linkPagename: string;
  ownerUsername: string;
}

const HostedPages = ({ pages }: { pages: HostedPage[] }) => {
  return (
    <section className="container mx-auto px-4 md:px-6 py-16 md:py-24 space-y-8">
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center">
        All your hosted pages
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pages.map((page) => (
          <div key={page.pageUrl} className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground truncate">
              {page.linkPagename}
            </p>
            <a
              href={`${process.env.NEXT_BASE_URL}/profile/${page.ownerUsername}/${page.pageUrl}`}
              className="group relative block rounded-2xl overflow-hidden border border-border shadow-lg"
            >
              <iframe
                src={`${process.env.NEXT_BASE_URL}/profile/${page.ownerUsername}/${page.pageUrl}`}
                className="w-full aspect-video pointer-events-none"
                title={page.linkPagename}
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 group-hover:bg-black/40 backdrop-blur-none group-hover:backdrop-blur-sm transition-all duration-300">
                <span className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-lg">
                  View profile
                </span>
              </div>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export { HostedPages };
