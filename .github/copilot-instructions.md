# Copilot Instructions - Workout Tracker Frontend

## Project Architecture

This is a **Next.js 15 App Router** project bootstrapped with `create-next-app`, serving as the frontend for a workout tracking application. The project uses the latest React 19.1.0 and leverages Turbopack for enhanced performance.

### Key Technologies & Setup

- **Framework**: Next.js 15.5.3 with App Router (`src/app/` directory)
- **Styling**: Tailwind CSS v4 with custom theme configuration in `globals.css`
- **TypeScript**: Strict mode enabled with path mapping (`@/*` → `./src/*`)
- **Fonts**: Geist Sans and Geist Mono from Google Fonts, configured as CSS variables
- **Build Tool**: Turbopack (enabled for both dev and build commands)

## Development Workflow

### Essential Commands

```bash
npm run dev         # Start dev server with Turbopack
npm run build       # Production build with Turbopack
npm run lint        # Run ESLint with Next.js config
```

### File Organization Patterns

- **App Router Structure**: All routes in `src/app/` following Next.js 13+ conventions
- **Layout**: Root layout in `src/app/layout.tsx` handles fonts and metadata
- **Styling**: Global styles in `src/app/globals.css` with Tailwind v4 inline theme syntax

## Project-Specific Conventions

### Styling Approach

- Uses **Tailwind CSS v4** with `@theme inline` syntax in `globals.css`
- Custom CSS variables for theming: `--background`, `--foreground`, `--font-*`
- Dark mode via `prefers-color-scheme` media query
- Font variables: `var(--font-geist-sans)` and `var(--font-geist-mono)`

### TypeScript Configuration

- Absolute imports via `@/*` path mapping to `src/*`
- Strict TypeScript with `target: "ES2017"`
- Next.js plugin enabled for enhanced type checking

### ESLint Setup

- Uses new **ESLint flat config** format (`.mjs` file)
- Extends `next/core-web-vitals` and `next/typescript`
- Custom ignore patterns for build artifacts

## Key Files to Reference

- `src/app/layout.tsx` - Root layout with font configuration and metadata
- `src/app/globals.css` - Tailwind v4 theme configuration and CSS variables
- `package.json` - Turbopack-enabled scripts and latest React/Next.js versions
- `tsconfig.json` - Path mapping and strict TypeScript settings
- `eslint.config.mjs` - Modern flat config ESLint setup

## Integration Notes

The project appears to be the frontend component of a larger workout tracking system (note the `workout-tracker-frontend` naming). When implementing features:

- Expect backend API integration (no API routes currently defined)
- Follow App Router patterns for data fetching and routing
- Use the established font and color variable system for consistency
- Leverage Turbopack's fast refresh capabilities during development
