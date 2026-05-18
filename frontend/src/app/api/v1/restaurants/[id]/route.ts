import { NextRequest, NextResponse } from 'next/server';
import { getRestaurantById } from '@/lib/dataService';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const restaurant = getRestaurantById(id);

    if (!restaurant) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'RESTAURANT_NOT_FOUND',
            message: `Restaurant with ID '${id}' not found`,
            suggestion: 'Check the restaurant ID and try again',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 404, headers: corsHeaders }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: restaurant,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'RESTAURANT_FETCH_ERROR',
          message: 'Failed to fetch restaurant',
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
