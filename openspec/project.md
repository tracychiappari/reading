# Project Context

## Purpose
A Laravel-based reading tracker and scheduler application that helps users track their reading progress and plan ahead. The app enables users to manage multiple books, track reading sessions (perusals), estimate completion times based on chosen pace, and stay on track with personalized reading goals.

## Tech Stack

### Backend
- **PHP 8.2+** - Server-side language
- **Laravel 12** - PHP framework
- **Inertia.js 2.0** - Server-driven SPA framework
- **Ziggy** - Laravel route helper for JavaScript

### Frontend
- **TypeScript 5.7** - Type-safe JavaScript
- **React 19** - UI library with JSX runtime
- **Vite 6** - Build tool and dev server
- **TailwindCSS 4** - Utility-first CSS framework
- **Radix UI** - Headless UI components (@radix-ui/react-*)
- **Headless UI** - Additional UI primitives
- **Lucide React** - Icon library
- **Framer Motion** - Animation library

### Development Tools
- **ESLint 9** - JavaScript/TypeScript linting
- **Prettier 3** - Code formatting
- **Pest 3** - PHP testing framework
- **Laravel Pint** - PHP code style fixer
- **Laravel Sail** - Docker development environment
- **Laravel Pail** - Log viewer

## Project Conventions

### Code Style

#### TypeScript/React
- **Formatting**: Prettier with 4-space tabs, 150 character line width, single quotes
- **Import Organization**: Auto-organized via `prettier-plugin-organize-imports`
- **TailwindCSS**: Auto-sorted classes via `prettier-plugin-tailwindcss`
- **Naming**: 
  - Components: PascalCase (e.g., `AppLayout`, `BookShow`)
  - Files: kebab-case for pages (e.g., `show.tsx`), PascalCase for components
  - Utility functions: camelCase
- **Type Safety**: Strict TypeScript mode enabled, no implicit any
- **Import Aliases**: `@/*` maps to `resources/js/*`
- **Comment Structure**: Organize imports with section comments (Libraries, Types, Layouts, Components)

#### PHP/Laravel
- **Code Style**: Laravel Pint for PSR-12 compliance
- **Naming**:
  - Models: Singular PascalCase (e.g., `Book`, `Perusal`)
  - Controllers: PascalCase with `Controller` suffix
  - Routes: kebab-case
- **Type Hints**: Use PHPDoc annotations for factories and relationships

### Architecture Patterns

#### Full-Stack Architecture
- **Inertia.js SPA**: Server-side routing with client-side rendering
- **Component-Based UI**: React functional components with hooks
- **Type-Safe Routes**: Ziggy provides Laravel routes to JavaScript with type safety

#### Backend Patterns
- **MVC**: Standard Laravel Model-View-Controller
- **Eloquent ORM**: Database interactions via models
- **Resource Controllers**: RESTful controller actions
- **Policies**: Authorization logic separated into policy classes
- **Factories**: Database seeding and testing data generation

#### Frontend Patterns
- **Layout Components**: Shared layouts (e.g., `AppLayout`) wrap page content
- **Page Components**: Located in `resources/js/pages/[resource]/[action].tsx`
- **Reusable Components**: UI components in `resources/js/components/`
- **Custom Hooks**: Shared logic in `resources/js/hooks/`
- **Utility Functions**: Helper functions in `resources/js/lib/`
- **Type Definitions**: Centralized in `resources/js/types/`

#### Component Organization
```
resources/js/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── layouts/        # Page layout wrappers
├── lib/            # Utility functions
├── pages/          # Inertia page components
│   └── [resource]/ # Grouped by resource (books, perusals)
└── types/          # TypeScript type definitions
```

### Testing Strategy

#### PHP Testing
- **Framework**: Pest 3 with Laravel plugin
- **Test Types**: 
  - Feature tests in `tests/Feature/` (e.g., `BookTest.php`)
  - Unit tests in `tests/Unit/`
- **Authentication**: Use `actingAs()` for authenticated user tests
- **Factories**: Leverage model factories for test data
- **Command**: `composer test` or `php artisan test`

#### Frontend Testing
- **Type Checking**: `npm run types` (TypeScript compiler check)
- **Linting**: `npm run lint` (ESLint with auto-fix)
- **Format Check**: `npm run format:check` (Prettier validation)

### Git Workflow
- Standard Git workflow with feature branches
- Code quality enforced via linting and formatting tools
- Automated checks recommended before commits

## Domain Context

### Core Entities
- **Book**: Represents a book with title, author, cover image, and associated perusals
- **Perusal**: A reading session/attempt of a book with status tracking (planned, in-progress, completed, abandoned)
- **User**: Application users who own books and perusals

### Key Relationships
- User has many Books
- Book has many Perusals
- Perusal belongs to Book

### Business Logic
- Users can track multiple reading attempts (perusals) for the same book
- Each perusal has a status lifecycle: planned → in-progress → completed/abandoned
- Reading progress tracking includes start dates and status transitions
- Books can have cover images stored in the public directory

## Important Constraints

### Technical Constraints
- **PHP Version**: Minimum PHP 8.2 required
- **Node Version**: Modern Node.js for ES modules support
- **Database**: SQLite for development (configurable for production)
- **File Storage**: Cover images stored in `public/` directory
- **SSR Support**: Optional server-side rendering via `npm run build:ssr`

### Development Constraints
- **Module System**: ES modules throughout (type: "module" in package.json)
- **TypeScript**: Strict mode enabled, no implicit any allowed
- **React**: Version 19 with automatic JSX runtime (no React imports needed)
- **Build Tool**: Vite required for asset compilation

## External Dependencies

### Laravel Ecosystem
- **Laravel Framework**: Core application framework
- **Inertia Laravel**: Server-side adapter for Inertia.js
- **Ziggy**: Route generation for JavaScript

### Development Services
- **Laravel Pail**: Real-time log monitoring
- **Laravel Sail**: Docker-based local development (optional)
- **Concurrently**: Runs multiple dev processes (server, queue, logs, vite)

### Frontend Libraries
- **Class Variance Authority**: Component variant management
- **clsx / tailwind-merge**: Conditional CSS class utilities
- **Headless UI / Radix UI**: Accessible component primitives

### Development Workflow
- **Dev Command**: `composer dev` runs server, queue, logs, and Vite concurrently
- **SSR Dev**: `composer dev:ssr` for server-side rendering development
- **Build**: `npm run build` for production assets
