# 🔧 Netlify Deployment Fix

## The Problem

Netlify's `@netlify/plugin-nextjs` is failing during the build process. This is a common issue with Next.js 16.x on Netlify.

## ✅ Solution: Use Vercel Instead (Recommended)

Since this is a Next.js project, **Vercel** (made by the Next.js team) is the best choice:

### Deploy to Vercel in 3 Steps:

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
cd frontend
vercel
```

3. **Follow the prompts**:
   - Set up and deploy: Yes
   - Which scope: Choose your account
   - Link to existing project: No
   - Project name: uppal-food-guide
   - Directory: `./` (current directory)
   - Override settings: No

4. **Add Environment Variables** (when prompted or later):
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app/api/v1
   NEXT_PUBLIC_APP_NAME=Uppal Kalan Street Food Guide
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
   ```

5. **Done!** Your site is live at: `https://uppal-food-guide.vercel.app`

## Alternative: Fix Netlify Deployment

If you must use Netlify, try these solutions:

### Solution 1: Deploy as Static Export

1. **Update `frontend/next.config.ts`**:
```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

2. **Build**:
```bash
cd frontend
npm run build
```

3. **Deploy the `out` folder to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Drag and drop the `out` folder
   - Done!

### Solution 2: Use Netlify CLI Without Plugin

1. **Remove the plugin** by creating `netlify.toml` in root:
```toml
[build]
  base = "frontend"
  command = "npm run build && npm run export"
  publish = "out"

[build.environment]
  NODE_VERSION = "18"
```

2. **Add export script** to `frontend/package.json`:
```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "export": "next export",
  "start": "next start"
}
```

3. **Deploy**:
```bash
netlify deploy --prod
```

### Solution 3: Deploy via GitHub (Automatic)

1. **Push to GitHub**:
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

2. **Connect to Netlify**:
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "Add new site" → "Import an existing project"
   - Choose GitHub
   - Select your repository

3. **Configure**:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18

4. **Add Environment Variables** in Netlify dashboard

5. **Deploy**

## Comparison: Vercel vs Netlify

| Feature | Vercel | Netlify |
|---------|--------|---------|
| Next.js Support | ⭐⭐⭐⭐⭐ Native | ⭐⭐⭐ Via plugin |
| Setup Difficulty | ⭐⭐⭐⭐⭐ Easy | ⭐⭐⭐ Medium |
| Build Speed | ⭐⭐⭐⭐⭐ Fast | ⭐⭐⭐⭐ Good |
| Free Tier | ⭐⭐⭐⭐⭐ Generous | ⭐⭐⭐⭐⭐ Generous |
| Custom Domain | ✅ Yes | ✅ Yes |
| Auto HTTPS | ✅ Yes | ✅ Yes |

**Recommendation**: Use **Vercel** for Next.js projects - it's made by the same team and works flawlessly.

## Quick Vercel Deployment

```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy (one command!)
vercel --prod

# Add environment variables via dashboard or CLI:
vercel env add NEXT_PUBLIC_API_URL
vercel env add NEXT_PUBLIC_APP_NAME  
vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY

# Redeploy with new variables
vercel --prod
```

## Backend Deployment (Railway)

Don't forget to deploy your backend:

```bash
# Option 1: Via Railway Dashboard
1. Go to railway.app
2. New Project → Deploy from GitHub
3. Select your repo
4. Set root directory: backend
5. Add environment variables
6. Deploy

# Option 2: Via Railway CLI
npm install -g @railway/cli
railway login
railway init
railway up
```

## Final Checklist

- [ ] Backend deployed to Railway/Render
- [ ] Backend URL obtained
- [ ] Frontend deployed to Vercel/Netlify
- [ ] Environment variables configured
- [ ] Site loads successfully
- [ ] API connection works
- [ ] Google Maps displays (if key added)

## URLs After Deployment

**Frontend**: 
- Vercel: `https://uppal-food-guide.vercel.app`
- Netlify: `https://uppal-food-guide.netlify.app`

**Backend**:
- Railway: `https://your-app.railway.app`
- Render: `https://uppal-food-guide-api.onrender.com`

## Need Help?

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Next.js Deployment**: https://nextjs.org/docs/deployment

---

**Recommended Path**: Deploy frontend to **Vercel** and backend to **Railway** for the smoothest experience! 🚀
