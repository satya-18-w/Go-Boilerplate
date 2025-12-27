# Sevalla Deployment Guide

## Quick Deployment Checklist

### Backend Service Configuration

1. **Create Web Service** on Sevalla
   - Name: `todotasker-backend`
   - Root Directory: `backend`
   - Build Command: Auto-detected (uses `backend/nixpacks.toml`)

2. **Set Environment Variables:**

```bash
# Primary
TASKER_PRIMARY.ENV=production

# Server
TASKER_SERVER.PORT=8080
TASKER_SERVER.READ_TIMEOUT=30
TASKER_SERVER.WRITE_TIMEOUT=30
TASKER_SERVER.IDLE_TIMEOUT=60
TASKER_SERVER.CORS_ALLOWED_ORIGINS=https://YOUR_FRONTEND_URL.sevalla.app

# Database (Sevalla will provide these)
TASKER_DATABASE.HOST=your-db-host
TASKER_DATABASE.PORT=5432
TASKER_DATABASE.USER=your-db-user
TASKER_DATABASE.PASSWORD=your-db-password
TASKER_DATABASE.NAME=TODO_TASKER
TASKER_DATABASE.SSL_MODE=disable
TASKER_DATABASE.MAX_OPEN_CONNS=25
TASKER_DATABASE.MAX_IDLE_CONNS=25
TASKER_DATABASE.CONN_MAX_LIFETIME=300
TASKER_DATABASE.CONN_MAX_IDLE_TIME=300

# Authentication (Clerk)
TASKER_AUTH.SECRET_KEY=your_clerk_secret_key

# Redis (Sevalla will provide these)
TASKER_REDIS.ADDRESS=your-redis-host:6379
TASKER_REDIS.PASSWORD=your-redis-password
TASKER_REDIS.DB=0

# AWS S3 / Cloudflare R2
TASKER_AWS.REGION=auto
TASKER_AWS.ACCESS_KEY_ID=your_access_key
TASKER_AWS.SECRET_ACCESS_KEY=your_secret_key
TASKER_AWS.UPLOAD_BUCKET=your_bucket_name
TASKER_AWS.ENDPOINT_URL=your_r2_endpoint_url

# Email (Resend)
TASKER_INTEGRATION.RESEND_API_KEY=your_resend_api_key
TASKER_INTEGRATION.SENDER_EMAIL=notifications@yourdomain.com

# Observability (Required)
TASKER_OBSERVABILITY.SERVICE_NAME=tasker
TASKER_OBSERVABILITY.ENVIRONMENT=production
TASKER_OBSERVABILITY.LOGGING.LEVEL=info
TASKER_OBSERVABILITY.LOGGING.FORMAT=json
TASKER_OBSERVABILITY.LOGGING.SLOW_QUERY_THRESHOLD=100ms
TASKER_OBSERVABILITY.HEALTH_CHECKS.ENABLED=true
TASKER_OBSERVABILITY.HEALTH_CHECKS.INTERVAL=30s
TASKER_OBSERVABILITY.HEALTH_CHECKS.TIMEOUT=5s
TASKER_OBSERVABILITY.HEALTH_CHECKS.CHECKS=database,redis

# New Relic (Optional - can be left empty if not using)
TASKER_OBSERVABILITY.NEW_RELIC.LICENSE_KEY=
TASKER_OBSERVABILITY.NEW_RELIC.APP_LOG_FORWARDING_ENABLED=false
TASKER_OBSERVABILITY.NEW_RELIC.DISTRIBUTED_TRACING_ENABLED=false
TASKER_OBSERVABILITY.NEW_RELIC.DEBUG_LOGGING=false
```

3. **Deploy Backend**

---

### Frontend Service Configuration

1. **Create Static Site** on Sevalla
   - Name: `todotasker-frontend`
   - Root Directory: `.` (root of repo)
   - Build Command: Auto-detected (uses root `nixpacks.toml`)

