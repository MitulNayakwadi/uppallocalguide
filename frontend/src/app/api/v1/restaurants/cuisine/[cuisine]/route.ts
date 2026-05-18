import { NextRequest, NextResponse } from 'next/server';
import { getRestaurantsByCuisine } from '@/lib/dataService';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ cuisine: string }> }
) {
  try {
    const { cuisine } = await params;
    const restaurants = getRestaurantsByCuisine(cuisine);

    return NextResponse.json(
      {
        success: true,
        data: restaurants,
        message: `Retrieved ${restaurants.length} restaurants serving ${cuisine}`,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CUISINE_RESTAURANTS_FETCH_ERROR',
          message: 'Failed to fetch restaurants by cuisine',
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
