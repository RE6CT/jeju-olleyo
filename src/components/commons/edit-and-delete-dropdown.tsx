import { Pencil, Trash2 } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TEXT } from '@/constants/plan.constants';
import { Plan } from '@/types/plan.type';

const PlanDropdown = ({
  plan,
  onEdit,
  onDelete,
  onUpdate,
  children,
}: {
  plan: Plan;
  onEdit: (planId: number) => void;
  onDelete: (planId: number) => void;
  onUpdate?: (plan: Plan) => void;
  children: React.ReactNode;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {onEdit && (
          <DropdownMenuItem onClick={() => onEdit(plan.planId)}>
            <Pencil className="mr-2 h-4 w-4" />
            {TEXT.edit}
          </DropdownMenuItem>
        )}
        {onDelete && (
          <DropdownMenuItem
            onClick={() => onDelete(plan.planId)}
            className="text-destructive"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            {TEXT.delete}
          </DropdownMenuItem>
        )}
        {onUpdate && (
          <DropdownMenuItem onClick={() => onUpdate(plan)}>
            <Pencil className="mr-2 h-4 w-4" />
            {TEXT.update}
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlanDropdown;