2. **Set Environment Variables** (CRITICAL - Must be set BEFORE build):

```bash
VITE_API_URL=https://YOUR_BACKEND_URL.sevalla.app
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_ENV=production
NODE_ENV=production
```

3. **Deploy Frontend**

---

## Critical Notes

### ⚠️ CORS Configuration
The backend `TASKER_SERVER.CORS_ALLOWED_ORIGINS` **MUST** match your frontend URL exactly:
- ✅ Correct: `https://todotasker-vzoki.sevalla.app`
- ❌ Wrong: `https://todotasker-vzoki.sevalla.app/` (no trailing slash)
- ❌ Wrong: `http://todotasker-vzoki.sevalla.app` (must use https)

### ⚠️ Frontend Environment Variables
Frontend environment variables are **bundled at build time**. If you change them:
1. Update in Sevalla dashboard
2. **Redeploy/Rebuild** the frontend (not just restart)

### ⚠️ Database & Redis
Sevalla provides managed PostgreSQL and Redis:
1. Add PostgreSQL addon to backend service
2. Add Redis addon to backend service
3. Sevalla will automatically set connection environment variables

---

## Verification Steps

### 1. Backend Health Check
```bash
curl https://YOUR_BACKEND_URL.sevalla.app/api/status
```

Expected response:
```json
{
  "status": "healthy",
  "timestamp": "...",
  "environment": "production",
  "checks": {
    "database": { "status": "healthy", "response_time": "..." },
    "redis": { "status": "healthy", "response_time": "..." }
  }
}
```

### 2. Frontend API Connection
1. Open browser dev tools (F12)
2. Go to Network tab
3. Try creating a task
4. Verify request goes to `https://YOUR_BACKEND_URL.sevalla.app/api/v1/todos`
5. Check for CORS errors in console

---

## Common Issues & Solutions

### "Failed to create task"
**Cause**: Frontend is using wrong API URL (likely localhost)
**Solution**: 
1. Set `VITE_API_URL` in Sevalla frontend environment variables
2. Redeploy frontend

### CORS Error in Browser
**Cause**: Backend CORS not configured for frontend URL
**Solution**: 
1. Set `TASKER_SERVER.CORS_ALLOWED_ORIGINS` to your frontend URL
2. Redeploy backend

### 500 Internal Server Error
**Cause**: Missing or invalid environment variables
**Solution**: 
1. Check backend logs in Sevalla dashboard
2. Verify all required environment variables are set
3. Verify database and Redis connections

### "Config validation failed"
**Cause**: Missing required environment variables
**Solution**: 
1. Copy ALL environment variables from the list above
2. Replace placeholder values with actual credentials
3. Redeploy

---

## Environment Variable Reference

### Required for Backend
- All `TASKER_PRIMARY.*`
- All `TASKER_SERVER.*`
- All `TASKER_DATABASE.*`
- All `TASKER_AUTH.*`
- All `TASKER_REDIS.*`
- All `TASKER_AWS.*`
- All `TASKER_INTEGRATION.*`
- All `TASKER_OBSERVABILITY.*` (except NEW_RELIC which is optional)

### Required for Frontend
- `VITE_API_URL` (your backend URL)
- `VITE_CLERK_PUBLISHABLE_KEY`
- `VITE_ENV=production`

---

## Quick Fix Commands

If deployed app is not working, check these in order:

1. **Verify backend is running:**
   ```bash
   curl https://YOUR_BACKEND_URL.sevalla.app/api/status
   ```

2. **Check frontend environment:**
   - Open browser console on your frontend
   - Type: `import.meta.env.VITE_API_URL`
   - Should show your backend URL, not localhost

3. **Check CORS:**
   - Open browser dev tools → Network tab
   - Try creating a task
   - Look for CORS error in console
   - Verify backend CORS matches frontend URL

4. **If nothing works:**
   - Redeploy backend after verifying ALL environment variables
   - Redeploy frontend after verifying VITE variables
   - Clear browser cache
