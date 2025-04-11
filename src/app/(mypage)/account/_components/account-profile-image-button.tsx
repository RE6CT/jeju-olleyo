import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';
import { ProfileImageButtonProps } from '@/types/mypage.type';

// TODO - shadcn 버튼 수정 - bg, hover:bg, shadow
const BUTTON_STYLE =
  "absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[url('/icons/edit.svg')] bg-center bg-no-repeat [background-size:18px_18px] bg-white hover:bg-gray-50 shadow-button focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0";

// ! rounded-12 적용되지 않는 문제
const DROPDOWN_STYLE = {
  box: 'border-none rounded-[12px] py-2 px-2 shadow-dropdown',
  item: 'm-0 py-2 px-2',
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
        <Button size="icon" className={BUTTON_STYLE} />
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
