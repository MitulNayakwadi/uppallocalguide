import { NextRequest, NextResponse } from 'next/server';
import { getBudgetRestaurants } from '@/lib/dataService';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ budget: string }> }
) {
  try {
    const { budget: budgetValue } = await params;
    const budget = parseInt(budgetValue);
    if (isNaN(budget)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_BUDGET',
            message: 'Invalid budget value provided',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400, headers: corsHeaders }
      );
    }

    const restaurants = getBudgetRestaurants(budget);

    return NextResponse.json(
      {
        success: true,
        data: restaurants,
        message: `Retrieved ${restaurants.length} restaurants within budget ₹${budget}`,
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'BUDGET_RECOMMENDATIONS_ERROR',
          message: 'Failed to fetch budget recommendations',
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
