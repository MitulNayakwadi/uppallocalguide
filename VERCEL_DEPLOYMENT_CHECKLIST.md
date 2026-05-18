# 🚀 Quick Vercel Deployment Checklist

## Pre-Deployment Checklist

- [ ] All code is committed to GitHub
- [ ] No sensitive data in environment files (use `.gitignore`)
- [ ] Dependencies are up to date (`npm install`)
- [ ] Build passes locally (`npm run build`)
- [ ] No console errors or warnings
- [ ] API endpoints are working locally

## Deployment Steps

### 1️⃣ Prepare Repository

```bash
# Make sure everything is pushed to GitHub
git status
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2️⃣ Deploy to Vercel

#### Option A: Using Vercel CLI

```bash
# Install Vercel CLI globally (if not already installed)
npm install -g vercel

# Deploy from project root
vercel

# Follow the prompts:
# - Confirm project settings
# - Select scope (your account)
# - Link to existing project or create new
```

#### Option B: Using Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Select the repository
5. Configure:
   - **Framework**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. Add environment variables (see below)
7. Click "Deploy"

### 3️⃣ Set Environment Variables

In Vercel Dashboard → Project Settings → Environment Variables:

**For development:**
```
NEXT_PUBLIC_ENVIRONMENT=development
```

**For production (leave empty to use relative URLs):**
```
NEXT_PUBLIC_ENVIRONMENT=production
```

### 4️⃣ Verify Deployment

After deployment completes:

1. Visit your Vercel URL (e.g., `https://uppal-local-guide.vercel.app`)
2. Check that pages load correctly
3. Test API endpoints:
   - `https://your-domain.vercel.app/api/v1/restaurants`
   - `https://your-domain.vercel.app/api/v1/areas`
   - `https://your-domain.vercel.app/api/v1/cuisines`
4. Test the search and filter functionality
5. Check browser console for any errors

## 🐛 Troubleshooting

### Build Fails with "Cannot find module"
- Ensure all dependencies are in `package.json`
- Check that file paths use forward slashes `/`
- Clear cache: `vercel env pull` then `npm install`

### API returns 404
- Verify Next.js API routes exist in `src/app/api/v1/`
- Check route naming matches the URL pattern
- Verify the handler exports `GET`, `POST`, etc.

### CORS Errors
- Check that API routes have CORS headers
- Verify the frontend is using correct URLs

### Static data not loading
- Ensure `data/` directory is in git (not in `.gitignore`)
- Verify paths are relative to project root

### Environment variables not working
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Redeploy after adding variables
- Check that variable names match your code

## 📊 Monitoring Deployment

- **Vercel Dashboard**: View logs and analytics at [vercel.com/dashboard](https://vercel.com/dashboard)
- **Deployment Logs**: Click "Deployments" → Select deployment → "View Logs"
- **Real-time Logs**: Use `vercel logs --follow`

## 🔗 Useful Links

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel CLI Documentation](https://vercel.com/cli)

## 📞 Support

If deployment fails:

1. Check Vercel logs for error messages
2. Review the `VERCEL_SETUP_GUIDE.md` for detailed instructions
3. Verify that `vercel.json` is correctly configured
4. Ensure `frontend/` contains a valid Next.js project

---

**Happy Deploying! 🎉**
