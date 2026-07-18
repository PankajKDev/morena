# Morena

Create highly customizable link-in-bio pages. One link to rule them all — main character energy only.

## Tech Stack

- **Framework:** Next.js 16 (App Router) + React 19
- **Styling:** Tailwind CSS v4 + tw-animate-css + shadcn/ui
- **Auth:** Clerk
- **Database:** PostgreSQL + Prisma 7
- **Media:** Cloudinary (images + audio)
- **State:** Zustand
- **Charts:** Recharts
- **UI:** lucide-react, sonner, @base-ui/react
- **Deployment:** Vercel

## Features

- **Live CSS Editor** — customize every visual property: colors, fonts, backgrounds, blur, opacity, gradients
- **Image Cropping** — built-in crop modal before upload
- **Music Support** — upload MP3, play/pause button on profile, volume control
- **Analytics Dashboard** — click tracking, daily chart, top links, stats cards
- **Social Link Detection** — auto-detects 13+ platforms and shows branded icons
- **Dark Mode** — system-aware with toggle
- **Responsive** — mobile-first, iframe previews, hosted pages grid

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL database
- Clerk account
- Cloudinary account

### Environment Variables

Create a `.env` file:

```env
# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=


# Database
DATABASE_URL=

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_API_KEY=
NEXT_PUBLIC_CLOUDINARY_API_SECRET=

# App
NEXT_BASE_URL=http://localhost:3000
DEMO_URL=https://your-demo-url
```

### Install & Run

```bash
npm install
npx prisma generate
npx prisma db push
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  (root)/          — landing page, links list,  user pages
  create/          — page editor (dynamic route by pageId)
  edit/            — edit existing page (dynamic route by pageId)
  profile/         — your public profile pages
  api/             — API routes (create-link, click, links,webhooks)

components/
  shared/          — Profile, ProfileCard, Sidebar, Analytics, Modals, etc.
  ui/              — shadcn primitives (card, chart)

stores/            — profileDataStore, cssDataStore (Zustand)

lib/               — utilities, style helpers, Cloudinary, analytics, theme

constants/         — CSS defaults, platform mappings
types/             — TypeScript interfaces
```

## Scripts

| Script          | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Start dev server        |
| `npm run build` | Production build        |
| `npm run start` | Start production server |
| `npm run lint`  | Run ESLint              |

## Deployment

Deploy to Vercel:

```bash
vercel --prod
```

Set all environment variables in Vercel project settings. No special build configuration needed — Next.js defaults work out of the box.

## License

MIT
