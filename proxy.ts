import { clerkMiddleware } from "@clerk/nextjs/server";

const publicRoutes = ["/sign-in", "/sign-up", "/about", "/", "/api/webhooks","/profile"];

export default clerkMiddleware(
  async (auth, req) => {
    const pathname = req.nextUrl.pathname;

    const isPublic = publicRoutes.some(
      (route) => pathname === route || pathname.startsWith(route + "/"),
    );
    if (!isPublic) {
      await auth.protect();
    }
  },

  {
    debug: false,
  },
);

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
