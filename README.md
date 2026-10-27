# Retrouve

**Retrouve** is a multi-tenant lost-and-found platform designed to help individuals and organizations report, discover, and manage lost and found belongings.

The project includes a mobile application and a web application, with separate experiences for individual users, organizations, and platform administrators.

> **Current stage:** Frontend development and UI testing. The backend has not been connected.

## Features and planned functionality

### Individual users

- Browse lost and found items.
- Search and filter items by category, status, and location.
- Save interesting items.
- Report lost or found belongings.
- View item details and track resolution.

### Organizations

- Manage an organization's lost-and-found inventory.
- Review and manage item reports.
- Track resolved and unresolved items.
- Manage team members and organization activity.
- Access the dashboard on web and mobile.

### Platform administrators

- Oversee platform activity.
- Manage organizations and accounts.
- Review reports and moderate content.
- Monitor platform-wide statistics.

_These are planned product capabilities; not all features are implemented yet._

## Technology stack

### Mobile application

- Expo and React Native
- Expo Router
- JavaScript and JSX
- Zustand for client-side state
- TanStack Query for future server-state management
- Hugeicons for icons

### Web application

- Next.js with the App Router
- React
- JavaScript and JSX
- Zustand for client-side state
- Tailwind CSS for styling

### Backend — planned

- Supabase for authentication, database, and storage
- Row Level Security (RLS) for tenant and role-based data access

**Backend integration is intentionally deferred.** Current frontend development uses mock data and client-side state.

## Project structure

```text
retrouve/
├── README.md
└── apps/
    ├── mobile/
    │   ├── app/              # Expo Router screens and layouts
    │   ├── components/       # Reusable mobile UI components
    │   ├── constants/        # Theme and design tokens
    │   ├── data/             # Mock data
    │   ├── stores/            # Zustand stores
    │   ├── assets/            # Images and other assets
    │   ├── app.json
    │   └── package.json
    │
    └── web/
        ├── app/               # Next.js pages and layouts
        │   ├── admin/
        │   ├── organization/
        │   ├── globals.css
        │   ├── layout.jsx
        │   └── page.jsx
        ├── components/        # Reusable web components
        ├── constants/         # Shared web constants
        ├── data/              # Mock data
        ├── lib/               # Utility functions
        ├── stores/            # Zustand stores
        └── package.json
```
