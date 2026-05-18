# 🚀 Vercel Deployment Setup Guide

This guide explains how to deploy the Uppal Kalan Street Food Guide to Vercel with two options.

## ✅ Prerequisites

- GitHub account with repository pushed
- Vercel account (free at https://vercel.com)
- Node.js 18+ installed locally

## 🎯 Deployment Options

### Option 1: Full Next.js Integration (Recommended) ✨

**Single Vercel deployment** - Backend migrated to Next.js API routes

#### Steps:

1. **Create API Routes** (already scaffolded, execute migration):
   ```bash
   # The API routes structure has been prepared in:
   # frontend/src/app/api/v1/
   ```

2. **Deploy to Vercel**:
   ```bash
   # Install Vercel CLI
   npm i -g vercel

   # Deploy from project root
   vercel
   # Follow prompts - select "frontend" as root directory
   ```

3. **Set Environment Variables in Vercel Dashboard**:
   - Go to Project Settings → Environment Variables
   - Add: `NEXT_PUBLIC_ENVIRONMENT=production`
   - Leave `NEXT_PUBLIC_API_URL` empty (uses relative URLs)

4. **Production URL**:
   - Your app will be live at: `https://your-project.vercel.app`
   - API calls will use: `/api/v1/*` (relative URLs)

---

### Option 2: Separate Backend Deployment

**Two deployments** - Keep backend separate on Railway/Render

#### Backend Deployment (Railway - Recommended):

1. **Go to [Railway.app](https://railway.app)**
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repo
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   ```
   PORT=5001
   NODE_ENV=production
   ```
6. Deploy - copy your Railway URL (e.g., `https://uppal-api.railway.app`)

#### Frontend Deployment (Vercel):

1. **Go to [Vercel](https://vercel.com)**
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-url/api/v1
   NEXT_PUBLIC_ENVIRONMENT=production
   ```
6. Deploy

---

## 🔧 Local Development

### Using Option 1 (Next.js API Routes):

```bash
# Install dependencies
npm run install:all

# Start both frontend and backend together
npm run dev

# Frontend: http://localhost:3000
# API: http://localhost:3000/api/v1
```

### Using Option 2 (Separate Backend):

```bash
# Terminal 1: Start backend
cd backend && npm run dev
# Runs on http://localhost:5001

# Terminal 2: Start frontend
cd frontend && npm run dev
# Runs on http://localhost:3000

# Or use the root dev command
npm run dev  # Runs both concurrently
```

---

## 📋 Vercel Project Settings

### Build & Development

- **Build Command**: `cd frontend && npm run build`
- **Output Directory**: `frontend/.next`
- **Install Command**: `npm install && cd frontend && npm install`

### Environment Variables

**For Option 1 (Next.js API Routes)**:
```
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_API_URL=  (leave empty)
```

**For Option 2 (Separate Backend)**:
```
NEXT_PUBLIC_API_URL=https://your-backend-url/api/v1
NEXT_PUBLIC_ENVIRONMENT=production
```

### Deployment Regions

- Default: `iad1` (US East - N. Virginia)
- Vercel automatically selects optimal regions

---

## 🐛 Troubleshooting

### "Cannot GET /" Error
- Check that build is using `frontend` directory
- Ensure `next.config.js` is in `frontend` folder

### API Routes Return 404
- Verify Next.js API route structure: `frontend/src/app/api/v1/...`
- Check that routes return proper JSON responses

### CORS Errors
- Backend should have CORS configured for your Vercel domain
- Frontend should use relative URLs or configured API_URL

### Build Fails
- Check Node.js version: `node -v` (requires 18+)
- Clear cache: `npm cache clean --force`
- Delete lock files: `rm package-lock.json`

---

## 📊 Performance Tips

1. **Enable Caching**:
   - Vercel automatically caches static files
   - Set appropriate cache headers in API routes

2. **Optimize Images**:
   - Already configured in `next.config.js`
   - Remote images are optimized automatically

3. **Database/Data Strategy**:
   - Consider moving data files to serverless-friendly storage
   - Current JSON files work but consider MongoDB Atlas for production

---

## 🔐 Security Checklist

- [ ] Environment variables are not in git (check `.gitignore`)
- [ ] CORS is configured for production domain only
- [ ] Rate limiting is enabled on API routes
- [ ] Sensitive data is in Vercel Secrets
- [ ] HTTPS is enforced (automatic on Vercel)

---

## 📚 Additional Resources

- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Railway Deployment Docs](https://docs.railway.app)
- [Next.js API Routes Guide](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)

---

## 🎉 Next Steps

1. Choose Option 1 or Option 2 above
2. Push changes to GitHub
3. Connect repository to Vercel
4. Deploy!

Happy deploying! 🚀
