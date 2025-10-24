# Quick Start Guide

Get your portfolio up and running in 5 minutes!

## 🚀 Quick Setup

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment
Create a `.env.local` file:
```env
MONGODB_URI=mongodb://localhost:27017/portfolio
JWT_SECRET=your-super-secret-key-123456
```

### 3. Run Development Server
```bash
npm run dev
```

### 4. Access Your Portfolio
- **Portfolio**: http://localhost:3000
- **Admin Panel**: http://localhost:3000/admin

### 5. Admin Login
- **Email**: jiteshbawaskar05@gmail.com
- **Password**: admin123

## ✨ First Steps

1. **Log into Admin Panel**
   - Go to http://localhost:3000/admin
   - Use default credentials

2. **Update Your Information**
   - Click "Bio" tab
   - Update name, title, bio
   - Save changes

3. **View Your Portfolio**
   - Go to http://localhost:3000
   - See your changes live!

## 📦 What's Included

- ✅ 11 Pre-loaded Projects
- ✅ 2 Work Experiences
- ✅ 6+ Achievements
- ✅ 6 Skill Categories
- ✅ 3 Certifications
- ✅ 8+ Social Media Links
- ✅ Complete Admin Dashboard

## 🎨 Customization

### Change Colors
Edit `tailwind.config.ts`:
```typescript
colors: {
  primary: {
    500: '#0ea5e9', // Your color here
  }
}
```

### Update Content
1. Use Admin Panel (recommended)
2. Or edit `lib/data/initialData.ts`

### Add Projects
1. Login to admin
2. Go to "Projects" tab
3. Click "Add New Project"
4. Fill in details
5. Save!

## 🌐 Deploy to Vercel

```bash
# 1. Push to GitHub
git add .
git commit -m "My portfolio"
git push

# 2. Go to vercel.com
# 3. Import your repo
# 4. Add environment variables
# 5. Deploy!
```

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🔧 Common Commands

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start           # Start production server

# Admin Panel (Different Port)
npm run admin       # Run on port 3001

# Linting
npm run lint        # Check code quality
```

## 📚 Documentation

- **README.md** - Full documentation
- **DEPLOYMENT.md** - Deployment guide
- **FEATURES.md** - Feature list

## 🆘 Need Help?

### Portfolio Not Loading?
1. Check if dev server is running
2. Visit http://localhost:3000
3. Check console for errors

### Admin Panel Issues?
1. Clear browser cookies
2. Check .env.local file exists
3. Restart dev server

### Database Issues?
1. MongoDB must be running
2. Check MONGODB_URI in .env.local
3. Try with initial data (works without DB)

## 💡 Pro Tips

1. **Use MongoDB Atlas** for cloud database (free tier available)
2. **Change admin password** after first login
3. **Regular commits** to track changes
4. **Test locally** before deploying
5. **Use admin panel** for content updates

## 🎯 Next Steps

1. ✅ Portfolio running locally
2. ⬜ Customize your content
3. ⬜ Add your projects
4. ⬜ Update your bio
5. ⬜ Deploy to Vercel
6. ⬜ Share with world!

---

**You're all set! Start building your amazing portfolio! 🚀**

For questions: jiteshbawaskar05@gmail.com

