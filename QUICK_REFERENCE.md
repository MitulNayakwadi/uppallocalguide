# ⚡ Vercel Deployment - Quick Reference Card

## 📋 Pre-Deployment Checklist

```
□ Code pushed to GitHub
□ npm run build passes locally
□ No console errors/warnings
□ All dependencies in package.json
□ Environment files configured
□ Data files committed to git
□ .gitignore excludes .env files
```

## 🚀 Quick Deploy (Choose One)

### Option A: Vercel CLI (Fastest)
```bash
npm i -g vercel          # Install once
cd uppal-local-guide
vercel                   # Deploy!
# Follow prompts to confirm
```

### Option B: Vercel Dashboard
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Import your GitHub repo
4. Configure build settings
5. Set environment variables
6. Click "Deploy"

---

## ⚙️ Configuration Checklist

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Install Command | `npm install` |
| Environment | Leave default |

---

## 🔐 Environment Variables to Set

```
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_API_URL=          (leave empty for relative URLs)
```

---

## ✅ After Deployment

```
1. Visit your Vercel URL (https://your-project.vercel.app)
2. Test homepage loads
3. Test API: https://your-project.vercel.app/api/v1/restaurants
4. Test search functionality
5. Check console for errors (F12)
```

---

## 🆘 Common Issues & Quick Fixes

| Issue | Fix |
|-------|-----|
| Build fails | `npm run build` locally first |
| 404 on API | Verify route exists in `src/app/api/v1/` |
| CORS error | Check middleware.ts exists |
| Data empty | Verify `data/` in git: `git add data/` |
| Variables undefined | Redeploy after setting variables |

---

## 📊 Useful Commands

```bash
# Test build locally
npm run build
npm start

# View Vercel logs
vercel logs --follow

# Redeploy
vercel --prod --force

# Check status
vercel ls
```

---

## 📚 Documentation Files

| File | Purpose |
|------|---------|
| [VERCEL_DOCS_INDEX.md](VERCEL_DOCS_INDEX.md) | Start here - complete index |
| [VERCEL_SETUP_GUIDE.md](VERCEL_SETUP_GUIDE.md) | Deployment guide with 2 options |
| [VERCEL_DEPLOYMENT_CHECKLIST.md](VERCEL_DEPLOYMENT_CHECKLIST.md) | Step-by-step checklist |
| [TROUBLESHOOTING.md](TROUBLESHOOTING.md) | Common issues & solutions |
| [VERCEL_PRODUCTION_GUIDE.md](VERCEL_PRODUCTION_GUIDE.md) | Advanced production setup |

---

## 🎯 What You Have

✅ Next.js API routes (no separate backend needed)  
✅ Data service for JSON files  
✅ CORS middleware configured  
✅ Environment variables setup  
✅ Production-optimized build  
✅ Serverless functions ready  
✅ Global CDN included  

---

## 💡 Pro Tips

1. **Test locally first** - Always run `npm run build` before deploying
2. **Use relative URLs** - Leave `NEXT_PUBLIC_API_URL` empty on Vercel
3. **Check logs immediately** - Use `vercel logs --follow` after deploy
4. **Keep data in git** - Don't add `data/` to `.gitignore`
5. **Redeploy after env changes** - Variables take effect on new deployment

---

## 🔗 Important Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Vercel CLI Docs](https://vercel.com/cli)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Vercel Support](https://vercel.com/support)

---

## ✨ Success Indicators

After deployment, you should see:

- ✅ App loads at your Vercel URL
- ✅ `/api/v1/restaurants` returns JSON data
- ✅ Search works without errors
- ✅ Filters work correctly
- ✅ No 404 errors in console
- ✅ Page loads in < 2 seconds

---

**Ready to deploy? Start with [VERCEL_DOCS_INDEX.md](VERCEL_DOCS_INDEX.md)** 🚀

---

**Quick Tip**: Bookmark this page for quick reference during deployment!
