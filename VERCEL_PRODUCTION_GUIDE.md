# 🚀 Advanced Vercel Production Guide

## Architecture Overview

Your Uppal Local Guide uses a **Next.js monolithic architecture** with:
- **Frontend**: Next.js 16.1 with React 19
- **Backend**: Integrated API routes (no separate server needed)
- **Data**: Static JSON files cached in memory
- **Deployment**: Single Vercel deployment

## Production Deployment

### Domain Configuration

1. **Add Custom Domain** (in Vercel Dashboard):
   - Project Settings → Domains
   - Add your custom domain (e.g., `uppal-guide.com`)
   - Follow DNS setup instructions
   - SSL/TLS is automatic

### Performance Optimization

#### Caching Strategy

```typescript
// Already implemented in API routes
// Static data is cached in memory for 0ms latency
```

**Configure Vercel Caching**:
```json
// vercel.json
{
  "crons": [{
    "path": "/api/v1/restaurants",
    "schedule": "0 0 * * *"
  }]
}
```

#### Image Optimization

Already configured in `next.config.js`:
- Automatic image optimization
- WebP format support
- Responsive images
- CDN delivery

#### Edge Caching

Add to API routes for better performance:

```typescript
// In your route handler
export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  });
}
```

### Security Best Practices

#### Environment Variables

✅ **Already configured**:
- No sensitive data in client code
- `NEXT_PUBLIC_` prefix only for public variables
- Secrets stored in Vercel Secrets

**Production Security Checklist**:
- [ ] HTTPS enforced (automatic)
- [ ] CORS configured for trusted origins only
- [ ] Rate limiting enabled
- [ ] No API keys exposed client-side
- [ ] Data validation on all endpoints
- [ ] Error messages don't leak sensitive info

#### CORS Configuration

**Current (permissive for development)**:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
};
```

**For Production (restrict to your domain)**:
```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://uppal-guide.com',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
```

### Monitoring & Analytics

#### Vercel Analytics

Built-in analytics available:
- Project Dashboard → Analytics
- Performance metrics
- Error tracking
- Visitor insights

#### Web Vitals

Automatically tracked:
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Cumulative Layout Shift (CLS)
- Time to First Byte (TTFB)

#### Error Tracking

Enable with Sentry (optional):

```bash
npm install @sentry/nextjs
```

### Database Upgrade (Optional)

**Current**: Static JSON files (great for MVP)

**For scaling, consider**:

1. **MongoDB Atlas**:
   ```typescript
   // Install: npm install mongodb
   const { MongoClient } = require('mongodb');
   const client = new MongoClient(process.env.MONGODB_URI);
   ```

2. **Supabase (PostgreSQL)**:
   ```typescript
   // Install: npm install @supabase/supabase-js
   import { createClient } from '@supabase/supabase-js';
   ```

3. **Firebase**:
   ```typescript
   // Install: npm install firebase
   import { initializeApp } from 'firebase/app';
   ```

### CI/CD Pipeline

Vercel automatically handles:
- ✅ Preview deployments on PR
- ✅ Production deployment on merge to main
- ✅ Automatic rollbacks
- ✅ Edge deployment at 250+ data centers

**Recommended Git Workflow**:
```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "Add new feature"

# Push to create PR
git push origin feature/new-feature

# PR created → Vercel automatically deploys preview
# Review → Merge to main → Vercel deploys to production
```

### Serverless Functions

Your API routes automatically become serverless functions on Vercel:

**Benefits**:
- Auto-scaling
- Pay only for what you use
- Global distribution
- Cold start optimization (< 50ms)

**Limits to be aware of**:
- Request timeout: 60 seconds (Pro: 900s)
- Maximum response size: 6MB
- Memory: 512MB (Pro: 3GB)

### Performance Tips

1. **Reduce API response size**:
   ```typescript
   // Implement pagination
   const limit = Math.min(parseInt(limit), 100);
   ```

2. **Cache strategies**:
   - Data routes: Cache for 1-24 hours
   - Dynamic routes: Cache for 1 minute or disable
   - Static assets: Cache for 1 year

3. **Compression**:
   - Already enabled in `next.config.js`
   - Gzip compression on Vercel

4. **Bundle analysis**:
   ```bash
   npm install -D @next/bundle-analyzer
   # Add to next.config.js
   ```

### Rollback & Rollforward

**In Vercel Dashboard**:
1. Deployments → Select deployment
2. Click "Redeploy" to rollback
3. Or click "Promote to Production"

### Scheduled Jobs (Crons)

Pre-configured in `vercel.json`:

```json
{
  "crons": [{
    "path": "/api/cron/cleanup",
    "schedule": "0 0 * * *"
  }]
}
```

**Implement cron handler**:
```typescript
// frontend/src/app/api/cron/cleanup/route.ts
export async function POST(request: NextRequest) {
  // Verify Vercel webhook secret
  if (request.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Run cleanup tasks
  return NextResponse.json({ success: true });
}
```

### Cost Optimization

**Free tier includes**:
- 1 GB serverless function execution/month
- 100 GB bandwidth
- Unlimited deployments
- 25 hours of build time

**Reduce costs**:
- Cache static data aggressively
- Use ISR (Incremental Static Regeneration)
- Compress images automatically
- Minimize external API calls

## Troubleshooting Production Issues

### White Screen of Death

1. Check Vercel logs: `vercel logs --follow`
2. Check browser console (F12)
3. Review environment variables set in Vercel
4. Verify Next.js build: `npm run build` locally

### Slow API Responses

1. Add caching headers
2. Check data file size
3. Implement pagination
4. Use Vercel Analytics to identify slow endpoints

### Data Not Loading

1. Verify `data/` directory is committed to git
2. Check file paths are relative to project root
3. Verify permissions: `ls -la data/`
4. Check logs for file read errors

### CORS Errors in Production

1. Update `CORS_ORIGIN` in production headers
2. Add your domain to allowed origins
3. Verify middleware is applied to API routes
4. Check browser DevTools Network tab

## Disaster Recovery

1. **Automatic backups**: Vercel keeps deployment history
2. **Rollback**: One-click rollback to any previous deployment
3. **Git history**: Always have full code history in GitHub

## Support Resources

- [Vercel Status Page](https://www.vercel-status.com/)
- [Vercel Support](https://vercel.com/support)
- [Next.js Discord](https://discord.gg/nextjs)
- [Vercel Community](https://github.com/vercel/vercel/discussions)

---

**Last Updated**: May 2026
**Status**: Production Ready ✅
