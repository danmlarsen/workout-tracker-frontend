# NextLift Workout Tracker - Frontend

## About

NextLift is a workout tracking application that helps users log exercises, track personal records, and monitor their progress over time. Built with modern web technologies, it provides an intuitive interface for creating custom workouts, recording sets and reps, and visualizing fitness achievements.

Frontend for the NextLift workout tracking application built with Next.js and TypeScript.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: TailwindCSS v4
- **State Management**: TanStack Query (React Query)
- **UI Components**: Radix UI + shadcn/ui
- **Forms**: React Hook Form + Zod validation
- **Authentication**: JWT with refresh tokens
- **Package Manager**: pnpm

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.local.example .env.local

# Start development server
pnpm dev
```

The app will be available at `http://localhost:3002`.

## Development

```bash
# Development with Turbopack
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Lint code
pnpm lint
```

## Project Structure

- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable UI components
- `src/api/` - API client and data fetching logic
- `src/hooks/` - Custom React hooks
- `src/lib/` - Utility functions and constants

## Authentication

The app uses JWT authentication with automatic token refresh. Routes are protected using the `<AuthGuard>` component.

## API Integration

All API calls use the auth-aware client from `useApiClient()` hook, which handles automatic token refresh and error handling.
