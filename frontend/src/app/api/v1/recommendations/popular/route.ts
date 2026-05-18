import { NextRequest, NextResponse } from 'next/server';
import { getPopularRestaurants } from '@/lib/dataService';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request: NextRequest) {
  try {
    const limit = parseInt(request.nextUrl.searchParams.get('limit') || '10');
    const restaurants = getPopularRestaurants(limit);

    return NextResponse.json(
      {
        success: true,
        data: restaurants,
        message: `Retrieved ${restaurants.length} popular restaurants`,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'POPULAR_RECOMMENDATIONS_ERROR',
          message: 'Failed to fetch popular recommendations',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}
