import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { TEXT } from '@/constants/plan.constants';
import { EditAndDeleteDropdownProps } from '@/types/common.type';
import { Pencil, Trash2 } from 'lucide-react';

const PlanDropdown = ({
  plan,
  onEdit,
  onDelete,
  children,
}: EditAndDeleteDropdownProps) => {
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
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default PlanDropdown;
