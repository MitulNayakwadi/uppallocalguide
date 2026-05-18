import { NextRequest, NextResponse } from 'next/server';
import { getRestaurantsByArea } from '@/lib/dataService';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(
  request: NextRequest,
  { params }: { params: { area: string } }
) {
  try {
    const area = params.area;
    const restaurants = getRestaurantsByArea(area);

    return NextResponse.json(
      {
        success: true,
        data: restaurants,
        message: `Retrieved ${restaurants.length} restaurants in ${area}`,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AREA_RESTAURANTS_FETCH_ERROR',
          message: 'Failed to fetch restaurants by area',
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
