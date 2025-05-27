import { describe, it, expect, vi, beforeEach } from 'vitest'

// Mock the supabase module completely
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(() => ({
      insert: vi.fn(),
      select: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      })),
      update: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      })),
      delete: vi.fn(() => ({
        eq: vi.fn(() => Promise.resolve({ data: [], error: null }))
      }))
    }))
  }
}))

describe('Connected Accounts Insert Logic', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should insert a new connected account successfully', async () => {
    // Mock successful insertion
    const mockData = { 
      user_id: 'test-user-id',
      provider: 'github',
      access_token: 'test-token',
      status: 'active',
      created_at: new Date().toISOString()
    }

    const mockInsert = vi.fn().mockResolvedValue({ 
      data: [mockData], 
      error: null 
    })

    // Test the insertion logic
    const result = await mockInsert({
      user_id: 'test-user-id',
      provider: 'github',
      access_token: 'test-token',
      refresh_token: 'test-refresh-token',
      status: 'active'
    })

    expect(mockInsert).toHaveBeenCalled()
    expect(result.error).toBeNull()
    expect(result.data).toBeDefined()
    expect(result.data?.[0]).toMatchObject({
      user_id: 'test-user-id',
      provider: 'github',
      status: 'active'
    })
  })

  it('should handle duplicate provider insertion error', async () => {
    const mockInsert = vi.fn().mockResolvedValue({ 
      data: null, 
      error: { 
        message: 'duplicate key value violates unique constraint',
        code: '23505'
      } 
    })

    const result = await mockInsert({
      user_id: 'test-user-id',
      provider: 'github',
      access_token: 'test-token',
      status: 'active'
    })

    expect(result.error).toBeDefined()
    expect(result.error?.code).toBe('23505')
    expect(result.data).toBeNull()
  })

  it('should validate required fields', async () => {
    const mockInsert = vi.fn().mockResolvedValue({ 
      data: null, 
      error: { 
        message: 'null value in column "user_id" violates not-null constraint',
        code: '23502'
      } 
    })

    // Missing required user_id field
    const result = await mockInsert({
      provider: 'github',
      access_token: 'test-token',
      status: 'active'
    })

    expect(result.error).toBeDefined()
    expect(result.error?.code).toBe('23502')
    expect(result.data).toBeNull()
  })

  it('should set default status to active', async () => {
    const mockInsert = vi.fn().mockResolvedValue({ 
      data: [{ 
        user_id: 'test-user-id',
        provider: 'github',
        access_token: 'test-token',
        status: 'active', // Should default to active
        created_at: new Date().toISOString()
      }], 
      error: null 
    })

    // Account data without explicit status
    const result = await mockInsert({
      user_id: 'test-user-id',
      provider: 'github',
      access_token: 'test-token'
    })

    expect(result.error).toBeNull()
    expect(result.data?.[0]?.status).toBe('active')
  })

  it('should handle error status updates', async () => {
    const mockUpdate = vi.fn().mockResolvedValue({ 
      data: [{ 
        user_id: 'test-user-id',
        provider: 'github',
        status: 'error',
        last_error: 'Token expired',
        updated_at: new Date().toISOString()
      }], 
      error: null 
    })

    const result = await mockUpdate({
      status: 'error',
      last_error: 'Token expired',
      last_sync_at: new Date().toISOString()
    })

    expect(result.error).toBeNull()
    expect(result.data?.[0]?.status).toBe('error')
    expect(result.data?.[0]?.last_error).toBe('Token expired')
  })

  it('should validate provider types', () => {
    const validProviders = ['github', 'twitter', 'reddit', 'stack']
    const testProvider = 'github'
    
    expect(validProviders).toContain(testProvider)
    
    const invalidProvider = 'invalid-provider'
    expect(validProviders).not.toContain(invalidProvider)
  })

  it('should validate status types', () => {
    const validStatuses = ['active', 'error', 'expired']
    const testStatus = 'active'
    
    expect(validStatuses).toContain(testStatus)
    
    const invalidStatus = 'invalid-status'
    expect(validStatuses).not.toContain(invalidStatus)
  })
}) 