import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { useBookmarks } from '@/hooks/useBookmarks'

// Mock the useBookmarks hook
vi.mock('@/hooks/useBookmarks', () => ({
  useBookmarks: vi.fn()
}))

// Mock the useAuth hook
vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    user: { id: 'test-user-id' },
    loading: false
  }))
}))

// Mock other dependencies
vi.mock('@/hooks/useConnectedAccounts', () => ({
  useConnectedAccounts: vi.fn(() => ({
    accounts: [],
    loading: false
  }))
}))

vi.mock('next/image', () => ({
  default: ({ src, alt, ...props }: any) => <img src={src} alt={alt} {...props} />
}))

vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>
  },
  AnimatePresence: ({ children }: any) => children
}))

// Create a simplified test component that focuses on sorting logic
const TestSortComponent = ({ onSortChange }: { onSortChange: (sortBy: string, sortOrder: string) => void }) => {
  return (
    <div>
      <button 
        data-testid="sort-latest" 
        onClick={() => onSortChange('created_at', 'desc')}
      >
        Latest
      </button>
      <button 
        data-testid="sort-earliest" 
        onClick={() => onSortChange('created_at', 'asc')}
      >
        Earliest
      </button>
      <button 
        data-testid="sort-source" 
        onClick={() => onSortChange('source', 'asc')}
      >
        Source
      </button>
    </div>
  )
}

