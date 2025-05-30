/**
 * Source constants that sync with backend database enums
 * Based on provider_enum and source_enum from database.types.ts
 */

// Core sources that match backend provider_enum
export const ALL_SOURCES = [
  'github',
  'twitter', 
  'reddit',
  'stackoverflow', // maps to 'stack' in backend
  'telegram',
  'linkedin',
  'facebook',
  'medium',
  'substack'
] as const;

// Map frontend source names to backend provider types
export const SOURCE_TO_PROVIDER_MAP = {
  github: 'github',
  twitter: 'twitter',
  reddit: 'reddit',
  stackoverflow: 'stack', // stackoverflow maps to 'stack' in backend
  telegram: 'telegram',
  linkedin: 'linkedin',
  facebook: 'facebook',
  medium: 'medium', // Future enhancement
  substack: 'substack' // Future enhancement
} as const;

// Sources currently supported in backend (subset of ALL_SOURCES)
export const SUPPORTED_SOURCES = [
  'github',
  'twitter',
  'reddit', 
  'stackoverflow',
  'telegram',
  'linkedin',
  'facebook'
] as const;

// Create type from the ALL_SOURCES array
export type Source = (typeof ALL_SOURCES)[number];

// Create type for supported sources only
export type SupportedSource = (typeof SUPPORTED_SOURCES)[number];

// Source display names for UI
export const SOURCE_DISPLAY_NAMES: Record<Source, string> = {
  github: 'GitHub',
  twitter: 'Twitter',
  reddit: 'Reddit',
  stackoverflow: 'Stack Overflow',
  telegram: 'Telegram',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  medium: 'Medium',
  substack: 'Substack'
};

// Source descriptions for UI
export const SOURCE_DESCRIPTIONS: Record<Source, string> = {
  github: 'Starred repositories and code bookmarks',
  twitter: 'Bookmarked tweets and threads',
  reddit: 'Saved posts and comments',
  stackoverflow: 'Bookmarked questions and answers',
  telegram: 'Saved messages and content',
  linkedin: 'Saved posts and articles',
  facebook: 'Saved posts and content',
  medium: 'Bookmarked articles and stories',
  substack: 'Saved newsletters and posts'
};

/**
 * Get backend provider name from frontend source
 */
export function getBackendProvider(source: Source): string {
  return SOURCE_TO_PROVIDER_MAP[source] || source;
}

/**
 * Check if source is currently supported in backend
 */
export function isSourceSupported(source: Source): source is SupportedSource {
  return SUPPORTED_SOURCES.includes(source as SupportedSource);
}

/**
 * Get all supported sources for filter UI
 */
export function getSupportedSources(): readonly SupportedSource[] {
  return SUPPORTED_SOURCES;
}

/**
 * Get source display name
 */
export function getSourceDisplayName(source: Source): string {
  return SOURCE_DISPLAY_NAMES[source] || source;
}

/**
 * Get source description
 */
export function getSourceDescription(source: Source): string {
  return SOURCE_DESCRIPTIONS[source] || 'Bookmarked content';
} 