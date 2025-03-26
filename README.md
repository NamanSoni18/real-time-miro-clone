# 🎨 Real-Time Collaborative Whiteboard (Miro Clone)

A feature-rich collaborative whiteboard built with Next.js 15, Liveblocks, and Convex that supports real-time multi-user editing with complete toolset.

## ✨ Features

### 🛠️ Core Functionality
- **Real-time collaboration** 👥  
  - Live cursors for all participants
  - Instant syncing across devices
- **Complete drawing toolkit** 🎨
  - Text tool with formatting
  - Shapes (Rectangle, Circle, Triangle)
  - Sticky notes with color options
  - Freehand pencil drawing
  - Layer management system
- **Productivity features** ⚡
  - Unlimited undo/redo history
  - Keyboard shortcuts
  - Optimized rendering engine

### 🔐 Workspace Management
- Organization/team support
- Secure authentication
- Invite system
- Favorites system

## 🚀 Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19 (with Server Components)
- TypeScript
- TailwindCSS + ShadcnUI components

### Backend & State
- Convex (Real-time database)
- Liveblocks (Collaboration infrastructure)
- Clerk (Authentication)

### Development Tools
- ESLint + Prettier
- Husky git hooks

## 🏗️ Project Structure
```bash
real-time-miro-clone/
├── app/
│   ├── (dashboard)/          # Protected routes
│   │   ├── _components/
│   │   │   └── page.tsx
│   │   └── layout.tsx
│   ├── api/
│   │   └── liveblocks-auth/  # Liveblocks auth endpoint
│   └── layout.tsx
├── convex/
│   ├── board.ts              # Board mutations/queries
│   └── schema.ts             # Database schema
├── public/                   # Assets
└── providers/
    └── convex-client-provider.tsx
    └── modal-provider.tsx
```

## 🛠️ Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/miro-clone.git
cd miro-clone

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in your keys from:
CONVEX_DEPLOYMENT=your_convex_dev_key
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
CLERK_SECRET_KEY=your_clerk_secret_key
LIVEBLOCKS_SECRET_KEY=your_liveblock_secret_key


# 4. Run the Convex Server
npx convex dev

# 5. Run development Server
npm run dev
```