# Admin Panel Access Guide

## 🔐 Accessing Your Admin Panel

Your portfolio is live at: **https://jitesh-bawaskar-portfolioo.vercel.app/**

### Admin Panel URL
```
https://jitesh-bawaskar-portfolioo.vercel.app/admin
```

---

## 📍 Admin Routes

### Login Page
```
/admin
```
Login with your email and password

### Dashboard (After Login)
```
/admin/dashboard
```
Main dashboard with overview and quick links

### Manage Projects
```
/admin/dashboard/projects
```
Add, edit, delete projects and upload images

---

## 🔧 Setting Up Admin Account

### Option 1: Run the Create Admin Script

1. **Edit the credentials** in `scripts/create-admin.js`:
```javascript
const adminData = {
  email: 'your-email@example.com',  // Change this
  password: 'YourSecurePassword',    // Change this
  name: 'Your Name'
};
```

2. **Run the script:**
```bash
node scripts/create-admin.js
```

3. **Login** at: https://jitesh-bawaskar-portfolioo.vercel.app/admin

---

### Option 2: Manually Add to MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Sign in to your account
3. Navigate to your cluster: `twicky`
4. Click **"Browse Collections"**
5. Select database: `portfolio`
6. Select collection: `admins`
7. Click **"Insert Document"**
8. Add this document (replace values):

```json
{
  "email": "admin@jitesh.com",
  "password": "$2a$10$YourHashedPasswordHere",
  "name": "Jitesh Bawaskar",
  "createdAt": { "$date": "2025-10-25T00:00:00.000Z" }
}
```

**⚠️ Important:** Password must be bcrypt hashed!

---

## 🔑 Creating Hashed Password

### Using Node.js (Recommended)

1. Open terminal in your project
2. Run this command:
```bash
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('YourPassword', 10).then(hash => console.log(hash));"
```

3. Copy the hashed password
4. Use it in MongoDB Atlas

### Example:
```bash
# Hash the password "Admin@123"
node -e "const bcrypt = require('bcryptjs'); bcrypt.hash('Admin@123', 10).then(hash => console.log(hash));"
```

Output: `$2a$10$randomHashedStringHere`

---

## 📝 Default Credentials (If Using Script)

If you run the `create-admin.js` script without changes:

```
Email: admin@jitesh.com
Password: Admin@123
```

**⚠️ IMPORTANT:** Change these immediately after first login!

---

## 🎯 What You Can Do in Admin Panel

### ✅ Manage Projects
- Add new projects
- Edit existing projects
- Delete projects
- **Upload project images** (saved to MongoDB Atlas as Base64)
- Set featured projects
- Organize by categories

### ✅ Filter Projects
- View all projects
- Filter by category
- Edit project details

### ✅ Image Management
- Upload images (max 5MB)
- Use external URLs
- Use emojis as icons
- Images automatically displayed in portfolio

---

## 🚀 Quick Start Guide

### 1. Create Admin Account
```bash
# Edit credentials in scripts/create-admin.js first!
node scripts/create-admin.js
```

### 2. Login
Visit: https://jitesh-bawaskar-portfolioo.vercel.app/admin

### 3. Add Your First Project
1. Go to Dashboard
2. Click "Manage Projects"
3. Click "Add New Project"
4. Fill in details
5. Upload image (optional)
6. Save project

### 4. View Changes
Go to: https://jitesh-bawaskar-portfolioo.vercel.app/
Your project will appear immediately!

---

## 🔒 Security Tips

### ✅ Do's
- Use a strong password (12+ characters)
- Include uppercase, lowercase, numbers, symbols
- Change password regularly
- Keep credentials secure
- Use different password than other accounts

### ❌ Don'ts
- Don't share admin credentials
- Don't use simple passwords like "123456"
- Don't commit credentials to Git
- Don't store plain text passwords

---

## 🐛 Troubleshooting

### Can't Access Admin Panel?

