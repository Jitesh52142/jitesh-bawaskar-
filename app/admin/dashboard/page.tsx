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

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaChartLine },
    { id: 'bio', label: 'Bio', icon: FaUser },
    { id: 'projects', label: 'Projects', icon: FaProjectDiagram },
    { id: 'experience', label: 'Experience', icon: FaBriefcase },
    { id: 'achievements', label: 'Achievements', icon: FaAward },
    { id: 'settings', label: 'Settings', icon: FaCog },
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

        {/* Navigation Tabs */}
        <div className="glass-effect rounded-xl p-2 mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <tab.icon /> {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-8">
              {/* Stats Cards */}
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  { label: 'Total Projects', value: portfolioData?.projects?.length || 0, icon: FaProjectDiagram, color: 'from-blue-500 to-blue-600' },
                  { label: 'Experiences', value: portfolioData?.experiences?.length || 0, icon: FaBriefcase, color: 'from-purple-500 to-purple-600' },
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
                      <button className="btn-secondary text-sm py-2 px-4 flex items-center gap-2">
                        <FaEdit /> Edit
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bio' && (
            <div className="glass-effect card-gradient rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Edit Bio</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
                  <input
                    type="text"
                    defaultValue={portfolioData?.bio?.name}
                    className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
                  <input
                    type="text"
                    defaultValue={portfolioData?.bio?.title}
                    className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
                  <textarea
                    rows={8}
                    defaultValue={portfolioData?.bio?.bio}
                    className="w-full px-4 py-3 glass-effect rounded-lg text-white"
                  />
                </div>
                <button className="btn-primary">Save Changes</button>
              </div>
            </div>
          )}

          {activeTab === 'projects' && (
            <div className="glass-effect card-gradient rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Projects Management</h2>
              <p className="text-gray-400 mb-6">
                Manage all your projects with full CRUD capabilities - Create, Read, Update, and Delete projects.
              </p>
              <button 
                onClick={() => router.push('/admin/dashboard/projects')}
                className="btn-primary flex items-center gap-2"
              >
                <FaEdit /> Open Projects Manager
              </button>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="glass-effect card-gradient rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Work Experience</h2>
              <p className="text-gray-400">Manage your work experience entries here.</p>
            </div>
          )}

          {activeTab === 'achievements' && (
            <div className="glass-effect card-gradient rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Achievements</h2>
              <p className="text-gray-400">Manage your achievements and certifications here.</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="glass-effect card-gradient rounded-xl p-8">
              <h2 className="text-2xl font-bold mb-6 text-white">Settings</h2>
              <p className="text-gray-400">General settings and preferences.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

