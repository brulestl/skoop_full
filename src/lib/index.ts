// Main Supabase client for client-side usage
export { 
  supabase, 
  getCurrentUser,
  getCurrentSession,
  signOut,
  type Database,
  type Tables,
  type TablesInsert,
  type TablesUpdate,
  type Enums,
  type CompositeTypes
} from './supabase'

// Server-side Supabase client
export { createClient as createServerClient, createMiddlewareClient } from './supabase-server'

// Authentication utilities
export { useAuth } from '../hooks/useAuth'
export { default as withAuth } from '../hoc/withAuth' 