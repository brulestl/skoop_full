'use client'
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs'
import type { Database } from '../types/database.types'

// Re-export database types for convenient access
export type { Database, Tables, TablesInsert, TablesUpdate, Enums, CompositeTypes } from '../types/database.types'

// Get environment variables with fallbacks for build time
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// This will both persist your session in localStorage *and* set the HTTP-only cookie
export const supabase = createPagesBrowserClient<Database>({
  supabaseUrl,
  supabaseKey,
})

// Helper function to get the current user
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting current user:', error)
    return null
  }
  return user
}

// Helper function to get the current session
export async function getCurrentSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Error getting current session:', error)
    return null
  }
  return session
}

// Helper function to sign out
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    throw error
  }
}

// Export the default client instance
export default supabase 