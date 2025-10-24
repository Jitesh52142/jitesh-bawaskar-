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

  useEffect(() => {
    // Fetch latest portfolio data from API
    fetch('/api/portfolio')
      .then(res => res.json())
      .then(portfolioData => {
        setData(portfolioData);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching portfolio:', error);
        setData(initialPortfolioData);
        setLoading(false);
      });
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

