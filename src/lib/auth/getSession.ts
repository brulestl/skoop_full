import { NextRequest } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export interface SessionResult {
  user: any | null;
  session: any | null;
  error: any | null;
}

export async function getSession(request: NextRequest): Promise<SessionResult> {
  try {
    console.log("getSession: Creating Supabase client with cookies");
    
    // Task 3: Instantiate Supabase with cookies from the request
    const supabase = createRouteHandlerClient({ cookies });
    
    console.log("getSession: Attempting to get user session");
    
    // Get both user and session for complete authentication info
    const [userResult, sessionResult] = await Promise.all([
      supabase.auth.getUser(),
      supabase.auth.getSession()
    ]);
    
    const { data: { user }, error: userError } = userResult;
    const { data: { session }, error: sessionError } = sessionResult;
    
    console.log("getSession results:", {
      user: user ? { id: user.id, email: user.email } : null,
      hasSession: !!session,
      userError: userError?.message,
      sessionError: sessionError?.message,
      timestamp: new Date().toISOString()
    });
    
    // Return the most detailed error if any
    const error = userError || sessionError;
    
    if (error) {
      console.error("getSession: Authentication error", error);
      return { user: null, session: null, error };
    }
    
    if (!user) {
      console.warn("getSession: No user found in authentication");
      return { user: null, session, error: new Error("No authenticated user found") };
    }
    
    console.log("✅ getSession: Authentication successful");
    return { user, session, error: null };
    
  } catch (error) {
    console.error("getSession: Unexpected error", error);
    return { 
      user: null, 
      session: null, 
      error: error instanceof Error ? error : new Error(String(error))
    };
  }
} 