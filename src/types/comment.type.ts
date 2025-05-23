import { CamelCaseObject } from './common.type';
import { Database } from './supabase.type';

export type CommentsRow = Pick<
  Database['public']['Tables']['plan_comments']['Row'],
  'content' | 'created_at'
>;
export type CommentPlanRow = Pick<
  Database['public']['Tables']['plans']['Row'],
  'title' | 'plan_id'
>;
export type CommentType = {
  planCommentId: number;
  planId: number;
  userId: string;
  nickname: string;
  content: string;
  createdAt: string;
};

export type MyCommentType = CamelCaseObject<CommentsRow & CommentPlanRow>;
