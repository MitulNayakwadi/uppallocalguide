import { NextRequest, NextResponse } from 'next/server';
import { getPopularRestaurants, getBudgetRestaurants, searchRestaurants } from '@/lib/dataService';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Get personalized recommendations based on preferences
    let recommendations = getPopularRestaurants(20);

    // Filter by cuisine if specified
    if (body.cuisine && body.cuisine !== 'all') {
      const cuisineKey = body.cuisine.toLowerCase().replace(/\s+/g, '_');
      recommendations = recommendations.filter((r: any) =>
        r.cuisine.some((c: string) =>
          c.toLowerCase().replace(/\s+/g, '_') === cuisineKey
        )
      );
    }

    // Filter by budget if specified
    if (body.budget) {
      recommendations = recommendations.filter(
        (r: any) => r.priceRange.min <= body.budget && r.priceRange.max >= body.budget
      );
    }

    // Filter by rating if specified
    if (body.minRating) {
      recommendations = recommendations.filter(
        (r: any) => r.rating.average >= body.minRating
      );
    }

    // Limit results
    const limit = body.limit || 10;
    recommendations = recommendations.slice(0, limit);

    return NextResponse.json(
      {
        success: true,
        data: recommendations,
        message: `Retrieved ${recommendations.length} personalized recommendations`,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RECOMMENDATIONS_ERROR',
          message: 'Failed to fetch recommendations',
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
