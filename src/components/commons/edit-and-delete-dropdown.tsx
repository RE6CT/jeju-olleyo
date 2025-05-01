import { Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';

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
  onDelete,
  children,
}: {
  plan: Plan;
  onDelete: (planId: number) => void;
  children: React.ReactNode;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dropdown-menu">
        <Link href={`/plan-detail/${plan.planId}?isReadOnly=false`}>
          <DropdownMenuItem>
            <Pencil className="mr-2 h-4 w-4" />
            {TEXT.edit}
          </DropdownMenuItem>
        </Link>
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
