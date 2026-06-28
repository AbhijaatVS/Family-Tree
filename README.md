# Family Tree Website

A public family tree website where the homepage is the tree itself, and profile pages are the only drill-down view.

## Stack

- Next.js
- TypeScript
- Supabase client helpers prepared for future persistence
- Vercel for hosting

## Current Status

- Public tree view
- Public profile pages
- Responsive tree graph layout

## Run Locally

1. Install dependencies:

   ```bash
   pnpm install
   ```

2. Start the dev server:

   ```bash
   pnpm dev
   ```

3. Open the app in your browser at the local URL shown in the terminal.

## Build

```bash
pnpm build
```

## Environment

If you later connect Supabase persistence, create a `.env.local` file from `.env.example` and fill in:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

## Notes

- The homepage is the tree.
- Profile changes are still UI-only and persistence comes next.
- Family data is currently seeded from `src/lib/family-data.ts`.
