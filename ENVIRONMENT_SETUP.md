# Environment Variables Setup

This guide helps you set up the required environment variables for your portfolio.

## 📋 Required Variables

You need to create a `.env.local` file in the root directory with the following variables:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-secret-key
```

---

## 🗄️ MongoDB URI

### Option 1: MongoDB Atlas (Recommended for Production)

**Step-by-step:**

1. **Create Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Sign up for free account

2. **Create Cluster**
   - Click "Create" → "Shared" (Free tier M0)
   - Choose cloud provider and region (nearest to you)
   - Click "Create Cluster" (takes 2-3 minutes)

3. **Set Up Database Access**
   - Go to "Database Access" in left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - User Privileges: "Atlas admin" or "Read and write to any database"
   - Click "Add User"

4. **Set Up Network Access**
   - Go to "Network Access" in left sidebar
   - Click "Add IP Address"
   - For development: Click "Allow Access from Anywhere" (0.0.0.0/0)
   - For production: Add your specific IP addresses
   - Click "Confirm"

5. **Get Connection String**
   - Go to "Database" in left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - **Important**: Replace `<password>` with your actual password
   - **Important**: Replace `<dbname>` with `portfolio` (or your preferred name)

**Example:**
```env
MONGODB_URI=mongodb+srv://jitesh:MyPassword123@cluster0.abc123.mongodb.net/portfolio?retryWrites=true&w=majority
```

### Option 2: Local MongoDB (For Development)

**If you have MongoDB installed locally:**

```env
MONGODB_URI=mongodb://localhost:27017/portfolio
```

**To install MongoDB locally:**
- macOS: `brew install mongodb-community`
- Windows: Download from [mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Linux: Follow [docs.mongodb.com/manual/installation](https://docs.mongodb.com/manual/installation/)

---

## 🔐 JWT Secret

This is a secret key used to sign and verify authentication tokens.

### Generate a Strong Secret

**Option 1: Random String Generator**
```bash
# Using Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Online Generator**
- Visit [generate-secret.vercel.app/64](https://generate-secret.vercel.app/64)
- Copy the generated string

**Option 3: Manual**
Create a random string with at least 32 characters:
```env
JWT_SECRET=7f4a9c8b2e6d1f3a5b8c9e2d4f6a8b1c3e5f7a9b2c4d6e8f1a3b5c7d9e2f4a6b8c
```

⚠️ **Important**: Never share or commit your JWT_SECRET!

---

## 📝 Creating .env.local File

### Step 1: Create File

**Windows:**
```bash
# In project root directory
echo. > .env.local
```

**macOS/Linux:**
```bash
# In project root directory
touch .env.local
```

### Step 2: Add Content

Open `.env.local` in your text editor and add:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://your-username:your-password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

# JWT Secret
JWT_SECRET=your-generated-secret-key-here-minimum-32-characters

# Optional: For reference only
# Default admin login: jiteshbawaskar05@gmail.com
# Default password: admin123
```

### Step 3: Verify

Make sure:
- [ ] File is named exactly `.env.local`
- [ ] File is in project root directory (same level as package.json)
- [ ] No spaces around `=` signs
- [ ] MongoDB URI has password filled in
- [ ] JWT_SECRET is at least 32 characters
- [ ] File is NOT committed to git (already in .gitignore)

---

## 🚀 For Vercel Deployment

When deploying to Vercel, you'll add these as environment variables in the Vercel dashboard:

1. **Go to your project** on vercel.com
2. **Click "Settings"** → "Environment Variables"
3. **Add variables:**

```
Key: MONGODB_URI
Value: mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority

Key: JWT_SECRET
Value: your-secret-key-here
```

4. **Save** and redeploy

---

## 🔍 Troubleshooting

### MongoDB Connection Errors

**"MongoNetworkError"**
- ✅ Check IP is whitelisted in Network Access
- ✅ Verify username/password are correct
- ✅ Ensure no special characters in password need URL encoding

**"Authentication failed"**
- ✅ Double-check username and password
- ✅ Make sure database user has proper permissions
- ✅ Try recreating database user

**"ENOTFOUND cluster"**
- ✅ Check internet connection
- ✅ Verify connection string format
- ✅ Ensure cluster is running (not paused)

### JWT Errors

**"jwt malformed"**
- ✅ Check JWT_SECRET is set
- ✅ Restart development server after adding .env.local
- ✅ Clear browser cookies

**"jwt expired"**
- Normal behavior after 7 days
- Simply login again

### File Not Found

**".env.local not found"**
- ✅ File is in correct directory (project root)
- ✅ File name is exactly `.env.local` (with dot at start)
- ✅ Restart your development server

---

## 📊 Environment Variables by Environment

### Development (.env.local)
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=dev-secret-key-for-local-testing-only
```

### Production (Vercel)
```env
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/portfolio
JWT_SECRET=production-secure-random-key-very-long-and-secure
```

---

## 🔒 Security Best Practices

### ✅ Do:
- Use MongoDB Atlas for production
- Generate strong, random JWT secrets
- Use different secrets for dev/prod
- Rotate secrets periodically
- Restrict IP access in MongoDB
- Use environment-specific variables

### ❌ Don't:
- Commit .env files to git
- Share secrets publicly
- Use weak or default secrets
- Use same secrets across projects
- Hardcode secrets in code
- Share production credentials

---

## 📖 Quick Reference

### Minimum Setup
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=any-secret-key-minimum-32-characters-long
```

### Production Setup
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=securely-generated-random-64-character-string-here
```

---

## ✅ Checklist

Before running the app:
- [ ] `.env.local` file created
- [ ] MongoDB URI added and correct
- [ ] JWT_SECRET added (minimum 32 chars)
- [ ] MongoDB cluster created (if using Atlas)
- [ ] Database user created
- [ ] IP whitelisted
- [ ] Connection string password replaced
- [ ] No syntax errors in .env.local
- [ ] File in correct directory

---

## 🆘 Still Having Issues?

1. **Check server logs** for specific error messages
2. **Verify each step** above carefully
3. **Try default local** MongoDB first
4. **Contact**: jiteshbawaskar05@gmail.com

---

**Once set up, your environment is ready! Run `npm run dev` to start! 🚀**