**1. Check URL**
```
✅ Correct: /admin
❌ Wrong: /admin/
❌ Wrong: /Admin
```

**2. Check Credentials**
- Email must match exactly
- Password is case-sensitive
- No extra spaces

**3. Check MongoDB Connection**
- Verify MongoDB Atlas is accessible
- Check connection string in `.env.local`
- Ensure database has `admins` collection

**4. Clear Browser Cache**
```bash
# Try incognito/private mode
# Or clear cookies for your domain
```

### Login Keeps Failing?

**1. Verify Admin Exists in Database**
- Login to MongoDB Atlas
- Check `portfolio` database
- Look in `admins` collection
- Verify email and password hash exist

**2. Check Password Hash**
- Password must be bcrypt hashed
- Run create-admin script again
- Or manually hash password

**3. Check Console Errors**
- Open browser DevTools (F12)
- Go to Console tab
- Look for error messages

### "Unauthorized" Error?

**1. Session Expired**
- Login again
- Sessions last 24 hours

**2. Token Invalid**
- Clear cookies
- Login again

---

## 📊 Admin Panel Features

### Dashboard
- Quick stats overview
- Recent activity
- Quick action buttons

### Project Management
- ✅ Create projects
- ✅ Edit projects
- ✅ Delete projects
- ✅ Upload images
- ✅ Set categories
- ✅ Mark as featured
- ✅ Add technologies
- ✅ Add project stats
- ✅ Add URLs (live demo, GitHub)

### Image Upload
- Supports: JPG, PNG, GIF, WebP
- Max size: 5MB
- Stored in: MongoDB Atlas (Base64)
- Auto-display: In portfolio

---

## 🎨 Updating Your Portfolio

### Add New Project
1. Login to admin
2. Manage Projects → Add New Project
3. Fill details:
   - Title
   - Category
   - Description
   - Technologies (comma-separated)
   - URLs (optional)
   - Image (upload or URL)
4. Save
5. View at main site

### Edit Existing Project
1. Login to admin
2. Manage Projects
3. Click Edit (✏️) on project
4. Make changes
5. Save
6. Refresh main site

### Delete Project
1. Login to admin
2. Manage Projects
3. Click Delete (🗑️) on project
4. Confirm deletion
5. Project removed from site

---

## 📱 Mobile Access

Admin panel is responsive! Access from:
- 💻 Desktop
- 📱 Tablet
- 📱 Mobile phone

Same URL works everywhere:
```
https://jitesh-bawaskar-portfolioo.vercel.app/admin
```

---

## 🔄 Deployment & Updates

### Vercel Deployment
Your app is already deployed on Vercel!

### Make Changes
1. Edit locally
2. Test at `http://localhost:3000`
3. Commit to Git
4. Push to GitHub
5. Vercel auto-deploys ✨

### MongoDB Atlas
- Data persists across deployments
- No need to re-deploy for content changes
- Just update via admin panel!

---

## 📞 Support

### Common Issues & Solutions

**Issue:** Can't remember password
**Solution:** Run create-admin script again with new password

**Issue:** Admin panel not loading
**Solution:** Check Vercel deployment status

**Issue:** Changes not appearing
**Solution:** Hard refresh (Ctrl+F5) or clear cache

**Issue:** Image upload fails
**Solution:** Check file size (max 5MB), use supported formats

---

## 🎉 You're All Set!

Your portfolio is live and ready to manage:

**Portfolio:** https://jitesh-bawaskar-portfolioo.vercel.app/
**Admin Panel:** https://jitesh-bawaskar-portfolioo.vercel.app/admin

### Next Steps:
1. ✅ Create admin account
2. ✅ Login to admin panel
3. ✅ Add/edit your projects
4. ✅ Upload project images
5. ✅ Customize content
6. ✅ Share your portfolio! 🚀

---

**Last Updated:** October 25, 2025
**Status:** ✅ Live & Ready

