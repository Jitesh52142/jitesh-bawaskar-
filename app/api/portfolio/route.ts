import { NextResponse } from 'next/server';
import { initialPortfolioData } from '@/lib/data/initialData';
import dbConnect from '@/lib/mongodb';
import { Portfolio } from '@/lib/models/Portfolio';

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
    
    return NextResponse.json(portfolioData);
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
      portfolioData[section] = data;
    } else {
      Object.assign(portfolioData, data);
    }
    
    portfolioData.updatedAt = new Date();
    await portfolioData.save();
    
    return NextResponse.json(portfolioData);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

