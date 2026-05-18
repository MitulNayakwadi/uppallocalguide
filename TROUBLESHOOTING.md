# 🔧 Common Vercel Deployment Issues & Solutions

## Build Issues

### ❌ "Cannot find module"

**Symptoms**: Build fails with module not found error

**Solutions**:
1. Ensure all dependencies are in `frontend/package.json`:
   ```bash
   cd frontend && npm install [missing-package]
   ```

2. Check imports use correct paths:
   ```typescript
   // ✅ Correct
   import { getAllRestaurants } from '@/lib/dataService';
   
   // ❌ Wrong
   import { getAllRestaurants } from '../lib/dataService';
   ```

3. Clear cache and reinstall:
   ```bash
   rm -rf node_modules frontend/node_modules
   rm package-lock.json frontend/package-lock.json
   npm install && cd frontend && npm install
   ```

---

### ❌ "Build command exited with code 1"

**Symptoms**: Build succeeds locally but fails on Vercel

**Solutions**:
1. Check `vercel.json` build command:
   ```json
   {
     "buildCommand": "cd frontend && npm run build"
   }
   ```

2. Verify `next.config.js` has no errors:
   ```bash
   cd frontend && npm run build
   ```

3. Check environment variables are set correctly in Vercel Dashboard

---

## API Route Issues

### ❌ "Cannot GET /api/v1/restaurants"

**Symptoms**: API returns 404 error

**Solutions**:
1. Verify route file exists:
   ```bash
   ls frontend/src/app/api/v1/restaurants/route.ts
   ```

2. Check handler is exported:
   ```typescript
   // ✅ Correct
   export async function GET(request: NextRequest) {
     return NextResponse.json(data);
   }
   
   // ❌ Wrong
   async function GET(request: NextRequest) {
     return NextResponse.json(data);
   }
   ```

3. Verify route naming:
   - `/api/v1/restaurants` → `src/app/api/v1/restaurants/route.ts`
   - `/api/v1/restaurants/[id]` → `src/app/api/v1/restaurants/[id]/route.ts`
   - `/api/v1/restaurants/area/[area]` → `src/app/api/v1/restaurants/area/[area]/route.ts`

---

### ❌ "CORS Error in Browser"

**Symptoms**: Fetch fails with CORS error

**Solutions**:
1. Check middleware is applied:
   ```typescript
   // frontend/src/middleware.ts should exist
   export function middleware(request: NextRequest) {
     // CORS headers setup
   }
   ```

2. Verify CORS headers in route:
   ```typescript
   const corsHeaders = {
     'Access-Control-Allow-Origin': '*',
     'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
     'Access-Control-Allow-Headers': 'Content-Type',
   };
   ```

3. Add OPTIONS handler:
   ```typescript
   export async function OPTIONS() {
     return NextResponse.json({}, { headers: corsHeaders });
   }
   ```

---

### ❌ API Returns 500 Error

**Symptoms**: Server error when calling API

**Solutions**:
1. Check Vercel logs:
   ```bash
   vercel logs --follow
   ```

2. Review data file access:
   ```typescript
   // Verify data/ directory exists
   const dataPath = path.join(process.cwd(), 'data', 'restaurants.json');
   ```

3. Check data file is committed to git:
   ```bash
   git status data/
   ```

4. Verify JSON file is valid:
   ```bash
   node -e "console.log(JSON.parse(require('fs').readFileSync('data/restaurants.json')))"
   ```

---

## Data Loading Issues

### ❌ "Data not loading" or "Empty results"

**Symptoms**: API returns empty data array

**Solutions**:
1. Verify data files exist:
   ```bash
   ls -la data/
   # Should show: restaurants.json, cuisines.json, areas.json
   ```

2. Check data is committed to git:
   ```bash
   git add data/
   git commit -m "Add data files"
   git push
   ```

3. Verify paths are correct in `dataService.ts`:
   ```typescript
   const dataPath = path.join(process.cwd(), 'data', 'restaurants.json');
   // ✅ Correct - relative to project root
   
   const dataPath = path.join(__dirname, '../../data/restaurants.json');
   // ❌ Wrong - __dirname not available in Next.js
   ```

4. Check JSON files are not in .gitignore:
   ```bash
   cat .gitignore
   # Should NOT have: data/
   ```

---

## Environment Variable Issues

### ❌ "process.env undefined"

**Symptoms**: Environment variables not loading

**Solutions**:
1. Use `NEXT_PUBLIC_` prefix for client-side:
   ```typescript
   // ✅ Correct - available on client
   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
   
   // ❌ Wrong - not available on client
   const apiUrl = process.env.SECRET_KEY;
   ```

2. Redeploy after adding variables:
   ```bash
   vercel redeploy
   ```

