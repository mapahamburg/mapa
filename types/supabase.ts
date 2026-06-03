/**
 * Supabase database type definitions — hand-authored from 001_schema.sql.
 * Replace with `npx supabase gen types typescript` once project is linked.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type PostType =
  | "empfehlung"
  | "frage"
  | "treffen"
  | "suche"
  | "veranstaltung";

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          first_name: string;
          stadtteil: string;
          is_local_host: boolean;
          bio: string | null;
          can_help_with: string[];
          looking_for: string[];
          interests: string[];
          joined_at: string;
          notify_comments: boolean;
          newsletter_optin: boolean;
        };
        Insert: {
          id: string;
          first_name: string;
          stadtteil: string;
          is_local_host?: boolean;
          bio?: string | null;
          can_help_with?: string[];
          looking_for?: string[];
          interests?: string[];
          joined_at?: string;
          notify_comments?: boolean;
          newsletter_optin?: boolean;
        };
        Update: {
          id?: string;
          first_name?: string;
          stadtteil?: string;
          is_local_host?: boolean;
          bio?: string | null;
          can_help_with?: string[];
          looking_for?: string[];
          interests?: string[];
          joined_at?: string;
          notify_comments?: boolean;
          newsletter_optin?: boolean;
        };
        Relationships: [];
      };
      posts: {
        Row: {
          id: string;
          author_id: string;
          type: PostType;
          title: string;
          body: string | null;
          stadtteil: string;
          meeting_location: string | null;
          meeting_date: string | null;
          min_age: number | null;
          max_age: number | null;
          kreis_id: string | null;
          created_at: string;
          lat: number | null;
          lng: number | null;
          image_url: string | null;
        };
        Insert: {
          id?: string;
          author_id: string;
          type: PostType;
          title: string;
          body?: string | null;
          stadtteil: string;
          meeting_location?: string | null;
          meeting_date?: string | null;
          min_age?: number | null;
          max_age?: number | null;
          kreis_id?: string | null;
          created_at?: string;
          lat?: number | null;
          lng?: number | null;
          image_url?: string | null;
        };
        Update: {
          id?: string;
          author_id?: string;
          type?: PostType;
          title?: string;
          body?: string | null;
          stadtteil?: string;
          meeting_location?: string | null;
          meeting_date?: string | null;
          min_age?: number | null;
          max_age?: number | null;
          kreis_id?: string | null;
          created_at?: string;
          lat?: number | null;
          lng?: number | null;
          image_url?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_kreis_id_fkey";
            columns: ["kreis_id"];
            isOneToOne: false;
            referencedRelation: "kreise";
            referencedColumns: ["id"];
          }
        ];
      };
      kreise: {
        Row: {
          id: string;
          name: string;
          beschreibung: string | null;
          stadtteil: string;
          thema: string | null;
          max_members: number;
          status: "pending" | "active" | "closed";
          created_by: string | null;
          approved_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          beschreibung?: string | null;
          stadtteil: string;
          thema?: string | null;
          max_members?: number;
          status?: "pending" | "active" | "closed";
          created_by?: string | null;
          approved_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          beschreibung?: string | null;
          stadtteil?: string;
          thema?: string | null;
          max_members?: number;
          status?: "pending" | "active" | "closed";
          created_by?: string | null;
          approved_by?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kreise_created_by_fkey";
            columns: ["created_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kreise_approved_by_fkey";
            columns: ["approved_by"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      kreis_members: {
        Row: {
          kreis_id: string;
          profile_id: string;
          role: "member" | "host";
          status: "pending" | "active" | "removed";
          joined_at: string;
        };
        Insert: {
          kreis_id: string;
          profile_id: string;
          role?: "member" | "host";
          status?: "pending" | "active" | "removed";
          joined_at?: string;
        };
        Update: {
          kreis_id?: string;
          profile_id?: string;
          role?: "member" | "host";
          status?: "pending" | "active" | "removed";
          joined_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "kreis_members_kreis_id_fkey";
            columns: ["kreis_id"];
            isOneToOne: false;
            referencedRelation: "kreise";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "kreis_members_profile_id_fkey";
            columns: ["profile_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      comments: {
        Row: {
          id: string;
          post_id: string;
          author_id: string;
          body: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id: string;
          author_id: string;
          body: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string;
          author_id?: string;
          body?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "comments_author_id_fkey";
            columns: ["author_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      saved_posts: {
        Row: {
          user_id: string;
          post_id: string;
          saved_at: string;
        };
        Insert: {
          user_id: string;
          post_id: string;
          saved_at?: string;
        };
        Update: {
          user_id?: string;
          post_id?: string;
          saved_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "saved_posts_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "saved_posts_user_id_fkey";
            columns: ["user_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
      reports: {
        Row: {
          id: string;
          post_id: string | null;
          reporter_id: string | null;
          reason: string;
          details: string | null;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          post_id?: string | null;
          reporter_id?: string | null;
          reason: string;
          details?: string | null;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          post_id?: string | null;
          reporter_id?: string | null;
          reason?: string;
          details?: string | null;
          status?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "reports_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "reports_reporter_id_fkey";
            columns: ["reporter_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
