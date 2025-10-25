'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  FaUser, FaBriefcase, FaProjectDiagram, FaAward, 
  FaChartLine, FaSignOutAlt, FaCog, FaEdit 
} from 'react-icons/fa';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('/api/auth/verify');
        const data = await response.json();
        
        if (!data.authenticated) {
          router.push('/admin');
          return;
        }
        
        // Fetch portfolio data
        const portfolioResponse = await fetch('/api/portfolio');
        const portfolioData = await portfolioResponse.json();
        setPortfolioData(portfolioData);
        setLoading(false);
      } catch (error) {
        router.push('/admin');
      }
    };

    checkAuth();
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  // Analytics data
  const projectsByCategory = portfolioData?.projects?.reduce((acc: any, project: any) => {
    const category = project.category || 'Other';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  const categoryData = Object.entries(projectsByCategory || {}).map(([name, value]) => ({
    name,
    value,
  }));

  const skillsData = portfolioData?.skills?.map((skill: any) => ({
    name: skill.category,
    proficiency: skill.proficiency,
  })) || [];

  const COLORS = ['#0ea5e9', '#E94560', '#533483', '#0f3460', '#16213e', '#1a1a2e'];

  const managementSections = [
    { name: 'Bio & Contact', route: '/admin/dashboard/bio', icon: FaUser, description: 'Edit your personal information and contact details' },
    { name: 'Projects', route: '/admin/dashboard/projects', icon: FaProjectDiagram, description: 'Manage your project portfolio' },
    { name: 'Experience', route: '/admin/dashboard/experience', icon: FaBriefcase, description: 'Add and edit work experiences' },
    { name: 'Skills', route: '/admin/dashboard/skills', icon: FaCog, description: 'Manage your technical skills' },
    { name: 'Achievements', route: '/admin/dashboard/achievements', icon: FaAward, description: 'Track awards and certifications' },
  ];

  return (
    <div className="min-h-screen section-padding">
      <div className="container-custom">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold gradient-text mb-2">Admin Dashboard</h1>
            <p className="text-gray-400">Manage your portfolio content</p>
          </div>
          <button onClick={handleLogout} className="btn-secondary flex items-center gap-2">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Projects', value: portfolioData?.projects?.length || 0, icon: FaProjectDiagram, color: 'from-blue-500 to-blue-600' },
            { label: 'Experience', value: portfolioData?.experiences?.length || 0, icon: FaBriefcase, color: 'from-purple-500 to-purple-600' },
            { label: 'Achievements', value: portfolioData?.achievements?.length || 0, icon: FaAward, color: 'from-pink-500 to-pink-600' },
            { label: 'Skills', value: portfolioData?.skills?.length || 0, icon: FaCog, color: 'from-green-500 to-green-600' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-effect card-gradient rounded-xl p-6"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center text-2xl mb-4`}>
                <stat.icon />
              </div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Management Sections */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Manage Portfolio Content</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {managementSections.map((section, index) => (
              <motion.div
                key={section.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => router.push(section.route)}
                className="glass-effect card-gradient rounded-xl p-6 cursor-pointer group hover:scale-105 transition-transform duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg flex items-center justify-center text-2xl mb-4 group-hover:rotate-6 transition-transform`}>
                  <section.icon />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{section.name}</h3>
                <p className="text-gray-400 text-sm">{section.description}</p>
                <div className="mt-4 flex items-center text-yellow-500 text-sm font-medium">
                  <span>Manage</span>
                  <FaEdit className="ml-2" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Analytics */}
        <div className="space-y-8">
          <h2 className="text-2xl font-bold text-white">Analytics & Insights</h2>

          {/* Charts */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Projects by Category */}
            <div className="glass-effect card-gradient rounded-xl p-6">
              <h3 className="text-xl font-bold mb-6 text-white">Projects by Category</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Skills Proficiency */}
            <div className="glass-effect card-gradient rounded-xl p-6">
              <h3 className="text-xl font-bold mb-6 text-white">Skills Proficiency</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                  <XAxis dataKey="name" stroke="#999" angle={-45} textAnchor="end" height={100} />
                  <YAxis stroke="#999" />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#1a1a2e', border: '1px solid #333' }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Legend />
                  <Bar dataKey="proficiency" fill="#0ea5e9" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Projects */}
          <div className="glass-effect card-gradient rounded-xl p-6">
            <h3 className="text-xl font-bold mb-6 text-white">Recent Projects</h3>
            <div className="space-y-4">
              {portfolioData?.projects?.slice(0, 5).map((project: any) => (
                <div key={project.id} className="glass-effect rounded-lg p-4 flex justify-between items-center">
                  <div>
                    <h4 className="font-bold text-white">{project.title}</h4>
                    <p className="text-sm text-gray-400">{project.category}</p>
                  </div>
                  <button 
                    onClick={() => router.push('/admin/dashboard/projects')}
                    className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
                  >
                    <FaEdit /> Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

