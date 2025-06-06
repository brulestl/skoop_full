export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          metadata: Json | null
          provider_item_id: number | null
          source: Database["public"]["Enums"]["provider_type"] | null
          summary: string | null
          summary_detailed: string | null
          sync_type: string | null
          tags: string[] | null
          title: string | null
          updated_at: string | null
          url: string | null
          user_id: string | null
          vector: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          provider_item_id?: number | null
          source?: Database["public"]["Enums"]["provider_type"] | null
          summary?: string | null
          summary_detailed?: string | null
          sync_type?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
          vector?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          metadata?: Json | null
          provider_item_id?: number | null
          source?: Database["public"]["Enums"]["provider_type"] | null
          summary?: string | null
          summary_detailed?: string | null
          sync_type?: string | null
          tags?: string[] | null
          title?: string | null
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
          vector?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      bookmarks_raw: {
        Row: {
          created_at: string | null
          fetched_at: string | null
          id: string
          provider_item_id: number | null
          raw_json: Json
          source: Database["public"]["Enums"]["provider_type"]
          text: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          fetched_at?: string | null
          id?: string
          provider_item_id?: number | null
          raw_json: Json
          source: Database["public"]["Enums"]["provider_type"]
          text?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          fetched_at?: string | null
          id?: string
          provider_item_id?: number | null
          raw_json?: Json
          source?: Database["public"]["Enums"]["provider_type"]
          text?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookmarks_raw_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      cluster_resources: {
        Row: {
          cluster_id: string
          resource_id: string
        }
        Insert: {
          cluster_id: string
          resource_id: string
        }
        Update: {
          cluster_id?: string
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "cluster_resources_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "clusters"
            referencedColumns: ["id"]
          },
        ]
      }
      clusters: {
        Row: {
          created_at: string
          description: string | null
          filter_tags: string[]
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          filter_tags?: string[]
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          description?: string | null
          filter_tags?: string[]
          id?: string
          name?: string
        }
        Relationships: []
      }
      collection_items: {
        Row: {
          bookmark_id: string
          collection_id: string
          created_at: string
          id: string
        }
        Insert: {
          bookmark_id: string
          collection_id: string
          created_at?: string
          id?: string
        }
        Update: {
          bookmark_id?: string
          collection_id?: string
          created_at?: string
          id?: string
        }
        Relationships: []
      }
      collections: {
        Row: {
          color: string | null
          created_at: string | null
          description: string | null
          id: string
          is_public: boolean | null
          name: string
          pinned: boolean | null
          type: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name: string
          pinned?: boolean | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          color?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_public?: boolean | null
          name?: string
          pinned?: boolean | null
          type?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "collections_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      connected_accounts: {
        Row: {
          access_token: string
          avatar_url: string | null
          connected_at: string
          created_at: string | null
          display_name: string | null
          expires_at: string | null
          last_error: string | null
          last_sync_at: string | null
          last_sync_message_id: number | null
          provider: Database["public"]["Enums"]["provider_type"]
          provider_user_id: string | null
          refresh_token: string | null
          status: string | null
          telegram_session_string: string | null
          updated_at: string | null
          user_id: string
          username: string | null
        }
        Insert: {
          access_token: string
          avatar_url?: string | null
          connected_at?: string
          created_at?: string | null
          display_name?: string | null
          expires_at?: string | null
          last_error?: string | null
          last_sync_at?: string | null
          last_sync_message_id?: number | null
          provider: Database["public"]["Enums"]["provider_type"]
          provider_user_id?: string | null
          refresh_token?: string | null
          status?: string | null
          telegram_session_string?: string | null
          updated_at?: string | null
          user_id: string
          username?: string | null
        }
        Update: {
          access_token?: string
          avatar_url?: string | null
          connected_at?: string
          created_at?: string | null
          display_name?: string | null
          expires_at?: string | null
          last_error?: string | null
          last_sync_at?: string | null
          last_sync_message_id?: number | null
          provider?: Database["public"]["Enums"]["provider_type"]
          provider_user_id?: string | null
          refresh_token?: string | null
          status?: string | null
          telegram_session_string?: string | null
          updated_at?: string | null
          user_id?: string
          username?: string | null
        }
        Relationships: []
      }
      content_columns: {
        Row: {
          config: Json | null
          created_at: string | null
          id: string
          label: string
          provider: Database["public"]["Enums"]["provider_type"]
          query: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          config?: Json | null
          created_at?: string | null
          id?: string
          label: string
          provider: Database["public"]["Enums"]["provider_type"]
          query: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          config?: Json | null
          created_at?: string | null
          id?: string
          label?: string
          provider?: Database["public"]["Enums"]["provider_type"]
          query?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "content_columns_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcard_reviews: {
        Row: {
          correct: boolean | null
          flashcard_id: string | null
          id: number
          reviewed_at: string | null
          user_id: string | null
        }
        Insert: {
          correct?: boolean | null
          flashcard_id?: string | null
          id?: number
          reviewed_at?: string | null
          user_id?: string | null
        }
        Update: {
          correct?: boolean | null
          flashcard_id?: string | null
          id?: number
          reviewed_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcard_reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      flashcards: {
        Row: {
          back_content: string
          created_at: string | null
          difficulty_level: number | null
          front_content: string
          id: string
          last_reviewed_at: string | null
          next_review_at: string | null
          resource_id: string | null
          review_count: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          back_content: string
          created_at?: string | null
          difficulty_level?: number | null
          front_content: string
          id?: string
          last_reviewed_at?: string | null
          next_review_at?: string | null
          resource_id?: string | null
          review_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          back_content?: string
          created_at?: string | null
          difficulty_level?: number | null
          front_content?: string
          id?: string
          last_reviewed_at?: string | null
          next_review_at?: string | null
          resource_id?: string | null
          review_count?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "flashcards_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      fresh_content: {
        Row: {
          column_id: string | null
          created_at: string | null
          id: string
          payload: Json
          summary: string | null
          user_id: string | null
          vector: string | null
        }
        Insert: {
          column_id?: string | null
          created_at?: string | null
          id?: string
          payload: Json
          summary?: string | null
          user_id?: string | null
          vector?: string | null
        }
        Update: {
          column_id?: string | null
          created_at?: string | null
          id?: string
          payload?: Json
          summary?: string | null
          user_id?: string | null
          vector?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fresh_content_column_id_fkey"
            columns: ["column_id"]
            isOneToOne: false
            referencedRelation: "content_columns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fresh_content_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active_sessions: number
          avatar_url: string | null
          flashcards_mastered: number
          id: string
          streak: number
          updated_at: string | null
          username: string | null
        }
        Insert: {
          active_sessions?: number
          avatar_url?: string | null
          flashcards_mastered?: number
          id: string
          streak?: number
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          active_sessions?: number
          avatar_url?: string | null
          flashcards_mastered?: number
          id?: string
          streak?: number
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      resource_collections: {
        Row: {
          collection_id: string
          created_at: string | null
          resource_id: string
        }
        Insert: {
          collection_id: string
          created_at?: string | null
          resource_id: string
        }
        Update: {
          collection_id?: string
          created_at?: string | null
          resource_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_collections_collection_id_fkey"
            columns: ["collection_id"]
            isOneToOne: false
            referencedRelation: "collections"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_collections_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_tags: {
        Row: {
          created_at: string | null
          resource_id: string
          tag_id: string
        }
        Insert: {
          created_at?: string | null
          resource_id: string
          tag_id: string
        }
        Update: {
          created_at?: string | null
          resource_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resource_tags_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "tags"
            referencedColumns: ["id"]
          },
        ]
      }
      resource_views: {
        Row: {
          id: number
          resource_id: string | null
          user_id: string | null
          viewed_at: string | null
        }
        Insert: {
          id?: number
          resource_id?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Update: {
          id?: number
          resource_id?: string | null
          user_id?: string | null
          viewed_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_views_resource_id_fkey"
            columns: ["resource_id"]
            isOneToOne: false
            referencedRelation: "resources"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_views_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      resources: {
        Row: {
          content: string | null
          created_at: string | null
          data: Json | null
          date_saved: string | null
          description: string | null
          embedding: string | null
          external_id: string | null
          id: string
          imported_at: string | null
          metadata: Json | null
          platform: string | null
          source: string
          source_id: string
          thumbnail: string | null
          title: string
          type: Database["public"]["Enums"]["resource_type"]
          updated_at: string | null
          url: string | null
          user_id: string | null
        }
        Insert: {
          content?: string | null
          created_at?: string | null
          data?: Json | null
          date_saved?: string | null
          description?: string | null
          embedding?: string | null
          external_id?: string | null
          id?: string
          imported_at?: string | null
          metadata?: Json | null
          platform?: string | null
          source: string
          source_id: string
          thumbnail?: string | null
          title: string
          type: Database["public"]["Enums"]["resource_type"]
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string | null
          created_at?: string | null
          data?: Json | null
          date_saved?: string | null
          description?: string | null
          embedding?: string | null
          external_id?: string | null
          id?: string
          imported_at?: string | null
          metadata?: Json | null
          platform?: string | null
          source?: string
          source_id?: string
          thumbnail?: string | null
          title?: string
          type?: Database["public"]["Enums"]["resource_type"]
          updated_at?: string | null
          url?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resources_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sessions: {
        Row: {
          completed_at: string | null
          id: string
          resource_ids: string[]
          started_at: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          id?: string
          resource_ids?: string[]
          started_at?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          id?: string
          resource_ids?: string[]
          started_at?: string
          user_id?: string
        }
        Relationships: []
      }
      social_credentials: {
        Row: {
          access_token: string
          created_at: string
          id: string
          platform: string
          provider_user_id: string
          refresh_token: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          access_token: string
          created_at?: string
          id?: string
          platform: string
          provider_user_id: string
          refresh_token?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          access_token?: string
          created_at?: string
          id?: string
          platform?: string
          provider_user_id?: string
          refresh_token?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "social_credentials_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      study_sessions: {
        Row: {
          cards_reviewed: number | null
          correct_answers: number | null
          ended_at: string | null
          id: string
          last_study_date: string | null
          started_at: string | null
          streak_days: number | null
          user_id: string | null
        }
        Insert: {
          cards_reviewed?: number | null
          correct_answers?: number | null
          ended_at?: string | null
          id?: string
          last_study_date?: string | null
          started_at?: string | null
          streak_days?: number | null
          user_id?: string | null
        }
        Update: {
          cards_reviewed?: number | null
          correct_answers?: number | null
          ended_at?: string | null
          id?: string
          last_study_date?: string | null
          started_at?: string | null
          streak_days?: number | null
          user_id?: string | null
        }
        Relationships: []
      }
      support_requests: {
        Row: {
          admin_notes: string | null
          created_at: string | null
          id: string
          processed_at: string | null
          processed_by: string | null
          request_data: Json
          request_type: string
          status: string | null
          updated_at: string | null
          user_email: string
          user_id: string | null
        }
        Insert: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          request_data: Json
          request_type: string
          status?: string | null
          updated_at?: string | null
          user_email: string
          user_id?: string | null
        }
        Update: {
          admin_notes?: string | null
          created_at?: string | null
          id?: string
          processed_at?: string | null
          processed_by?: string | null
          request_data?: Json
          request_type?: string
          status?: string | null
          updated_at?: string | null
          user_email?: string
          user_id?: string | null
        }
        Relationships: []
      }
      sync_history: {
        Row: {
          completed_at: string | null
          created_at: string | null
          error_message: string | null
          id: string
          items_synced: number | null
          provider: string
          started_at: string | null
          status: string
          sync_type: string
          user_id: string
        }
        Insert: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          items_synced?: number | null
          provider: string
          started_at?: string | null
          status: string
          sync_type?: string
          user_id: string
        }
        Update: {
          completed_at?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          items_synced?: number | null
          provider?: string
          started_at?: string | null
          status?: string
          sync_type?: string
          user_id?: string
        }
        Relationships: []
      }
      tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          aggressive_prefetch_enabled: boolean | null
          ai_model: string | null
          background_sync_enabled: boolean | null
          cache_duration: string | null
          cache_size_mb: number | null
          created_at: string | null
          data_saving_mode_enabled: boolean | null
          document_chunking_enabled: boolean | null
          email_notifications_enabled: boolean | null
          embedding_model: string | null
          enabled_providers: string[] | null
          last_updated: string | null
          new_content_recommendations: boolean | null
          notifications_enabled: boolean | null
          re_embedding_schedule: string | null
          smart_search_enabled: boolean | null
          sync_completed_notifications: boolean | null
          sync_schedule: string
          user_id: string
          vector_dimensions: number | null
        }
        Insert: {
          aggressive_prefetch_enabled?: boolean | null
          ai_model?: string | null
          background_sync_enabled?: boolean | null
          cache_duration?: string | null
          cache_size_mb?: number | null
          created_at?: string | null
          data_saving_mode_enabled?: boolean | null
          document_chunking_enabled?: boolean | null
          email_notifications_enabled?: boolean | null
          embedding_model?: string | null
          enabled_providers?: string[] | null
          last_updated?: string | null
          new_content_recommendations?: boolean | null
          notifications_enabled?: boolean | null
          re_embedding_schedule?: string | null
          smart_search_enabled?: boolean | null
          sync_completed_notifications?: boolean | null
          sync_schedule?: string
          user_id: string
          vector_dimensions?: number | null
        }
        Update: {
          aggressive_prefetch_enabled?: boolean | null
          ai_model?: string | null
          background_sync_enabled?: boolean | null
          cache_duration?: string | null
          cache_size_mb?: number | null
          created_at?: string | null
          data_saving_mode_enabled?: boolean | null
          document_chunking_enabled?: boolean | null
          email_notifications_enabled?: boolean | null
          embedding_model?: string | null
          enabled_providers?: string[] | null
          last_updated?: string | null
          new_content_recommendations?: boolean | null
          notifications_enabled?: boolean | null
          re_embedding_schedule?: string | null
          smart_search_enabled?: boolean | null
          sync_completed_notifications?: boolean | null
          sync_schedule?: string
          user_id?: string
          vector_dimensions?: number | null
        }
        Relationships: []
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          display_name?: string | null
          email?: string
          full_name?: string | null
          id?: string
          role?: Database["public"]["Enums"]["user_role"] | null
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      binary_quantize: {
        Args: { "": string } | { "": unknown }
        Returns: unknown
      }
      citext: {
        Args: { "": boolean } | { "": string } | { "": unknown }
        Returns: string
      }
      citext_hash: {
        Args: { "": string }
        Returns: number
      }
      citextin: {
        Args: { "": unknown }
        Returns: string
      }
      citextout: {
        Args: { "": string }
        Returns: unknown
      }
      citextrecv: {
        Args: { "": unknown }
        Returns: string
      }
      citextsend: {
        Args: { "": string }
        Returns: string
      }
      gtrgm_compress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_decompress: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_in: {
        Args: { "": unknown }
        Returns: unknown
      }
      gtrgm_options: {
        Args: { "": unknown }
        Returns: undefined
      }
      gtrgm_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_avg: {
        Args: { "": number[] }
        Returns: unknown
      }
      halfvec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      halfvec_send: {
        Args: { "": unknown }
        Returns: string
      }
      halfvec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      hnsw_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnsw_sparsevec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      hnswhandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_bit_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflat_halfvec_support: {
        Args: { "": unknown }
        Returns: unknown
      }
      ivfflathandler: {
        Args: { "": unknown }
        Returns: unknown
      }
      l2_norm: {
        Args: { "": unknown } | { "": unknown }
        Returns: number
      }
      l2_normalize: {
        Args: { "": string } | { "": unknown } | { "": unknown }
        Returns: string
      }
      set_limit: {
        Args: { "": number }
        Returns: number
      }
      show_limit: {
        Args: Record<PropertyKey, never>
        Returns: number
      }
      show_trgm: {
        Args: { "": string }
        Returns: string[]
      }
      sparsevec_out: {
        Args: { "": unknown }
        Returns: unknown
      }
      sparsevec_send: {
        Args: { "": unknown }
        Returns: string
      }
      sparsevec_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
      update_user_profile: {
        Args: {
          user_id: string
          new_full_name?: string
          new_display_name?: string
          new_avatar_url?: string
          new_bio?: string
        }
        Returns: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          display_name: string | null
          email: string
          full_name: string | null
          id: string
          role: Database["public"]["Enums"]["user_role"] | null
          updated_at: string | null
        }
      }
      vector_avg: {
        Args: { "": number[] }
        Returns: string
      }
      vector_dims: {
        Args: { "": string } | { "": unknown }
        Returns: number
      }
      vector_norm: {
        Args: { "": string }
        Returns: number
      }
      vector_out: {
        Args: { "": string }
        Returns: unknown
      }
      vector_send: {
        Args: { "": string }
        Returns: string
      }
      vector_typmod_in: {
        Args: { "": unknown[] }
        Returns: number
      }
    }
    Enums: {
      collection_type: "manual" | "ai"
      provider_enum:
        | "github"
        | "twitter"
        | "reddit"
        | "stack"
        | "linkedin"
        | "facebook"
        | "telegram"
      provider_type: "github" | "twitter" | "reddit" | "stack" | "telegram"
      resource_source: "tweet" | "article" | "video" | "web" | "pdf"
      resource_type: "article" | "video" | "book" | "course" | "other"
      source_enum:
        | "github_starred"
        | "twitter_bookmarks"
        | "reddit_saved"
        | "stack_bookmarks"
        | "linkedin_saved"
        | "facebook_saved"
        | "telegram_saved"
        | "telegram"
      user_plan: "free" | "pro" | "team"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      collection_type: ["manual", "ai"],
      provider_enum: [
        "github",
        "twitter",
        "reddit",
        "stack",
        "linkedin",
        "facebook",
        "telegram",
      ],
      provider_type: ["github", "twitter", "reddit", "stack", "telegram"],
      resource_source: ["tweet", "article", "video", "web", "pdf"],
      resource_type: ["article", "video", "book", "course", "other"],
      source_enum: [
        "github_starred",
        "twitter_bookmarks",
        "reddit_saved",
        "stack_bookmarks",
        "linkedin_saved",
        "facebook_saved",
        "telegram_saved",
        "telegram",
      ],
      user_plan: ["free", "pro", "team"],
      user_role: ["user", "admin"],
    },
  },
} as const
