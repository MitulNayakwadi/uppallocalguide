import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message: 'Uppal Kalan Street Food Guide API v1',
      version: '1.0.0',
      endpoints: {
        restaurants: '/api/v1/restaurants',
        recommendations: '/api/v1/recommendations',
        search: '/api/v1/search',
        areas: '/api/v1/areas',
        cuisines: '/api/v1/cuisines',
      },
      documentation: 'See VERCEL_SETUP_GUIDE.md for API documentation',
      timestamp: new Date().toISOString(),
    },
    { headers: corsHeaders }
  );
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
