#!/bin/bash

# 🚀 Uppal Local Guide - Vercel Deployment Setup Script
# This script prepares the project for Vercel deployment

set -e

echo "📦 Uppal Local Guide - Vercel Deployment Setup"
echo "=============================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ from nodejs.org"
    exit 1
fi

NODE_VERSION=$(node -v)
echo "✅ Node.js detected: $NODE_VERSION"
echo ""

# Install dependencies
echo "📥 Installing dependencies..."
npm install

echo "📥 Installing frontend dependencies..."
cd frontend && npm install && cd ..

echo "📥 Installing backend dependencies (optional)..."
cd backend && npm install && cd ..

echo ""
echo "✅ All dependencies installed!"
echo ""

# Create environment files if they don't exist
if [ ! -f ".env.local" ]; then
    echo "📝 Creating .env.local..."
    cp .env.example .env.local
    echo "   Configure NEXT_PUBLIC_API_URL if needed"
fi

if [ ! -f "frontend/.env.local" ]; then
    echo "📝 Creating frontend/.env.local..."
    cp frontend/.env.example frontend/.env.local
fi

echo ""
echo "🔨 Building frontend for production..."
cd frontend && npm run build && cd ..

echo ""
echo "✅ Vercel deployment setup complete!"
echo ""
echo "📚 Documentation Files:"
echo "  - VERCEL_SETUP_GUIDE.md         → Main deployment guide"
echo "  - VERCEL_DEPLOYMENT_CHECKLIST.md → Pre-deployment checklist"
echo "  - VERCEL_PRODUCTION_GUIDE.md    → Advanced production setup"
echo "  - LOCAL_DEVELOPMENT.md          → Local development guide"
echo ""
echo "🚀 Next Steps:"
echo "  1. Review VERCEL_SETUP_GUIDE.md"
echo "  2. Push to GitHub: git push origin main"
echo "  3. Go to https://vercel.com and import your repository"
echo "  4. Or use: npm i -g vercel && vercel"
echo ""
echo "📊 Test locally before deploying:"
echo "  cd frontend && npm run dev"
echo ""
