# 🔒 Security Guidelines

## API Keys Management

### ⚠️ IMPORTANT: Never Commit API Keys to GitHub

This project uses sensitive API keys that should **NEVER** be committed to version control.

### Protected Files

The following files contain sensitive information and are excluded from Git:

```
.env
.env.local
.env.development.local
.env.test.local
.env.production.local
backend/.env
frontend/.env.local
```

These files are listed in `.gitignore` and will not be tracked by Git.

### Setting Up API Keys Locally

1. **Copy the example file:**
```bash
cp .env.example .env
```

2. **Add your API keys:**

**Backend** (`backend/.env`):
```env
PORT=5001
NODE_ENV=development
```

**Frontend** (`frontend/.env.local`):
```env
NEXT_PUBLIC_API_URL=http://localhost:5001/api/v1
NEXT_PUBLIC_APP_NAME=Uppal Kalan Street Food Guide
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_actual_google_maps_key_here
NEXT_PUBLIC_GEMINI_API_KEY=your_actual_gemini_key_here
```

3. **Never share these files** or commit them to Git

### Required API Keys

#### 1. Google Maps API Key
- **Purpose**: Display interactive maps and location markers
- **Get it from**: [Google Cloud Console](https://console.cloud.google.com/)
- **Required APIs**: Maps JavaScript API
- **Environment Variable**: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

#### 2. Gemini AI API Key
- **Purpose**: Power intelligent restaurant recommendations
- **Get it from**: [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Environment Variable**: `NEXT_PUBLIC_GEMINI_API_KEY`

### Deployment Security

#### Vercel (Frontend)
1. Go to your project settings
2. Navigate to "Environment Variables"
3. Add each variable:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
   - `NEXT_PUBLIC_GEMINI_API_KEY`
4. Deploy

#### Railway/Render (Backend)
1. Go to your project settings
2. Navigate to "Environment Variables" or "Environment"
3. Add:
   - `PORT=5001`
   - `NODE_ENV=production`
4. Deploy

### API Key Restrictions

#### Google Maps API
Restrict your API key to prevent unauthorized use:

1. **Application restrictions**:
   - HTTP referrers (websites)
   - Add your domains: `yourdomain.com/*`, `*.yourdomain.com/*`

2. **API restrictions**:
   - Restrict key to: Maps JavaScript API

#### Gemini AI API
Monitor usage and set quotas:

1. Check usage in [Google AI Studio](https://makersuite.google.com/)
2. Set daily quotas if needed
3. Monitor for unusual activity

### Best Practices

✅ **DO:**
- Use `.env.example` as a template
- Keep API keys in environment variables
- Use different keys for development and production
- Rotate keys periodically
- Monitor API usage
- Set up billing alerts
- Restrict API keys to specific domains/IPs

❌ **DON'T:**
- Commit `.env` files to Git
- Share API keys in chat, email, or screenshots
- Use production keys in development
- Hardcode API keys in source code
- Push keys to public repositories
- Leave keys unrestricted

### Checking for Exposed Keys

Before committing, verify no keys are exposed:

```bash
# Search for potential API keys in tracked files
git grep -i "api.*key"
git grep -i "AIza"

# Check what will be committed
git status
git diff --cached
```

### If You Accidentally Commit a Key

1. **Immediately revoke the key** in the respective console
2. **Generate a new key**
3. **Remove from Git history**:
```bash
# Remove file from Git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch path/to/file" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (use with caution)
git push origin --force --all
```

4. **Update `.gitignore`** to prevent future commits
5. **Notify team members** to pull latest changes

### Environment Variables Checklist

Before deploying, ensure:

- [ ] All API keys are in environment variables
- [ ] `.env` files are in `.gitignore`
- [ ] `.env.example` is updated (without real keys)
- [ ] Production keys are different from development
- [ ] API keys have proper restrictions
- [ ] Deployment platform has all required variables
- [ ] No keys are hardcoded in source files

### Reporting Security Issues

If you discover a security vulnerability:

1. **DO NOT** open a public issue
2. Email the maintainers directly
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### Additional Security Measures

#### Rate Limiting
The backend implements rate limiting:
- 100 requests per 15 minutes per IP
- Prevents API abuse
- Protects against DDoS

#### CORS Configuration
- Restricts API access to allowed origins
- Configured in `backend/server.js`
- Update for production domains

#### HTTPS
- Always use HTTPS in production
- Vercel and Railway provide HTTPS by default
- Never send API keys over HTTP

#### Content Security Policy
Consider adding CSP headers:
```javascript
// In next.config.js
const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on'
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload'
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff'
  }
];
```

### Monitoring

Set up monitoring for:
- API usage and costs
- Unusual traffic patterns
- Failed authentication attempts
- Error rates

### Resources

- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
- [Google Cloud Security Best Practices](https://cloud.google.com/security/best-practices)
- [Next.js Security Headers](https://nextjs.org/docs/advanced-features/security-headers)

---

**Remember**: Security is everyone's responsibility. When in doubt, ask!
