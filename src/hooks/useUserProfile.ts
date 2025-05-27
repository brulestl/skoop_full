'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from './useAuth';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  created_at: string | null;
  updated_at: string | null;
}

export interface UpdateProfileData {
  display_name?: string;
  full_name?: string;
  avatar_url?: string;
  bio?: string;
}

export function useUserProfile() {
  const { user: authUser, isAuthenticated } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile from public.users table
  const fetchProfile = async () => {
    if (!authUser?.id) {
      setLoading(false);
      return;
    }

    try {
      setError(null);
      
      const { data, error: fetchError } = await supabase
        .from('users')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (fetchError) {
        console.error('Error fetching user profile:', fetchError);
        setError(fetchError.message);
        return;
      }

      setProfile(data);
    } catch (err) {
      console.error('Exception fetching profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (updates: UpdateProfileData): Promise<boolean> => {
    if (!authUser?.id) {
      setError('User not authenticated');
      return false;
    }

    setUpdating(true);
    setError(null);

    try {
      const { data, error: updateError } = await supabase
        .from('users')
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', authUser.id)
        .select()
        .single();

      if (updateError) {
        console.error('Error updating profile:', updateError);
        setError(updateError.message);
        return false;
      }

      // Update local state
      setProfile(data);
      return true;
    } catch (err) {
      console.error('Exception updating profile:', err);
      setError(err instanceof Error ? err.message : 'Failed to update profile');
      return false;
    } finally {
      setUpdating(false);
    }
  };

  // Update display name specifically
  const updateDisplayName = async (displayName: string): Promise<boolean> => {
    return updateProfile({ display_name: displayName.trim() });
  };

  // Get display name with fallbacks
  const getDisplayName = (): string => {
    if (profile?.display_name) {
      return profile.display_name;
    }
    if (profile?.full_name) {
      return profile.full_name;
    }
    if (profile?.email) {
      return profile.email.split('@')[0];
    }
    return 'User';
  };

  // Fetch profile when auth user changes
  useEffect(() => {
    if (isAuthenticated && authUser) {
      fetchProfile();
    } else {
      setProfile(null);
      setLoading(false);
    }
  }, [authUser, isAuthenticated]);

  return {
    profile,
    loading,
    updating,
    error,
    fetchProfile,
    updateProfile,
    updateDisplayName,
    getDisplayName,
    // Convenience getters
    displayName: getDisplayName(),
    email: profile?.email || authUser?.email || '',
    avatarUrl: profile?.avatar_url,
    bio: profile?.bio,
    fullName: profile?.full_name,
    createdAt: profile?.created_at,
  };
} 