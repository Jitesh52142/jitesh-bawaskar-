# Deployment Guide

This guide will help you deploy your portfolio to Vercel with MongoDB Atlas.

## Prerequisites

- GitHub account
- Vercel account (free)
- MongoDB Atlas account (free)

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account or sign in
3. Create a new cluster (select free tier - M0)
4. Wait for cluster to be created (2-3 minutes)
5. Click "Connect" on your cluster
6. Add your IP address (or use 0.0.0.0/0 for all IPs)
7. Create a database user (username + password)
8. Click "Choose a connection method"
9. Select "Connect your application"
10. Copy the connection string (looks like: `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`)
11. Replace `<username>` with your username and `<password>` with your password

## Step 2: Push to GitHub

```bash
# Initialize git repository (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial portfolio setup"

# Add remote repository
git remote add origin https://github.com/yourusername/your-repo-name.git

# Push to GitHub
git push -u origin main
```

## Step 3: Deploy to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign in with GitHub
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure project:
   - **Framework Preset**: Next.js
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: .next

6. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB connection string from Step 1
   - `JWT_SECRET`: Create a random secret (e.g., `your-super-secret-jwt-key-123456`)

7. Click "Deploy"
8. Wait for deployment to complete (2-3 minutes)

## Step 4: Access Your Portfolio

Once deployed, you'll get two URLs:
- **Portfolio**: `https://your-project.vercel.app`
- **Admin Panel**: `https://your-project.vercel.app/admin`

### Default Admin Credentials
- Email: `jiteshbawaskar05@gmail.com`
- Password: `admin123`

**⚠️ Important**: Change these credentials after first login!

## Step 5: Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your custom domain
4. Follow Vercel's instructions to configure DNS

## Troubleshooting

### MongoDB Connection Issues

If you see MongoDB connection errors:
1. Check that your IP is whitelisted (or use 0.0.0.0/0)
2. Verify connection string is correct
3. Ensure username/password have no special characters that need URL encoding

### Build Failures

If build fails:
1. Check Vercel logs for specific errors
2. Ensure all environment variables are set
3. Try building locally first: `npm run build`

### Admin Login Issues

If you can't log in:
1. Check JWT_SECRET is set in environment variables
2. Try creating a new admin account via MongoDB directly
3. Clear browser cookies and try again

## Updating Your Portfolio

### Method 1: Through Admin Panel (Recommended)
1. Log in to admin panel
2. Edit any section
3. Changes are saved to MongoDB
4. Portfolio updates automatically

### Method 2: Through Code
1. Make changes to your code
2. Commit and push to GitHub
3. Vercel automatically redeploys

## Environment Variables Reference

```env
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/portfolio?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

## Security Best Practices

1. **Change default admin password** immediately
2. **Use strong JWT_SECRET** (at least 32 random characters)
3. **Enable 2FA** on your MongoDB Atlas account
4. **Restrict IP access** in MongoDB if possible
5. **Use HTTPS only** (Vercel does this by default)
6. **Regular backups** of MongoDB data

## Performance Optimization

Vercel automatically provides:
- ✅ CDN distribution
- ✅ Image optimization
- ✅ Automatic SSL
- ✅ Serverless functions
- ✅ Edge caching

## Monitoring

### Vercel Analytics (Optional - Paid)
1. Go to your project in Vercel
2. Click "Analytics" tab
3. Enable analytics
4. View real-time visitor data

### MongoDB Atlas Monitoring
1. Go to MongoDB Atlas dashboard
2. Click "Metrics" tab
3. Monitor database usage and performance

## Backup Your Data

### Export from MongoDB
```bash
# Install MongoDB tools
# Then export your database
mongodump --uri="your-mongodb-uri" --out=./backup
```

### Restore to MongoDB
```bash
mongorestore --uri="your-mongodb-uri" ./backup
```

## Support

If you encounter issues:
1. Check Vercel deployment logs
2. Check MongoDB Atlas logs
3. Review README.md for common solutions
4. Contact: jiteshbawaskar05@gmail.com

## Success Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Connection string obtained
- [ ] Code pushed to GitHub
- [ ] Vercel project created
- [ ] Environment variables configured
- [ ] Deployment successful
- [ ] Portfolio accessible
- [ ] Admin panel accessible
- [ ] Admin login working
- [ ] Default password changed
- [ ] Data persisting to MongoDB

Congratulations! Your portfolio is now live! 🎉

