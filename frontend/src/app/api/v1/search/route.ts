import { NextRequest, NextResponse } from 'next/server';
import { searchRestaurants as searchRestaurantsData } from '@/lib/dataService';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filters: any = {};

    // Extract filters from query parameters
    if (searchParams.has('q')) filters.q = searchParams.get('q');
    if (searchParams.has('cuisine')) filters.cuisine = searchParams.get('cuisine');
    if (searchParams.has('area')) filters.area = searchParams.get('area');
    if (searchParams.has('minPrice')) filters.minPrice = searchParams.get('minPrice');
    if (searchParams.has('maxPrice')) filters.maxPrice = searchParams.get('maxPrice');
    if (searchParams.has('minRating')) filters.minRating = searchParams.get('minRating');

    const results = searchRestaurantsData(filters);

    return NextResponse.json(
      {
        success: true,
        data: results,
        message: `Retrieved ${results.length} search results`,
        filters,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SEARCH_ERROR',
          message: 'Failed to perform search',
          details: error instanceof Error ? error.message : 'Unknown error',
        },
        timestamp: new Date().toISOString(),
      },
      { status: 500, headers: corsHeaders }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const results = searchRestaurantsData(body);

    return NextResponse.json(
      {
        success: true,
        data: results,
        message: `Retrieved ${results.length} search results`,
        filters: body,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SEARCH_ERROR',
          message: 'Failed to perform search',
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
