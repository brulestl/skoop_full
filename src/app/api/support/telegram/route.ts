import { NextRequest, NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    
    // Get the current user session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    
    if (sessionError || !session) {
      return NextResponse.json(
        { error: 'Please log in to submit a session string' },
        { status: 401 }
      );
    }

    const { sessionString, userAgent, timestamp } = await request.json();
    
    if (!sessionString || typeof sessionString !== 'string') {
      return NextResponse.json(
        { error: 'Session string is required' },
        { status: 400 }
      );
    }

    // Store the support request in a support_requests table
    // If this table doesn't exist, we'll create a simple log entry
    try {
      const { error: insertError } = await supabase
        .from('support_requests')
        .insert({
          user_id: session.user.id,
          user_email: session.user.email,
          request_type: 'telegram_session',
          request_data: {
            sessionString,
            userAgent,
            timestamp,
          },
          status: 'pending',
          created_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error('Error inserting support request:', insertError);
        // If support_requests table doesn't exist, fall back to logging
        throw insertError;
      }
    } catch (tableError) {
      // Fallback: Log to console and potentially send email
      console.log('Telegram Session Support Request:', {
        userId: session.user.id,
        userEmail: session.user.email,
        sessionString: sessionString.substring(0, 50) + '...', // Log partial for security
        timestamp: new Date().toISOString(),
      });

      // In production, you might want to send an email to support team here
      // or use a service like SendGrid, Resend, etc.
    }

    // Send notification email to support team (optional)
    try {
      // You can integrate with email service here
      // await sendSupportNotification({
      //   userEmail: session.user.email,
      //   userId: session.user.id,
      //   requestType: 'telegram_session'
      // });
    } catch (emailError) {
      console.error('Failed to send support notification:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      message: 'Session string submitted successfully. Our team will process it within 24 hours.',
      requestId: `tg_${session.user.id.slice(0, 8)}_${Date.now()}`,
    });

  } catch (error) {
    console.error('Support request error:', error);
    return NextResponse.json(
      { error: 'Failed to submit support request' },
      { status: 500 }
    );
  }
} 