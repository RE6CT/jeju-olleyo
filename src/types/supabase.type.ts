import { CommentPlanRow, CommentsRow } from './comment.type';
import { CommunitySortType } from './community.type';
import { PlansRow, UsersRow } from './plan.type';

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      bookmarks: {
        Row: {
          bookmark_id: number;
          created_at: string;
          place_id: number;
          user_id: string;
        };
        Insert: {
          bookmark_id?: number;
          created_at?: string;
          place_id: number;
          user_id: string;
        };
        Update: {
          bookmark_id?: number;
          created_at?: string;
          place_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'bookmarks_place_id_fkey';
            columns: ['place_id'];
            isOneToOne: false;
            referencedRelation: 'places';
            referencedColumns: ['place_id'];
          },
          {
            foreignKeyName: 'fk_bookmarks_users';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      days: {
        Row: {
          created_at: string | null;
          day: number | null;
          day_id: number;
          plan_id: number;
        };
        Insert: {
          created_at?: string | null;
          day?: number | null;
          day_id?: never;
          plan_id: number;
        };
        Update: {
          created_at?: string | null;
          day?: number | null;
          day_id?: never;
          plan_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_days_plans';
            columns: ['plan_id'];
            isOneToOne: false;
            referencedRelation: 'plans';
            referencedColumns: ['plan_id'];
          },
        ];
      };
      locations: {
        Row: {
          created_at: string | null;
          day_id: number;
          location_id: number;
          visit_order: number | null;
        };
        Insert: {
          created_at?: string | null;
          day_id: number;
          location_id?: never;
          visit_order?: number | null;
        };
        Update: {
          created_at?: string | null;
          day_id?: number;
          location_id?: never;
          visit_order?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_locations_days';
            columns: ['day_id'];
            isOneToOne: false;
            referencedRelation: 'days';
            referencedColumns: ['day_id'];
          },
        ];
      };
      main_carousel_images: {
        Row: {
          display_order: number;
          id: number;
          image_url: string;
          is_active: boolean;
          link_url: string;
          title: string | null;
        };
        Insert: {
          display_order: number;
          id?: number;
          image_url: string;
          is_active: boolean;
          link_url: string;
          title?: string | null;
        };
        Update: {
          display_order?: number;
          id?: number;
          image_url?: string;
          is_active?: boolean;
          link_url?: string;
          title?: string | null;
        };
        Relationships: [];
      };
      places: {
        Row: {
          address: string;
          category: string;
          content_type_id: number;
          id: number;
          image: string | null;
          lat: number;
          lng: number;
          place_id: number;
          title: string;
        };
        Insert: {
          address: string;
          category: string;
          content_type_id: number;
          id?: never;
          image?: string | null;
          lat: number;
          lng: number;
          place_id: number;
          title: string;
        };
        Update: {
          address?: string;
          category?: string;
          content_type_id?: number;
          id?: never;
          image?: string | null;
          lat?: number;
          lng?: number;
          place_id?: number;
          title?: string;
        };
        Relationships: [];
      };
      plan_comments: {
        Row: {
          content: string;
          created_at: string;
          plan_comment_id: number;
          plan_id: number;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string;
          plan_comment_id?: never;
          plan_id: number;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string;
          plan_comment_id?: never;
          plan_id?: number;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_plan_comments_plans';
            columns: ['plan_id'];
            isOneToOne: false;
            referencedRelation: 'plans';
            referencedColumns: ['plan_id'];
          },
          {
            foreignKeyName: 'fk_plan_comments_users';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      plan_likes: {
        Row: {
          created_at: string | null;
          plan_id: number;
          plan_like_id: number;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          plan_id: number;
          plan_like_id?: never;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          plan_id?: number;
          plan_like_id?: never;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_plan_likes_plans';
            columns: ['plan_id'];
            isOneToOne: false;
            referencedRelation: 'plans';
            referencedColumns: ['plan_id'];
          },
          {
            foreignKeyName: 'fk_plan_likes_users';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      plans: {
        Row: {
          created_at: string;
          description: string | null;
          plan_id: number;
          plan_img: string | null;
          public: boolean | null;
          public_at: string | null;
          title: string;
          travel_end_date: string;
          travel_start_date: string;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          plan_id?: never;
          plan_img?: string | null;
          public?: boolean | null;
          public_at?: string | null;
          title: string;
          travel_end_date: string;
          travel_start_date: string;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          plan_id?: never;
          plan_img?: string | null;
          public?: boolean | null;
          public_at?: string | null;
          title?: string;
          travel_end_date?: string;
          travel_start_date?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_plans_users';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      tickets: {
        Row: {
          airplane_name: string | null;
          arrive_location: string | null;
          arrive_time: string | null;
          carrier_code: string | null;
          created_at: string | null;
          departure_location: string | null;
          departure_time: string | null;
          price: number | null;
          ticket_id: number;
          user_id: string;
        };
        Insert: {
          airplane_name?: string | null;
          arrive_location?: string | null;
          arrive_time?: string | null;
          carrier_code?: string | null;
          created_at?: string | null;
          departure_location?: string | null;
          departure_time?: string | null;
          price?: number | null;
          ticket_id?: never;
          user_id: string;
        };
        Update: {
          airplane_name?: string | null;
          arrive_location?: string | null;
          arrive_time?: string | null;
          carrier_code?: string | null;
          created_at?: string | null;
          departure_location?: string | null;
          departure_time?: string | null;
          price?: number | null;
          ticket_id?: never;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'fk_tickets_users';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['user_id'];
          },
        ];
      };
      users: {
        Row: {
          created_at: string;
          email: string;
          nickname: string;
          phone: string | null;
          profile_img: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          nickname?: string;
          phone?: string | null;
          profile_img?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          nickname?: string;
          phone?: string | null;
          profile_img?: string | null;
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      get_plans_by_place_id: {
        Args: {
          input_place_id: number;
          user_id_param: string;
        };
        Returns: {
          plan_id: number;
          title: string;
          description: string;
          plan_img: string;
          travel_start_date: string;
          travel_end_date: string;
          like_count: number;
          nickname: string;
          is_liked: boolean;
        }[];
      };
      get_user_bookmarks: {
        Args: { user_id_param: string };
        Returns: {
          place_id: number;
          title: string;
          image: string;
          created_at: string;
          category: string;
        }[];
      };
      get_user_likes: {
        Args: { user_id_param: string };
        Returns: (PlansRow & UsersRow & { is_liked: boolean })[];
      };
      get_user_plans: {
        Args: { user_id_param: string };
        Returns: (PlansRow & UsersRow & { is_liked: boolean })[];
      };
      get_user_comments: {
        Args: { user_id_param: string };
        Returns: (CommentsRow & CommentPlanRow)[];
      };
      get_user_data_counts: {
        Args: { user_id_param: string };
        Returns: {
          bookmark_count: number;
          like_count: number;
          comment_count: number;
        };
      };
      get_plans: {
        Args: {
          user_id_param: string | null;
          sort_option?: CommunitySortType;
        };
        Returns: {
          plan_id: number;
          plan_img: string;
          title: string;
          description: string;
          nickname: string;
          travel_start_date: string;
          travel_end_date: string;
          is_liked: boolean;
        }[];
      };
      get_places: {
        Args: { user_id_param: string | null };
        Returns: {
          place_id: number;
          title: string;
          image: string;
          address: string;
          content_type: number;
          is_liked: boolean;
        }[];
      };
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DefaultSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      Database[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] &
        DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema['Tables']
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions['schema']]['Tables']
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema['Tables']
    ? DefaultSchema['Tables'][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema['Enums']
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions['schema']]['Enums'][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema['Enums']
    ? DefaultSchema['Enums'][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema['CompositeTypes']
    ? DefaultSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {},
  },
} as const;
