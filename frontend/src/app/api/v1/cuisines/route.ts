import { NextRequest, NextResponse } from 'next/server';
import { loadCuisinesData } from '@/lib/dataService';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET() {
  try {
    const cuisines = loadCuisinesData();

    return NextResponse.json(
      {
        success: true,
        data: cuisines,
        message: `Retrieved ${Object.keys(cuisines).length} cuisines`,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'CUISINES_FETCH_ERROR',
          message: 'Failed to fetch cuisines',
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