3. Verify variables are set in Vercel:
   - Dashboard → Project → Settings → Environment Variables

---

### ❌ "NEXT_PUBLIC_API_URL not working"

**Symptoms**: Frontend can't reach API

**Solutions**:
1. Leave empty on Vercel for relative URLs:
   ```bash
   NEXT_PUBLIC_API_URL=   # Leave empty
   ```

2. Or set to backend URL if separate:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-backend.railway.app/api/v1
   ```

3. Update API client to handle empty URL:
   ```typescript
   const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api/v1';
   ```

---

## Deployment Issues

### ❌ "Deployment Stuck"

**Symptoms**: Deployment hangs or takes too long

**Solutions**:
1. Check if build is slow:
   ```bash
   npm run build -- --debug
   ```

2. Cancel and redeploy:
   ```bash
   vercel redeploy --force
   ```

3. Check Vercel status: https://www.vercel-status.com/

---

### ❌ "Function Timeout"

**Symptoms**: API returns 504 Gateway Timeout

**Solutions**:
1. Add timeout configuration:
   ```typescript
   export const config = {
     maxDuration: 60,  // 60 seconds
   };
   ```

2. Optimize data loading:
   ```typescript
   // Cache data to avoid file reads
   let cachedData = null;
   
   function loadData() {
     if (cachedData) return cachedData;
     // Load from file...
     return cachedData;
   }
   ```

---

## Performance Issues

### ⚠️ "Slow API responses"

**Solutions**:
1. Enable response caching:
   ```typescript
   export const revalidate = 3600; // Cache for 1 hour
   ```

2. Add caching headers:
   ```typescript
   response.headers.set('Cache-Control', 'public, s-maxage=3600');
   ```

3. Check data file size:
   ```bash
   du -sh data/
   ```

---

## Database/Data Issues

### ❌ "Database connection failed"

**Symptoms**: Can't connect to MongoDB/PostgreSQL

**Solutions** (if upgrading from JSON):
1. For MongoDB:
   ```typescript
   import { MongoClient } from 'mongodb';
   
   const client = new MongoClient(process.env.MONGODB_URI);
   ```

2. For PostgreSQL/Supabase:
   ```typescript
   import { createClient } from '@supabase/supabase-js';
   
   const supabase = createClient(
     process.env.SUPABASE_URL,
     process.env.SUPABASE_KEY
   );
   ```

3. Store connection string in Vercel secrets, not in code

---

## Testing & Debugging

### 🧪 Test Locally First

```bash
# 1. Install dependencies
npm run install:all

# 2. Build production version
npm run build

# 3. Start production server
cd frontend && npm start

# 4. Test API endpoints
curl http://localhost:3000/api/v1/restaurants

# 5. Check for errors in console
```

### 📊 Check Vercel Logs

```bash
# Real-time logs
vercel logs --follow

# Logs for specific deployment
vercel logs [deployment-url]

# Build logs
vercel logs --follow -- --build
```

### 🔍 Debug in Browser

```javascript
// Open DevTools Console (F12)

// Test API
fetch('/api/v1/restaurants')
  .then(r => r.json())
  .then(d => console.log(d))
  .catch(e => console.error(e));

// Check environment
console.log(process.env);
```

---

## Common Mistakes

| ❌ Mistake | ✅ Solution |
|-----------|-----------|
| API route not exported | `export async function GET() {}` |
| Wrong path to data files | Use `process.cwd()` not `__dirname` |
| Data files not in git | `git add data/` |
| CORS headers missing | Add `corsHeaders` to response |
| Environment vars without NEXT_PUBLIC_ | Use prefix for client-side vars |
| Relative imports with ../ | Use `@/` alias instead |
| .env file in git | Add to .gitignore |
| Function timeout too short | Increase with `export const maxDuration = 60` |

---

## Getting Help

1. **Check Vercel Logs**: `vercel logs --follow`
2. **Review Documentation**: [VERCEL_PRODUCTION_GUIDE.md](../VERCEL_PRODUCTION_GUIDE.md)
3. **Test Locally**: Ensure everything works locally first
4. **Search Issues**: [Vercel GitHub Issues](https://github.com/vercel/vercel/issues)
5. **Contact Support**: [Vercel Support](https://vercel.com/support)

---

## Quick Fixes

```bash
# Clear everything and start fresh
rm -rf .vercel node_modules frontend/node_modules
npm install && cd frontend && npm install

# Rebuild locally
npm run build

# Redeploy to Vercel
vercel --prod --force

# Check for errors
vercel logs --follow
```

---

**Still stuck? Check [VERCEL_PRODUCTION_GUIDE.md](../VERCEL_PRODUCTION_GUIDE.md) for more help!**
