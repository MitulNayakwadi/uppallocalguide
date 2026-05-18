# 🚀 Vercel Deployment Guide - Uppal Kalan Street Food Guide

Complete guide to deploy your Next.js frontend and Express backend to production.

## 📋 Overview

This project consists of:
- **Frontend**: Next.js 16.1 application → Deploy to **Vercel** (recommended)
- **Backend**: Express.js API → Deploy to **Railway** or **Render**

## Why Vercel?

✅ **Made by Next.js team** - Perfect compatibility
✅ **Zero configuration** - Works out of the box
✅ **Automatic HTTPS** - Free SSL certificates
✅ **Global CDN** - Fast worldwide
✅ **Free tier** - Generous limits
✅ **Easy deployment** - One command or GitHub integration

## 🚀 Part 1: Deploy Backend First

### Option A: Deploy to Railway (Recommended)

1. **Go to [Railway](https://railway.app)**
2. Sign in with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Configure:
   - **Root Directory**: `backend`
   - **Start Command**: `npm start`
   - **Build Command**: `npm install`

6. **Add Environment Variables**:
   ```
   PORT=5001
   NODE_ENV=production
   ```

7. Click "Deploy"
8. **Copy your Railway URL** (e.g., `https://uppal-food-guide-production.up.railway.app`)

### Option B: Deploy to Render

1. **Go to [Render](https://render.com)**
2. Sign in with GitHub
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `uppal-food-guide-api`
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

6. **Add Environment Variables**:
   ```
   PORT=5001
   NODE_ENV=production
   ```

7. Click "Create Web Service"
8. **Copy your Render URL** (e.g., `https://uppal-food-guide-api.onrender.com`)

## 🌐 Part 2: Deploy Frontend to Vercel

### Method 1: Vercel CLI (Fastest)

1. **Install Vercel CLI**:
```bash
npm install -g vercel
```

2. **Login to Vercel**:
```bash
vercel login
```

3. **Navigate to frontend directory**:
```bash
cd frontend
```

4. **Deploy**:
```bash
vercel --prod
```

5. **Follow the prompts**:
   - Set up and deploy: **Yes**
   - Which scope: Choose your account
   - Link to existing project: **No**
   - Project name: **uppal-food-guide** (or your choice)
   - In which directory is your code located: **./** (press Enter)
   - Want to override settings: **No**

6. **Add Environment Variables**:

After deployment, add environment variables:

```bash
# Add API URL (use your Railway/Render URL from Part 1)
vercel env add NEXT_PUBLIC_API_URL production
# Enter: https://your-backend-url.railway.app/api/v1

# Add App Name
vercel env add NEXT_PUBLIC_APP_NAME production
# Enter: Uppal Kalan Street Food Guide

# Add Google Maps API Key
vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY production
# Enter: your_google_maps_api_key
```

7. **Redeploy with environment variables**:
```bash
vercel --prod
```

8. **Done!** Your site is live at: `https://uppal-food-guide.vercel.app`

### Method 2: Vercel Dashboard (GitHub Integration)

1. **Push code to GitHub** (if not already):
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "Add New..." → "Project"**

4. **Import your GitHub repository**:
   - Click "Import" next to your repository
   - If not listed, click "Adjust GitHub App Permissions"

5. **Configure Project**:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `.next` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

6. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   NEXT_PUBLIC_API_URL = https://your-backend-url.railway.app/api/v1
   NEXT_PUBLIC_APP_NAME = Uppal Kalan Street Food Guide
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY = your_google_maps_api_key
   ```

7. **Click "Deploy"**

8. **Wait for deployment** (usually 1-2 minutes)

9. **Done!** Click "Visit" to see your live site

### Method 3: Vercel for Git (Automatic Deployments)

Once connected via Method 2:
- Every push to `main` branch automatically deploys
- Pull requests get preview deployments
- Rollback to any previous deployment anytime

## 🔑 Environment Variables Setup

### Required Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_API_URL` | Backend API URL | `https://your-app.railway.app/api/v1` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Uppal Kalan Street Food Guide` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | Google Maps key | `AIzaSy...` |

### How to Add via CLI:

```bash
# Production environment
vercel env add NEXT_PUBLIC_API_URL production

# Preview environment (optional)
vercel env add NEXT_PUBLIC_API_URL preview

# Development environment (optional)
vercel env add NEXT_PUBLIC_API_URL development
```

### How to Add via Dashboard:

1. Go to your project in Vercel
2. Click "Settings"
3. Click "Environment Variables"
4. Add each variable
5. Select environment (Production, Preview, Development)
6. Click "Save"
7. Redeploy for changes to take effect

## 🧪 Testing Your Deployment

### 1. Test Backend API

Visit your backend URL:
```
https://your-backend-url.railway.app/health
```

Should return:
```json
{
  "success": true,
  "message": "Uppal Kalan Street Food Guide API is running"
}
```

### 2. Test Frontend

Visit your Vercel URL:
```
https://uppal-food-guide.vercel.app
```

Check:
- ✅ Page loads correctly
- ✅ Restaurant listings appear
- ✅ Search and filters work
- ✅ No console errors (F12)
- ✅ API calls succeed (Network tab)

### 3. Test API Connection

1. Open browser console (F12)
2. Go to Network tab
3. Try searching for restaurants
4. Verify API calls go to your backend URL
5. Check responses are successful (200 status)

## 🐛 Troubleshooting

### Build Fails on Vercel

**Problem**: Build errors during deployment

**Solutions**:
1. Check build logs in Vercel dashboard
2. Ensure project builds locally: `npm run build`
3. Verify all dependencies in `package.json`
4. Check Node version (Vercel uses Node 18 by default)

### Environment Variables Not Working

**Problem**: Variables are undefined in the app

**Solutions**:
1. Ensure variable names start with `NEXT_PUBLIC_`
2. Redeploy after adding variables
3. Check variables are in "Production" environment
4. Clear cache: `vercel --prod --force`

### API Connection Fails

**Problem**: Frontend can't reach backend

**Solutions**:
1. Verify `NEXT_PUBLIC_API_URL` is correct
2. Check backend is running (visit health endpoint)
3. Ensure backend URL includes `/api/v1`
4. Check CORS settings in backend allow Vercel domain

### Google Maps Not Loading

**Problem**: Map doesn't appear

**Solutions**:
1. Verify `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` is set
2. Check API key is valid in Google Cloud Console
3. Ensure Maps JavaScript API is enabled
4. Check browser console for API errors
5. Verify API key restrictions allow your Vercel domain

### Backend CORS Errors

**Problem**: CORS policy blocking requests

**Solution**: Update `backend/server.js`:
```javascript
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? [
        'https://uppal-food-guide.vercel.app',
        'https://uppal-food-guide-*.vercel.app' // Preview deployments
      ]
    : ['http://localhost:3000'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
```

## 🔄 Continuous Deployment

### Automatic Deployments

Once connected via GitHub:
1. **Push to main** → Automatic production deployment
2. **Open PR** → Automatic preview deployment
3. **Merge PR** → Automatic production deployment

### Manual Deployments

```bash
# Deploy to production
vercel --prod

# Deploy to preview
vercel

# Deploy specific branch
vercel --prod --branch=feature-branch
```

### Rollback

If something goes wrong:
1. Go to Vercel dashboard
2. Click "Deployments"
3. Find a previous working deployment
4. Click "..." → "Promote to Production"

## 🎨 Custom Domain (Optional)

### Add Custom Domain

1. Go to your project in Vercel
2. Click "Settings" → "Domains"
3. Click "Add"
4. Enter your domain (e.g., `uppal-food-guide.com`)
5. Follow DNS configuration instructions
6. Wait for DNS propagation (24-48 hours)

### SSL Certificate

Vercel automatically provides free SSL certificates via Let's Encrypt.

## 📊 Performance & Analytics

### Vercel Analytics (Optional)

1. Go to your project
2. Click "Analytics"
3. Enable Vercel Analytics
4. View real-time performance metrics

### Speed Insights

Vercel provides:
- Core Web Vitals
- Performance scores
- Real user monitoring
- Geographic distribution

## 💰 Pricing

### Vercel Free Tier Includes:
- ✅ Unlimited deployments
- ✅ 100 GB bandwidth/month
- ✅ Automatic HTTPS
- ✅ Preview deployments
- ✅ Analytics (basic)
- ✅ Custom domains

### Railway/Render Free Tier:
- ✅ 500 hours/month (Railway)
- ✅ 750 hours/month (Render)
- ✅ Automatic HTTPS
- ✅ Continuous deployment

## 📋 Deployment Checklist

### Before Deploying:

- [ ] Backend deployed and running
- [ ] Backend health endpoint accessible
- [ ] Backend URL copied
- [ ] Google Maps API key obtained
- [ ] Code pushed to GitHub (for Method 2)
- [ ] Build tested locally (`npm run build`)

### After Deploying:

- [ ] Frontend loads correctly
- [ ] API connection works
- [ ] Search and filters functional
- [ ] Google Maps displays (if key added)
- [ ] No console errors
- [ ] Mobile responsive
- [ ] Custom domain configured (optional)

## 🚀 Quick Deploy Commands

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from frontend directory
cd frontend
vercel --prod

# Add environment variables
vercel env add NEXT_PUBLIC_API_URL production
vercel env add NEXT_PUBLIC_APP_NAME production
vercel env add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY production

# Redeploy with new variables
vercel --prod

# View deployment
vercel --prod --open
```

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Render Docs**: https://render.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment

## 🎉 Success!

Your Uppal Kalan Street Food Guide is now live!

**Share your URLs:**
- **Frontend**: `https://uppal-food-guide.vercel.app`
- **Backend API**: `https://your-backend-url.railway.app`

**Next Steps:**
- Share with friends and family
- Add more restaurant data
- Collect user feedback
- Monitor analytics
- Implement AI recommendations

---

**Made with ❤️ for Uppal Kalan food lovers**

Need help? Check the [README](./README.md) or open an issue on GitHub.
bnn