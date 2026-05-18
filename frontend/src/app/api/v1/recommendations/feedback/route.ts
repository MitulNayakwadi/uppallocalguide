import { NextRequest, NextResponse } from 'next/server';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// In-memory storage for feedback (in production, use a database)
const feedbackStore: any[] = [];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate feedback
    if (!body.restaurantId || typeof body.rating !== 'number') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_FEEDBACK',
            message: 'Missing required fields: restaurantId, rating',
          },
          timestamp: new Date().toISOString(),
        },
        { status: 400, headers: corsHeaders }
      );
    }

    // Store feedback
    const feedback = {
      id: Date.now().toString(),
      ...body,
      timestamp: new Date().toISOString(),
    };
    feedbackStore.push(feedback);

    return NextResponse.json(
      {
        success: true,
        data: feedback,
        message: 'Feedback submitted successfully',
        timestamp: new Date().toISOString(),
      },
      { headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'FEEDBACK_ERROR',
          message: 'Failed to submit feedback',
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
