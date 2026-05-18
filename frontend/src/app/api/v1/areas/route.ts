import { NextRequest, NextResponse } from 'next/server';
import { loadAreasData } from '@/lib/dataService';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET() {
  try {
    const areas = loadAreasData();

    return NextResponse.json(
      {
        success: true,
        data: areas,
        message: `Retrieved ${Object.keys(areas).length} areas`,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'AREAS_FETCH_ERROR',
          message: 'Failed to fetch areas',
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
