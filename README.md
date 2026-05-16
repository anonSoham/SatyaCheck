# SatyaCheck

SatyaCheck is a React, TypeScript, and Tailwind CSS frontend for a regional fake news detection platform focused on Indian languages.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- Lucide React

## Project Structure

```text
src/
  components/
    ui/              # Reusable UI primitives
  data/              # Static product content and analysis fixtures
  hooks/             # Reusable React hooks
  types/             # Shared TypeScript types
  App.tsx            # Page composition and feature sections
  index.css          # Global styles and design tokens
  main.tsx           # React entry point
```

## Scripts

```powershell
npm install
npm run dev
npm run build
npm run preview
```

## Notes

- Generated folders such as `node_modules/` and `dist/` are intentionally ignored.
- Keep secrets in local `.env` files only. Do not commit API keys or private credentials.
