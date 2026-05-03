### Authentication Flow

User signs in on Next.js with Clerk
↓
Next.js gets Clerk session token
↓
Web calls Express API with token
↓
Express verifies token with Clerk
↓
Express uses clerkUserId to read/write your app data

### UI Conventions

Tailwind CSS for styling
shadcn/ui conventions for components
CSS variables for colors
next-themes for dark mode
cn() for conditional class names
feature-based component folders

apps/web/
|--app/
|----layout.tsx
|----globals.css
|----page.tsx

|--components/
|----ui/
|------button.tsx
|------input.tsx
|------card.tsx

|----layout/
|------navbar.tsx
|------sidebar.tsx

|----features/
|------projects/
|--------project-card.tsx
|--------project-list.tsx

|--lib/
|----utils.ts
