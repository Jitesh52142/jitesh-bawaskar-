import { NextResponse } from 'next/server';
import { initialPortfolioData } from '@/lib/data/initialData';
import dbConnect from '@/lib/mongodb';
import { Portfolio } from '@/lib/models/Portfolio';

// Force dynamic rendering on Vercel - no caching
export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const fetchCache = 'force-no-store';

export async function GET() {
  try {
    await dbConnect();
    
    // Try to get data from MongoDB
    let portfolioData = await Portfolio.findOne();
    
    // If no data exists, create initial data
    if (!portfolioData) {
      portfolioData = new Portfolio(initialPortfolioData);
      await portfolioData.save();
    }
    
    // Return with cache control headers to ensure fresh data
    return NextResponse.json(portfolioData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    });
  } catch (error: any) {
    console.error('Database error, falling back to initial data:', error);
    // Fallback to initial data if database fails
    return NextResponse.json(initialPortfolioData);
  }
}

export async function PUT(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { section, data } = body;
    
    let portfolioData = await Portfolio.findOne();
    
    if (!portfolioData) {
      portfolioData = new Portfolio(initialPortfolioData);
    }
    
    // Update specific section or entire portfolio
    if (section) {
      // Validate section exists
      const validSections = ['bio', 'projects', 'experiences', 'skills', 'achievements', 'certifications'];
      if (!validSections.includes(section)) {
        return NextResponse.json({ error: `Invalid section: ${section}` }, { status: 400 });
      }
      
      portfolioData[section] = data;
      console.log(`Updated section: ${section}`);
    } else {
      Object.assign(portfolioData, data);
      console.log('Updated entire portfolio');
    }
    
    portfolioData.updatedAt = new Date();
    await portfolioData.save();
    
    console.log('Portfolio saved successfully');
    
    // Return with no-cache headers to ensure fresh data on next fetch
    return NextResponse.json(portfolioData, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
      },
    });
  } catch (error: any) {
    console.error('Error updating portfolio:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

