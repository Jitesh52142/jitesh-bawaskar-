import { NextResponse } from 'next/server';

// Note: Vercel has a read-only filesystem
// For production, use cloud storage (Cloudinary, AWS S3, etc.)
// For now, we'll return instructions to use emoji or external URLs

export async function POST(request: Request) {
  try {
    return NextResponse.json({ 
      success: false, 
      error: 'File uploads are not supported on Vercel deployment.',
      message: 'Please use one of these alternatives:',
      alternatives: [
        '1. Use emoji icons (e.g., 💻, 🤖, 🌐)',
        '2. Use external image URLs (e.g., from Imgur, Cloudinary)',
        '3. Set up cloud storage integration (Cloudinary recommended)',
      ],
      suggestion: 'For emoji: Just paste an emoji in the image field (💻, 🤖, 📱, etc.)',
    }, { status: 400 });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Upload not supported on serverless deployment',
      message: 'Use emoji icons or external URLs instead'
    }, { status: 500 });
  }
}

