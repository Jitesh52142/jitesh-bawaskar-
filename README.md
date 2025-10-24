# Jitesh Bawaskar - Professional Portfolio

A modern, dynamic portfolio website built with Next.js 14, TypeScript, Tailwind CSS, and MongoDB. Features a stunning dark theme with smooth animations, comprehensive project showcase, and a powerful admin panel for content management.

## 🚀 Features

### Frontend
- **Modern Dark Theme**: Beautiful gradient-based dark theme with glassmorphism effects
- **Smooth Animations**: Framer Motion animations throughout the site
- **Responsive Design**: Fully responsive across all devices
- **Interactive Components**: Engaging hover effects and transitions
- **SEO Optimized**: Meta tags and structured data for better search visibility

### Sections
- **Hero Section**: Eye-catching introduction with animated stats
- **About**: Detailed bio with contact information
- **Projects**: Filterable project showcase with 11+ projects
- **Experience**: Professional work history timeline
- **Skills**: Visual representation of technical skills with proficiency bars
- **Achievements**: Showcase of hackathon wins and certifications
- **Contact**: Multiple contact methods and social links

### Admin Panel
- **Secure Authentication**: JWT-based authentication system
- **Dashboard**: Analytics with charts showing project distribution and skill metrics
- **Content Management**: Edit all portfolio sections
- **Analytics**: Visual insights with Recharts integration
- **Real-time Updates**: Changes reflect immediately on the portfolio

### Technical Stack
- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT + bcryptjs
- **Charts**: Recharts
- **Icons**: React Icons

## 📦 Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your-mongodb-connection-string
JWT_SECRET=your-super-secret-jwt-key
ADMIN_EMAIL=jiteshbawaskar05@gmail.com
ADMIN_PASSWORD=admin123
```

4. **Run the development server**
```bash
npm run dev
```

5. **Access the application**
- Portfolio: http://localhost:3000
- Admin Panel: http://localhost:3000/admin

## 🎨 Admin Panel Access

### Default Credentials
- Email: `jiteshbawaskar05@gmail.com`
- Password: `admin123`

**Important**: Change these credentials after first login for security.

### Admin Features
- View analytics dashboard
- Edit bio and personal information
- Manage projects (add, edit, delete)
- Update work experience
- Manage achievements and certifications
- Real-time charts and statistics

## 🌐 Deployment on Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo>
git push -u origin main
```

2. **Deploy on Vercel**
- Go to [Vercel](https://vercel.com)
- Import your GitHub repository
- Add environment variables:
  - `MONGODB_URI`
  - `JWT_SECRET`
- Deploy!

3. **MongoDB Setup**
- Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- Get your connection string
- Add it to Vercel environment variables

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── admin/              # Admin panel pages
│   ├── api/                # API routes
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main portfolio page
│   └── globals.css         # Global styles
├── components/             # React components
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── About.tsx
│   ├── Projects.tsx
│   ├── Experience.tsx
│   ├── Skills.tsx
│   ├── Achievements.tsx
│   ├── Contact.tsx
│   └── Footer.tsx
├── lib/
│   ├── mongodb.ts          # MongoDB connection
│   ├── auth.ts             # Authentication utilities
│   ├── models/             # Mongoose models
│   └── data/               # Initial data
├── types/                  # TypeScript definitions
├── public/                 # Static assets
└── package.json

```

## 🎯 Key Features Explained

### Dynamic Content Management
All content is stored in MongoDB and can be updated through the admin panel without code changes.

### Analytics Dashboard
- Project distribution by category
- Skills proficiency visualization
- Real-time statistics
- Recent activity tracking

### Responsive Design
- Mobile-first approach
- Breakpoints for tablet and desktop
- Touch-friendly interactions
- Optimized for all screen sizes

### Performance Optimization
- Next.js 14 with App Router
- Server-side rendering
- Optimized images
- Code splitting
- Lazy loading

## 🔒 Security Features
- JWT authentication
- HTTP-only cookies
- Password hashing with bcryptjs
- Protected API routes
- Environment variable protection

## 📊 Analytics Integration Ready
The portfolio is ready to integrate with:
- Google Analytics
- Vercel Analytics
- Custom tracking solutions

## 🛠️ Customization

### Colors
Edit `tailwind.config.ts` to change the color scheme:
```typescript
colors: {
  primary: { ... },
  dark: { ... },
}
```

### Content
Use the admin panel or directly edit `lib/data/initialData.ts` for initial content.

### Animations
Modify animation variants in components or `globals.css`.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Support

For issues or questions:
- Email: jiteshbawaskar05@gmail.com
- GitHub: [Jitesh52142](https://github.com/Jitesh52142)
- LinkedIn: [Jitesh Bawaskar](https://www.linkedin.com/in/jitesh-bawaskar-ab3a06359/)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Tailwind CSS for utility-first styling
- Framer Motion for smooth animations
- MongoDB for flexible data storage
- Vercel for seamless deployment

---

**Built with ❤️ by Jitesh Bawaskar**

