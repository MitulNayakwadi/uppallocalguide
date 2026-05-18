## Local Development with Vercel Setup

### Environment Setup

1. **Copy environment variables**:
```bash
# In project root
cp .env.example .env.local

# In frontend
cp frontend/.env.example frontend/.env.local
```

2. **Update `.env.local`** if using separate backend:
```bash
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
```

3. **Leave empty for Next.js API routes** (recommended):
```bash
NEXT_PUBLIC_API_URL=
```

### Running Locally

#### With Next.js API Routes (Recommended for Vercel):

```bash
# Install all dependencies
npm run install:all

# Start frontend with API routes
cd frontend && npm run dev

# Visit http://localhost:3000
# API endpoints: http://localhost:3000/api/v1/...
```

#### With Separate Backend:

```bash
# Terminal 1: Backend
cd backend && npm run dev
# Runs on http://localhost:5001

# Terminal 2: Frontend  
cd frontend && npm run dev
# Runs on http://localhost:3000

# Or from root:
npm run dev  # Runs both concurrently
```

### Building for Production

```bash
# Build frontend
npm run build

# Test production build locally
cd frontend && npm start
```
