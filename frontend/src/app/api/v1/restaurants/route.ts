import { NextRequest, NextResponse } from 'next/server';
import { getAllRestaurants, getRestaurantById, getRestaurantsByArea, getRestaurantsByCuisine, searchRestaurants } from '@/lib/dataService';

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const sort = searchParams.get('sort') || 'rating';

    let restaurants = getAllRestaurants();

    // Sorting
    switch (sort) {
      case 'rating':
        restaurants.sort((a: any, b: any) => b.rating.average - a.rating.average);
        break;
      case 'price_low':
        restaurants.sort((a: any, b: any) => a.priceRange.min - b.priceRange.min);
        break;
      case 'price_high':
        restaurants.sort((a: any, b: any) => b.priceRange.max - a.priceRange.max);
        break;
      case 'name':
        restaurants.sort((a: any, b: any) => a.name.localeCompare(b.name));
        break;
      default:
        restaurants.sort((a: any, b: any) => b.rating.average - a.rating.average);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedResults = restaurants.slice(startIndex, endIndex);

    return NextResponse.json(
      {
        success: true,
        data: paginatedResults,
        pagination: {
          page,
          limit,
          total: restaurants.length,
          totalPages: Math.ceil(restaurants.length / limit),
        },
        message: `Retrieved ${paginatedResults.length} restaurants`,
        timestamp: new Date().toISOString(),
      },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RESTAURANTS_FETCH_ERROR',
          message: 'Failed to fetch restaurants',
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
