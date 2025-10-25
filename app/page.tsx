'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import Experience from '@/components/Experience';
import Skills from '@/components/Skills';
import Achievements from '@/components/Achievements';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { initialPortfolioData } from '@/lib/data/initialData';

export default function Home() {
  const [data, setData] = useState(initialPortfolioData);
  const [loading, setLoading] = useState(true);

  const fetchPortfolioData = async () => {
    try {
      // Add timestamp to prevent caching
      const timestamp = new Date().getTime();
      const response = await fetch(`/api/portfolio?t=${timestamp}`, {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const portfolioData = await response.json();
      setData(portfolioData);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching portfolio:', error);
      setData(initialPortfolioData);
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch on mount
    fetchPortfolioData();

    // Auto-refresh every 10 seconds to show updates quickly
    const interval = setInterval(() => {
      fetchPortfolioData();
    }, 10000); // 10 seconds - faster refresh for better UX

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero bio={data.bio} />
      <About bio={data.bio} />
      <Projects projects={data.projects} />
      <Experience experiences={data.experiences} />
      <Skills skills={data.skills} />
      <Achievements achievements={data.achievements} />
      <Contact bio={data.bio} />
      <Footer />
    </main>
  );
}

