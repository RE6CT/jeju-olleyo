import EditIcon from '@/components/icons/edit-icon';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ProfileImageButtonProps } from '@/types/mypage.type';

const BUTTON_STYLE =
  'absolute bottom-0 right-0 h-8 w-8 rounded-full bg-white hover:bg-gray-50 shadow-button focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0 flex items-center justify-center';

const DROPDOWN_STYLE = {
  box: 'border-none rounded-[12px] py-2 px-2 shadow-dropdown',
  item: 'm-0 py-2 px-2 medium-16',
};

/**
 * 프로필 이미지 변경 버튼 컴포넌트
 * @param onEdit - 프로필 이미지 수정 버튼 핸들러 함수
 * @param onDelete - 프로필 이미지 삭제 버튼 핸들러 함수
 */
const ProfileImageButton = ({ onEdit, onDelete }: ProfileImageButtonProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={BUTTON_STYLE}>
          <EditIcon fill="gray-900" size={18} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={DROPDOWN_STYLE.box}>
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={onEdit} className={DROPDOWN_STYLE.item}>
            사진 변경
          </DropdownMenuItem>
          <Separator className="my-1" />
          <DropdownMenuItem onClick={onDelete} className={DROPDOWN_STYLE.item}>
            기본 이미지로 변경
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileImageButton;