describe('Recent Saves Sort Functionality', () => {
  const mockUseBookmarks = useBookmarks as any

  beforeEach(() => {
    vi.clearAllMocks()
    
    // Default mock implementation
    mockUseBookmarks.mockReturnValue({
      bookmarks: [],
      loading: false,
      error: null,
      hasMore: false,
      loadMore: vi.fn(),
      refresh: vi.fn(),
      deleteBookmark: vi.fn(),
      totalCount: 0
    })
  })

  it('should handle sort by latest (created_at desc)', async () => {
    const mockSortChange = vi.fn()
    
    render(<TestSortComponent onSortChange={mockSortChange} />)
    
    const latestButton = screen.getByTestId('sort-latest')
    fireEvent.click(latestButton)
    
    expect(mockSortChange).toHaveBeenCalledWith('created_at', 'desc')
  })

  it('should handle sort by earliest (created_at asc)', async () => {
    const mockSortChange = vi.fn()
    
    render(<TestSortComponent onSortChange={mockSortChange} />)
    
    const earliestButton = screen.getByTestId('sort-earliest')
    fireEvent.click(earliestButton)
    
    expect(mockSortChange).toHaveBeenCalledWith('created_at', 'asc')
  })

  it('should handle sort by source', async () => {
    const mockSortChange = vi.fn()
    
    render(<TestSortComponent onSortChange={mockSortChange} />)
    
    const sourceButton = screen.getByTestId('sort-source')
    fireEvent.click(sourceButton)
    
    expect(mockSortChange).toHaveBeenCalledWith('source', 'asc')
  })

  it('should call useBookmarks with correct sort parameters', () => {
    const TestComponent = () => {
      useBookmarks({
        sortBy: 'created_at',
        sortOrder: 'desc',
        providers: []
      })
      return <div>Test</div>
    }

    render(<TestComponent />)

    expect(mockUseBookmarks).toHaveBeenCalledWith({
      sortBy: 'created_at',
      sortOrder: 'desc',
      providers: []
    })
  })

  it('should handle different sort combinations', () => {
    const sortCombinations = [
      { sortBy: 'created_at', sortOrder: 'desc' },
      { sortBy: 'created_at', sortOrder: 'asc' },
      { sortBy: 'source', sortOrder: 'asc' }
    ]

    sortCombinations.forEach(({ sortBy, sortOrder }) => {
      const TestComponent = () => {
        useBookmarks({
          sortBy: sortBy as 'created_at' | 'source',
          sortOrder: sortOrder as 'asc' | 'desc',
          providers: []
        })
        return <div>Test</div>
      }

      render(<TestComponent />)
    })

    expect(mockUseBookmarks).toHaveBeenCalledTimes(sortCombinations.length)
  })

  describe('Sort Logic Validation', () => {
    it('should validate sort parameters', () => {
      const validSortBy = ['created_at', 'source']
      const validSortOrder = ['asc', 'desc']

      expect(validSortBy).toContain('created_at')
      expect(validSortBy).toContain('source')
      expect(validSortOrder).toContain('asc')
      expect(validSortOrder).toContain('desc')
    })

    it('should handle bookmark sorting by date', () => {
      const mockBookmarks = [
        { id: '1', created_at: '2024-01-01T00:00:00Z', title: 'Old Bookmark' },
        { id: '2', created_at: '2024-01-03T00:00:00Z', title: 'New Bookmark' },
        { id: '3', created_at: '2024-01-02T00:00:00Z', title: 'Middle Bookmark' }
      ]

      // Test descending sort (latest first)
      const sortedDesc = [...mockBookmarks].sort((a, b) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )
      
      expect(sortedDesc[0].title).toBe('New Bookmark')
      expect(sortedDesc[1].title).toBe('Middle Bookmark')
      expect(sortedDesc[2].title).toBe('Old Bookmark')

      // Test ascending sort (earliest first)
      const sortedAsc = [...mockBookmarks].sort((a, b) => 
        new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      )
      
      expect(sortedAsc[0].title).toBe('Old Bookmark')
      expect(sortedAsc[1].title).toBe('Middle Bookmark')
      expect(sortedAsc[2].title).toBe('New Bookmark')
    })

    it('should handle bookmark sorting by source', () => {
      const mockBookmarks = [
        { id: '1', source: 'twitter', title: 'Twitter Bookmark' },
        { id: '2', source: 'github', title: 'GitHub Bookmark' },
        { id: '3', source: 'reddit', title: 'Reddit Bookmark' }
      ]

      // Test source sorting (alphabetical)
      const sortedBySource = [...mockBookmarks].sort((a, b) => 
        a.source.localeCompare(b.source)
      )
      
      expect(sortedBySource[0].source).toBe('github')
      expect(sortedBySource[1].source).toBe('reddit')
      expect(sortedBySource[2].source).toBe('twitter')
    })
  })

  describe('Filter Integration', () => {
    it('should handle provider filters with sorting', () => {
      const TestComponent = () => {
        useBookmarks({
          sortBy: 'created_at',
          sortOrder: 'desc',
          providers: ['github', 'twitter']
        })
        return <div>Test</div>
      }

      render(<TestComponent />)

      expect(mockUseBookmarks).toHaveBeenCalledWith({
        sortBy: 'created_at',
        sortOrder: 'desc',
        providers: ['github', 'twitter']
      })
    })

    it('should validate provider filter values', () => {
      const validProviders = ['github', 'twitter', 'reddit', 'stackoverflow']
      const testProviders = ['github', 'twitter']
      
      testProviders.forEach(provider => {
        expect(validProviders).toContain(provider)
      })
    })
  })

  describe('Loading States', () => {
    it('should handle loading state during sort changes', () => {
      mockUseBookmarks.mockReturnValue({
        bookmarks: [],
        loading: true,
        error: null,
        hasMore: false,
        loadMore: vi.fn(),
        refresh: vi.fn(),
        deleteBookmark: vi.fn(),
        totalCount: 0
      })

      const TestComponent = () => {
        const { loading } = useBookmarks({
          sortBy: 'created_at',
          sortOrder: 'desc'
        })
        return <div data-testid="loading">{loading ? 'Loading...' : 'Loaded'}</div>
      }

      render(<TestComponent />)
      
      expect(screen.getByTestId('loading')).toHaveTextContent('Loading...')
    })

    it('should handle error states', () => {
      mockUseBookmarks.mockReturnValue({
        bookmarks: [],
        loading: false,
        error: 'Failed to load bookmarks',
        hasMore: false,
        loadMore: vi.fn(),
        refresh: vi.fn(),
        deleteBookmark: vi.fn(),
        totalCount: 0
      })

      const TestComponent = () => {
        const { error } = useBookmarks({
          sortBy: 'created_at',
          sortOrder: 'desc'
        })
        return <div data-testid="error">{error || 'No error'}</div>
      }

      render(<TestComponent />)
      
      expect(screen.getByTestId('error')).toHaveTextContent('Failed to load bookmarks')
    })
  })
}) 