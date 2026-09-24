# IndieMakerStack (v1)

A clean, unbranded directory of tools and resources for indie makers,
founders, and solopreneurs.

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- Supabase (Postgres database + client library)
- React Router

## Folder structure

```
src/
  components/   Reusable UI pieces (Navbar, Footer, ToolCard, etc.)
  pages/        Route-level views (Home, Categories, ToolDetail, etc.)
  lib/          Supabase client setup
  hooks/        Data-fetching hooks (useTools, useCategories)
  styles/       Global CSS (Tailwind entry point)
  types/        Shared TypeScript types
  utils/        Pure helper functions (search/filter logic)
supabase/
  schema.sql    Table definitions and RLS policies
  seed.sql      Initial categories + 20 sample tools
```

## 1. Set up Supabase

1. Create a free project at https://supabase.com.
2. Open the SQL editor in your project and run `supabase/schema.sql`.
3. Then run `supabase/seed.sql` to load starter categories and tools.
4. In Project Settings → API, copy your Project URL and anon public key.

## 2. Configure environment variables

Copy the example env file and fill in your Supabase values:

```bash
cp .env.example .env
```

```
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
```

## 3. Install and run

```bash
npm install
npm run dev
```

The app runs at http://localhost:5173.

## 4. Build for production

```bash
npm run build
npm run preview
```

## Notes on v1 scope

- No authentication: the Submit and Admin pages are open to anyone with
  the URL. Row Level Security policies in `schema.sql` currently allow
  public insert/delete on the `tools` table to match this. Tighten these
  policies (and add auth) before using this in a real, public deployment.
- Categories are managed directly in the database for v1; there is no
  UI to create or edit them.
- The data model is intentionally small (`Tool` and `Category`) so it's
  easy to extend — for example, adding tags, upvotes, or images later.
