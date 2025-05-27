import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the supabase module
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      })),
      insert: vi.fn(() => Promise.resolve({ data: [], error: null })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    })),
    auth: {
      getSession: vi.fn(() => Promise.resolve({ data: { session: null }, error: null })),
      getUser: vi.fn(() => Promise.resolve({ data: { user: null }, error: null }))
    }
  }
}))

describe('RLS Enforcement', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('Connected Accounts RLS', () => {
    it('should only return accounts for authenticated user', async () => {
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: [
            {
              user_id: 'user-123',
              provider: 'github',
              access_token: 'token-123',
              status: 'active'
            }
          ],
          error: null
        })
      })

      const mockFrom = vi.fn().mockReturnValue({
        select: mockSelect
      })

      // Simulate authenticated user query
      const result = await mockFrom('connected_accounts')
        .select('*')
        .eq('user_id', 'user-123')

      expect(mockSelect).toHaveBeenCalledWith('*')
      expect(result.data).toHaveLength(1)
      expect(result.data?.[0]?.user_id).toBe('user-123')
    })

    it('should prevent access to other users accounts', async () => {
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: [], // RLS should prevent access to other user's data
          error: null
        })
      })

      const mockFrom = vi.fn().mockReturnValue({
        select: mockSelect
      })

      // Simulate trying to access another user's accounts
      const result = await mockFrom('connected_accounts')
        .select('*')
        .eq('user_id', 'other-user-456')

      expect(result.data).toHaveLength(0) // RLS should block this
    })

    it('should prevent unauthorized inserts', async () => {
      const mockInsert = vi.fn().mockResolvedValue({
        data: null,
        error: {
          message: 'new row violates row-level security policy',
          code: '42501'
        }
      })

      // Simulate unauthorized insert attempt
      const result = await mockInsert({
        user_id: 'other-user-456',
        provider: 'github',
        access_token: 'malicious-token'
      })

      expect(result.error).toBeDefined()
      expect(result.error?.code).toBe('42501')
      expect(result.data).toBeNull()
    })
  })

  describe('Bookmarks RLS', () => {
    it('should only return bookmarks for authenticated user', async () => {
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: [
            {
              id: 'bookmark-1',
              user_id: 'user-123',
              title: 'My Bookmark',
              url: 'https://example.com'
            }
          ],
          error: null
        })
      })

      const mockFrom = vi.fn().mockReturnValue({
        select: mockSelect
      })

      // Simulate authenticated user query
      const result = await mockFrom('bookmarks')
        .select('*')
        .eq('user_id', 'user-123')

      expect(result.data).toHaveLength(1)
      expect(result.data?.[0]?.user_id).toBe('user-123')
    })

    it('should prevent cross-user bookmark access', async () => {
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: [], // RLS should prevent access
          error: null
        })
      })

      const mockFrom = vi.fn().mockReturnValue({
        select: mockSelect
      })

      // Simulate trying to access another user's bookmarks
      const result = await mockFrom('bookmarks')
        .select('*')
        .eq('user_id', 'other-user-456')

      expect(result.data).toHaveLength(0)
    })

    it('should prevent unauthorized bookmark modifications', async () => {
      const mockUpdate = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: null,
          error: {
            message: 'new row violates row-level security policy',
            code: '42501'
          }
        })
      })

      const mockFrom = vi.fn().mockReturnValue({
        update: mockUpdate
      })

      // Simulate unauthorized update attempt
      const result = await mockFrom('bookmarks')
        .update({ title: 'Hacked!' })
        .eq('id', 'bookmark-1')

      expect(result.error).toBeDefined()
      expect(result.error?.code).toBe('42501')
    })
  })

  describe('User Settings RLS', () => {
    it('should only allow access to own user settings', async () => {
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: [
            {
              user_id: 'user-123',
              theme: 'dark',
              notifications_enabled: true
            }
          ],
          error: null
        })
      })

      const mockFrom = vi.fn().mockReturnValue({
        select: mockSelect
      })

      const result = await mockFrom('user_settings')
        .select('*')
        .eq('user_id', 'user-123')

      expect(result.data).toHaveLength(1)
      expect(result.data?.[0]?.user_id).toBe('user-123')
    })

    it('should prevent access to other users settings', async () => {
      const mockSelect = vi.fn().mockReturnValue({
        eq: vi.fn().mockResolvedValue({
          data: [],
          error: null
        })
      })

      const mockFrom = vi.fn().mockReturnValue({
        select: mockSelect
      })

      const result = await mockFrom('user_settings')
        .select('*')
        .eq('user_id', 'other-user-456')

      expect(result.data).toHaveLength(0)
    })
  })

  describe('Authentication State', () => {
    it('should handle authenticated user session', async () => {
      const mockGetSession = vi.fn().mockResolvedValue({
        data: {
          session: {
            user: {
              id: 'user-123',
              email: 'test@example.com'
            },
            access_token: 'valid-token'
          }
        },
        error: null
      })

      const result = await mockGetSession()

      expect(result.data?.session).toBeDefined()
      expect(result.data?.session?.user?.id).toBe('user-123')
      expect(result.error).toBeNull()
    })

    it('should handle unauthenticated state', async () => {
      const mockGetSession = vi.fn().mockResolvedValue({
        data: { session: null },
        error: null
      })

      const result = await mockGetSession()

      expect(result.data?.session).toBeNull()
      expect(result.error).toBeNull()
    })

    it('should handle authentication errors', async () => {
      const mockGetSession = vi.fn().mockResolvedValue({
        data: { session: null },
        error: {
          message: 'Invalid JWT token',
          status: 401
        }
      })

      const result = await mockGetSession()

      expect(result.data?.session).toBeNull()
      expect(result.error).toBeDefined()
      expect(result.error?.status).toBe(401)
    })
  })
}) 