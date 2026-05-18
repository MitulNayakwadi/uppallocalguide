# ⚡ Quick Setup Guide

Get the Uppal Kalan Street Food Guide running in 5 minutes!

## 📋 Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- Git installed
- A code editor (VS Code recommended)

## 🚀 Setup Steps

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/uppal-local-guide.git
cd uppal-local-guide
```

### 2. Install Dependencies

```bash
npm run install:all
```

This installs dependencies for:
- Root project
- Frontend (Next.js)
- Backend (Express)

### 3. Get API Keys

#### Google Maps API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project (or select existing)
3. Enable **Maps JavaScript API**
4. Go to Credentials → Create Credentials → API Key
5. Copy the API key

#### Gemini AI API Key
1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the API key

### 4. Configure Environment Variables

#### Backend Configuration

Create `backend/.env`:
```bash
cd backend
echo "PORT=5001" > .env
echo "NODE_ENV=development" >> .env
cd ..
```

#### Frontend Configuration

Create `frontend/.env.local`:
```bash
cd frontend
cat > .env.local << EOL
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
NEXT_PUBLIC_APP_NAME=Uppal Kalan Street Food Guide
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=YOUR_GOOGLE_MAPS_KEY_HERE
NEXT_PUBLIC_GEMINI_API_KEY=YOUR_GEMINI_KEY_HERE
EOL
cd ..
```

**Replace** `YOUR_GOOGLE_MAPS_KEY_HERE` and `YOUR_GEMINI_KEY_HERE` with your actual keys!

### 5. Start the Application

```bash
npm run dev
```

This starts:
- ✅ Backend API on http://localhost:5001
- ✅ Frontend on http://localhost:3000

### 6. Open in Browser

Navigate to: **http://localhost:3000**

## ✨ Test the Features

### 1. AI Recommendations
Try these queries:
- "I want spicy biryani under ₹200"
- "Best vegetarian breakfast options"
- "Family-friendly restaurant with parking"

### 2. Search & Filter
- Adjust the budget slider
- Select different times (breakfast, lunch, evening)
- Choose cuisine types

### 3. Quick Searches
Click the preset buttons:
- 🥟 Cheap Eats
- 🍛 Lunch Biryani
- 🌅 Breakfast Special
- 🌆 Evening Snacks

## 🐛 Troubleshooting

### Backend won't start?
```bash
# Check if port 5001 is available
netstat -ano | findstr :5001

# Kill process if needed (Windows)
taskkill /PID <PID> /F

# Or use a different port in backend/.env
PORT=5002
```

### Frontend won't start?
```bash
# Check if port 3000 is available
netstat -ano | findstr :3000

# Clear Next.js cache
cd frontend
rm -rf .next
npm run dev
```

### API Keys not working?

**Google Maps:**
- Verify Maps JavaScript API is enabled
- Check API key restrictions
- Ensure billing is enabled (free tier available)

**Gemini AI:**
- Verify API key is active
- Check quota limits
- Ensure you're using the correct key format

### "Cannot connect to server" error?
1. Ensure backend is running (check terminal)
2. Verify `NEXT_PUBLIC_API_URL` in `frontend/.env.local`
3. Check backend logs for errors

### Environment variables not loading?
1. Restart the development servers
2. Verify file names:
   - `backend/.env` (not `.env.local`)
   - `frontend/.env.local` (not `.env`)
3. Check for typos in variable names

## 📁 Project Structure

```
uppal-local-guide/
├── frontend/           # Next.js app (port 3000)
│   ├── src/
│   │   ├── app/       # Pages
│   │   └── components/ # React components
│   └── .env.local     # Frontend config (create this!)
│
├── backend/           # Express API (port 5001)
│   ├── routes/       # API endpoints
│   ├── controllers/  # Business logic
│   └── .env          # Backend config (create this!)
│
└── data/             # Restaurant data
    └── restaurants.json
```

## 🎯 Next Steps

1. **Explore the code**:
   - Check `frontend/src/app/page.tsx` for main UI
   - Look at `backend/routes/` for API endpoints
   - Review `data/restaurants.json` for data structure

2. **Add more restaurants**:
   - Edit `data/restaurants.json`
   - Follow the existing format
   - Restart backend to load new data

3. **Customize styling**:
   - Edit Tailwind classes in components
   - Modify `frontend/src/app/globals.css`

4. **Deploy**:
   - See [README.md](./README.md) for deployment instructions
   - Frontend → Vercel
   - Backend → Railway or Render

## 📚 Documentation

- [Full README](./README.md) - Complete documentation
- [Security Guide](./SECURITY.md) - API key management
- [API Standards](./.kiro/steering/api-standards.md) - API documentation

## 💡 Tips

- **Hot Reload**: Both frontend and backend support hot reload
- **Console Logs**: Check browser console (F12) for frontend errors
- **Backend Logs**: Check terminal where backend is running
- **API Testing**: Use http://localhost:5001/health to test backend

## 🎉 You're Ready!

Your Uppal Kalan Street Food Guide is now running locally!

Try asking the AI: "I want authentic Telangana food under ₹150" and see the magic happen! ✨

---

**Need help?** Open an issue on GitHub or check the [README](./README.md) for more details.
