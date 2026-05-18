# 📖 Vercel Deployment - Complete Documentation Index

## Quick Links

### 🚀 Getting Started (Start Here!)
- **[VERCEL_SETUP_GUIDE.md](VERCEL_SETUP_GUIDE.md)** - Main deployment guide with two deployment options
- **[VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md)** - Pre-deployment checklist and quick steps

### 📋 Additional Documentation
- **[VERCEL_PRODUCTION_GUIDE.md](VERCEL_PRODUCTION_GUIDE.md)** - Advanced production setup, monitoring, and optimization
- **[LOCAL_DEVELOPMENT.md](LOCAL_DEVELOPMENT.md)** - Local development environment setup
- **[QUICK_SETUP.md](QUICK_SETUP.md)** - Original quick setup guide

## 🎯 Recommended Deployment Path

### Option 1: Next.js API Routes (Recommended ✨)
**Single Vercel deployment** - Best for simplicity and performance

1. **Prepare**:
   ```bash
   # Clone and setup
   git clone <your-repo>
   cd uppal-local-guide
   npm run install:all
   ```

2. **Test Locally**:
   ```bash
   cd frontend && npm run dev
   # Visit http://localhost:3000
   ```

3. **Deploy**:
   ```bash
   npm i -g vercel
   vercel
   ```

4. **Verify**:
   - Navigate to deployment URL
   - Test API: `/api/v1/restaurants`
   - Test search functionality

### Option 2: Separate Backend (Alternative)
**Two deployments** - Backend on Railway/Render, Frontend on Vercel

1. Deploy backend to [Railway.app](https://railway.app)
2. Deploy frontend to Vercel
3. Set `NEXT_PUBLIC_API_URL` to backend URL

## 📁 Project Structure for Vercel

```
uppal-local-guide/
├── vercel.json                 ← Vercel configuration
├── VERCEL_SETUP_GUIDE.md      ← Main deployment guide
├── VERCEL_DEPLOYMENT_CHECKLIST.md
├── VERCEL_PRODUCTION_GUIDE.md
├── LOCAL_DEVELOPMENT.md
├── setup-vercel.sh            ← Setup script (Mac/Linux)
├── setup-vercel.bat           ← Setup script (Windows)
├── data/                      ← Static data (auto-included)
├── backend/                   ← Optional separate deployment
│   ├── server.js
│   ├── routes/
│   ├── controllers/
│   └── package.json
└── frontend/                  ← Main Next.js app
    ├── next.config.js
    ├── src/
    │   ├── app/
    │   │   ├── api/v1/        ← API routes for Vercel
    │   │   ├── layout.tsx
    │   │   └── page.tsx
    │   ├── components/
    │   ├── lib/
    │   │   └── dataService.ts ← Shared data service
    │   ├── utils/
    │   │   └── api.ts
    │   └── types/
    ├── middleware.ts          ← CORS middleware
    └── package.json
```

## 🔧 Configuration Files Created

### `vercel.json`
Main Vercel configuration with build commands and environment variables.

### `frontend/.env.example`
Frontend environment variables template.

### `frontend/src/app/api/v1/`
Next.js API routes that replace the backend server:
- `restaurants/route.ts` - GET all restaurants
- `restaurants/[id]/route.ts` - GET specific restaurant
- `restaurants/area/[area]/route.ts` - GET by area
- `restaurants/cuisine/[cuisine]/route.ts` - GET by cuisine
- `recommendations/route.ts` - POST for recommendations
- `recommendations/popular/route.ts` - GET popular
- `recommendations/budget/[budget]/route.ts` - GET by budget
- `recommendations/feedback/route.ts` - POST feedback
- `search/route.ts` - GET/POST search
- `areas/route.ts` - GET all areas
- `cuisines/route.ts` - GET all cuisines

### `frontend/src/lib/dataService.ts`
Shared data service for loading and querying restaurant data.

### `frontend/src/middleware.ts`
CORS and request handling middleware.

## 🚀 Deployment Commands

### Using Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy (from project root)
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs --follow

# List deployments
vercel ls
```

### Using GitHub Integration
1. Go to [vercel.com](https://vercel.com)
2. Import repository
3. Configure build settings
4. Set environment variables
5. Every push to main = auto-deploy

## 🔒 Environment Variables

### Required (Leave Empty for Relative URLs)
```
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_API_URL=  (leave empty for Vercel)
```

### Optional
```
NEXT_PUBLIC_APP_NAME=Uppal Kalan Street Food Guide
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key
```

## ✅ Pre-Deployment Checklist

- [ ] Code committed and pushed to GitHub
- [ ] `npm run build` passes locally
- [ ] No console errors or warnings
- [ ] Environment files properly configured
- [ ] All dependencies in `package.json`
- [ ] API routes created and tested
- [ ] Data files included in repository
- [ ] `.gitignore` excludes sensitive files
- [ ] Vercel account created

## 📊 Monitoring & Analytics

**After Deployment**:
1. Visit Vercel Dashboard: [vercel.com/dashboard](https://vercel.com/dashboard)
2. View real-time logs and errors
3. Monitor Web Vitals and performance
4. Check visitor analytics
5. Set up notifications for failures

## 🆘 Need Help?

### Common Issues & Solutions

**Build fails**:
- Check `INSTALL_COMMAND` in `vercel.json`
- Ensure all dependencies are in `package.json`
- Clear cache: `rm -rf .vercel && npm cache clean --force`

**API returns 404**:
- Verify route exists: `frontend/src/app/api/v1/restaurants/route.ts`
- Check route naming matches URL
- Ensure handler exports `GET`, `POST`, etc.

**Data not loading**:
- Verify `data/` directory is committed to git
- Check file paths use forward slashes
- Run `ls -la data/` to confirm files exist

**CORS errors**:
- Update `corsHeaders` in API routes
- Check browser DevTools Network tab
- Verify middleware is applied

### Support Resources

- [Vercel Docs](https://vercel.com/docs)
- [Next.js Docs](https://nextjs.org/docs)
- [Vercel Support](https://vercel.com/support)
- [GitHub Issues](https://github.com/your-repo/issues)

## 📚 Learning Resources

- [Next.js Deployment Guide](https://nextjs.org/docs/deployment)
- [Vercel Architecture](https://vercel.com/docs/concepts/edge-network/overview)
- [Serverless Functions](https://vercel.com/docs/concepts/functions/serverless-functions)
- [Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

## 🎉 Success!

After successful deployment:
1. ✅ App available at `https://your-project.vercel.app`
2. ✅ API endpoints working at `/api/v1/*`
3. ✅ Search and filters functional
4. ✅ Images optimized and cached
5. ✅ Global CDN distribution

---

## 📝 Next Steps

1. **Read**: [VERCEL_SETUP_GUIDE.md](VERCEL_SETUP_GUIDE.md)
2. **Prepare**: Run `./setup-vercel.sh` (or `.bat` on Windows)
3. **Deploy**: Follow checklist in [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md)
4. **Monitor**: Use Vercel Dashboard for analytics

**Happy Deploying! 🚀**

---

**Last Updated**: May 2026
**Status**: Ready for Production ✅
