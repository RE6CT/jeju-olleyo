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
          created_at: string | null;
          place: number | null;
          place_lat: number;
          place_lng: number;
          user_id: string;
        };
        Insert: {
          bookmark_id?: never;
          created_at?: string | null;
          place?: number | null;
          place_lat: number;
          place_lng: number;
          user_id: string;
        };
        Update: {
          bookmark_id?: never;
          created_at?: string | null;
          place?: number | null;
          place_lat?: number;
          place_lng?: number;
          user_id?: string;
        };
        Relationships: [
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
      plan_comments: {
        Row: {
          content: string;
          created_at: string | null;
          plan_comment_id: number;
          plan_id: number;
          user_id: string;
        };
        Insert: {
          content: string;
          created_at?: string | null;
          plan_comment_id?: never;
          plan_id: number;
          user_id: string;
        };
        Update: {
          content?: string;
          created_at?: string | null;
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
          title: string | null;
          travel_end_date: string | null;
          travel_start_date: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          plan_id?: never;
          plan_img?: string | null;
          public?: boolean | null;
          public_at?: string | null;
          title?: string | null;
          travel_end_date?: string | null;
          travel_start_date?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          plan_id?: never;
          plan_img?: string | null;
          public?: boolean | null;
          public_at?: string | null;
          title?: string | null;
          travel_end_date?: string | null;
          travel_start_date?: string | null;
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
          created_at: string | null;
          email: string;
          nickname: string | null;
          phone: string | null;
          profile_img: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string | null;
          email: string;
          nickname?: string | null;
          phone?: string | null;
          profile_img?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string | null;
          email?: string;
          nickname?: string | null;
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
      get_user_bookmarks: {
        Args: { user_id_param: string };
        Returns: {
          place_id: number;
          title: string;
          image: string;
          created_at: string;
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

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema['Tables'] & PublicSchema['Views'])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] &
        PublicSchema['Views'])
    ? (PublicSchema['Tables'] &
        PublicSchema['Views'])[PublicTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema['Tables']
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
    ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema['Enums']
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
    ? PublicSchema['Enums'][PublicEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema['CompositeTypes']
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes']
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions['schema']]['CompositeTypes'][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema['CompositeTypes']
    ? PublicSchema['CompositeTypes'][PublicCompositeTypeNameOrOptions]
    : never;
