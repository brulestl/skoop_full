'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase, getCurrentUser } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

interface WithAuthProps {
  user: User | null;
}

export default function withAuth<P extends WithAuthProps>(
  WrappedComponent: React.ComponentType<P>
) {
  return function AuthenticatedComponent(props: Omit<P, keyof WithAuthProps>) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      // Check current authentication state
      const checkAuth = async () => {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          
          if (!currentUser) {
            // Redirect to login if not authenticated
            router.push('/login?redirect=' + encodeURIComponent(window.location.pathname));
            return;
          }
        } catch (error) {
          console.error('Error checking authentication:', error);
          router.push('/login');
        } finally {
          setLoading(false);
        }
      };

      checkAuth();

      // Listen for auth state changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            setUser(session.user);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
            router.push('/login');
          }
        }
      );

      return () => {
        subscription.unsubscribe();
      };
    }, [router]);

    // Show loading state while checking authentication
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      );
    }

    // Don't render the component if user is not authenticated
    if (!user) {
      return null;
    }

    // Render the wrapped component with the user prop
    return <WrappedComponent {...(props as P)} user={user} />;
  };
} 