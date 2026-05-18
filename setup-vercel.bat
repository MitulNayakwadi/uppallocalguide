@echo off
REM 🚀 Uppal Local Guide - Vercel Deployment Setup Script (Windows)
REM This script prepares the project for Vercel deployment

echo.
echo 📦 Uppal Local Guide - Vercel Deployment Setup
echo ==============================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js is not installed. Please install Node.js 18+ from nodejs.org
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js detected: %NODE_VERSION%
echo.

REM Install dependencies
echo 📥 Installing dependencies...
call npm install

echo 📥 Installing frontend dependencies...
cd frontend && call npm install && cd ..

echo 📥 Installing backend dependencies (optional)...
cd backend && call npm install && cd ..

echo.
echo ✅ All dependencies installed!
echo.

REM Create environment files if they don't exist
if not exist ".env.local" (
    echo 📝 Creating .env.local...
    copy .env.example .env.local
    echo    Configure NEXT_PUBLIC_API_URL if needed
)

if not exist "frontend\.env.local" (
    echo 📝 Creating frontend\.env.local...
    copy frontend\.env.example frontend\.env.local
)

echo.
echo 🔨 Building frontend for production...
cd frontend && call npm run build && cd ..

echo.
echo ✅ Vercel deployment setup complete!
echo.
echo 📚 Documentation Files:
echo   - VERCEL_SETUP_GUIDE.md         → Main deployment guide
echo   - VERCEL_DEPLOYMENT_CHECKLIST.md → Pre-deployment checklist
echo   - VERCEL_PRODUCTION_GUIDE.md    → Advanced production setup
echo   - LOCAL_DEVELOPMENT.md          → Local development guide
echo.
echo 🚀 Next Steps:
echo   1. Review VERCEL_SETUP_GUIDE.md
echo   2. Push to GitHub: git push origin main
echo   3. Go to https://vercel.com and import your repository
echo   4. Or use: npm i -g vercel ^&^& vercel
echo.
echo 📊 Test locally before deploying:
echo   cd frontend ^&^& npm run dev
echo.
pause
