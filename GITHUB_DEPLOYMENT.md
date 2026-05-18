# 🚀 GitHub Deployment Guide

Complete guide to push your project to GitHub with API keys secured.

## ✅ Pre-Deployment Checklist

Before pushing to GitHub, ensure:

- [ ] All API keys are in `.env` files (not hardcoded)
- [ ] `.env` and `.env.local` are in `.gitignore`
- [ ] `.env.example` is updated (without real keys)
- [ ] Code is tested locally
- [ ] No sensitive data in source files
- [ ] README.md is complete

## 🔒 Security First

### Files That Should NOT Be Committed

These files contain sensitive API keys and are automatically ignored:

```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
backend/.env
frontend/.env.local
```

### Files That SHOULD Be Committed

```
.env.example          # Template without real keys
.gitignore           # Git ignore rules
.kiro/               # Kiro AI context (required for challenge)
README.md            # Documentation
SECURITY.md          # Security guidelines
```

## 📤 Push to GitHub

### 1. Initialize Git (if not already done)

```bash
git init
```

### 2. Verify .gitignore

Check that `.gitignore` includes:

```gitignore
# Environment variables
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# Dependencies
node_modules/

# Build outputs
.next/
build/
dist/
```

### 3. Check for Exposed Keys

Before committing, verify no keys are exposed:

```bash
# Search for potential API keys
git grep -i "AIza"
git grep -i "api.*key.*="

# Should return no results from tracked files
```

### 4. Stage Files

```bash
# Add all files
git add .

# Or add specific files
git add frontend/ backend/ data/ .kiro/ README.md .gitignore .env.example
```

### 5. Verify What Will Be Committed

```bash
# Check status
git status

# Verify .env files are NOT listed
# They should show as "untracked" or not appear at all
```

### 6. Commit Changes

```bash
git commit -m "Initial commit: Uppal Kalan Street Food Guide with AI recommendations"
```

### 7. Create GitHub Repository

1. Go to [GitHub](https://github.com)
2. Click "New repository"
3. Name: `uppal-local-guide`
4. Description: "AI-powered local food discovery for Uppal Kalan, Hyderabad"
5. **Keep it Public** (for AI for Bharat challenge)
6. **Do NOT** initialize with README (you already have one)
7. Click "Create repository"

### 8. Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/uppal-local-guide.git

# Push to main branch
git branch -M main
git push -u origin main
```

## 🎯 After Pushing

### 1. Verify on GitHub

Check that:
- ✅ `.env.example` is visible
- ✅ `.kiro/` directory is visible
- ✅ README.md displays correctly
- ❌ `.env` files are NOT visible
- ❌ `node_modules/` is NOT visible

### 2. Update README

Replace `YOUR_USERNAME` in README.md with your actual GitHub username:

```bash
# Edit README.md
# Find and replace: YOUR_USERNAME → your-actual-username

git add README.md
git commit -m "Update GitHub username in README"
git push
```

### 3. Add Repository Description

On GitHub:
1. Go to your repository
2. Click "About" (gear icon)
3. Add description: "AI-powered local food discovery for Uppal Kalan, Hyderabad"
4. Add topics: `ai`, `food`, `hyderabad`, `nextjs`, `gemini-ai`, `kiro`
5. Save

### 4. Enable GitHub Pages (Optional)

For documentation:
1. Go to Settings → Pages
2. Source: Deploy from branch
3. Branch: main, folder: /docs
4. Save

## 🌐 Deploy to Production

### Frontend (Vercel)

1. **Go to [Vercel](https://vercel.com)**
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - Framework Preset: Next.js
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `.next`

5. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_API_URL=https://your-backend-url.com/api/v1
   NEXT_PUBLIC_APP_NAME=Uppal Kalan Street Food Guide
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key
   NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_key
   ```

6. Click "Deploy"

### Backend (Railway)

1. **Go to [Railway](https://railway.app)**
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your repository
5. Configure:
   - Root Directory: `backend`
   - Start Command: `npm start`

6. **Add Environment Variables**:
   ```
   PORT=5001
   NODE_ENV=production
   ```

7. Deploy

8. **Copy the Railway URL** and update Vercel's `NEXT_PUBLIC_API_URL`

### Alternative: Backend on Render

1. **Go to [Render](https://render.com)**
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Name: uppal-food-guide-api
   - Root Directory: `backend`
   - Build Command: `npm install`
   - Start Command: `npm start`

5. **Add Environment Variables**:
   ```
   PORT=5001
   NODE_ENV=production
   ```

6. Deploy

## 🔄 Updating Your Repository

### Making Changes

```bash
# Make your changes
# Test locally

# Stage changes
git add .

# Commit
git commit -m "Description of changes"

# Push
git push
```

### Updating Environment Variables

**Local:**
- Edit `.env` or `.env.local` files
- Never commit these files

**Production:**
- Update in Vercel dashboard (Settings → Environment Variables)
- Update in Railway/Render dashboard
- Redeploy if needed

## 🐛 Common Issues

### "API key exposed" warning

If GitHub detects an exposed key:
1. **Immediately revoke the key** in Google Cloud Console
2. **Generate a new key**
3. **Remove from Git history**:
```bash
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all
git push origin --force --all
```

### ".env file committed by mistake"

```bash
# Remove from Git but keep locally
git rm --cached .env
git rm --cached frontend/.env.local

# Commit the removal
git commit -m "Remove .env files from tracking"

# Push
git push
```

### "node_modules committed"

```bash
# Remove from Git
git rm -r --cached node_modules
git rm -r --cached frontend/node_modules
git rm -r --cached backend/node_modules

# Ensure .gitignore has node_modules/
echo "node_modules/" >> .gitignore

# Commit
git commit -m "Remove node_modules from tracking"
git push
```

## 📋 Deployment Checklist

Before marking as complete:

- [ ] Code pushed to GitHub
- [ ] No API keys in repository
- [ ] `.kiro/` directory is visible
- [ ] README.md is complete
- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Railway/Render
- [ ] Environment variables configured in production
- [ ] Production URLs updated
- [ ] Application tested in production
- [ ] Repository description added
- [ ] Topics/tags added

## 🎉 Submission for AI for Bharat

For the challenge submission:

1. **Repository URL**: `https://github.com/YOUR_USERNAME/uppal-local-guide`
2. **Live Demo**: Your Vercel URL
3. **API Endpoint**: Your Railway/Render URL
4. **Key Features**:
   - AI-powered recommendations using Gemini
   - Local context awareness (Uppal Kalan)
   - Smart search and filtering
   - Google Maps integration
   - Built with Kiro AI

5. **Kiro Context**: Highlight the `.kiro/` directory with steering files

## 📞 Need Help?

- **GitHub Issues**: Open an issue in your repository
- **Vercel Support**: [Vercel Documentation](https://vercel.com/docs)
- **Railway Support**: [Railway Documentation](https://docs.railway.app)
- **Security Concerns**: See [SECURITY.md](./SECURITY.md)

---

**Remember**: Never commit API keys. Always use environment variables! 🔒
