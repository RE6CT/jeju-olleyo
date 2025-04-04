export type Schedule = {
  id: string;
  user_id: string;
  title: string;
  description: string;
  plan_img?: string;
  start_date: string;
  end_date: string;
  public: boolean;
  created_at: string;
  public_at: string;
};

export type ScheduleCardProps = {
  schedule: Schedule;
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
};
