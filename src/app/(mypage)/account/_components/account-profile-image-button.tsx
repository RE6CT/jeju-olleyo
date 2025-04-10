import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Separator } from '@/components/ui/separator';

// TODO - shadcn 버튼 수정 - 현재 bg, hover 임의로 지정함 bg, hover:bg, shadow
const BUTTON_STYLE =
  "absolute bottom-0 right-0 h-8 w-8 rounded-full bg-[url('/icons/edit.svg')] bg-center bg-no-repeat [background-size:18px_18px] bg-white hover:bg-gray-50 shadow-button focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0";

const DROPDOWN_STYLE = {
  box: 'border-none rounded-12 py-2 px-4 shadow-dropdown',
  item: 'm-0 py-2 px-0',
};

/** 프로필 이미지 변경 버튼 */
const ProfileImageButton = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className={BUTTON_STYLE} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className={DROPDOWN_STYLE.box}>
        <DropdownMenuGroup>
          <DropdownMenuItem className={DROPDOWN_STYLE.item}>
            사진 변경
          </DropdownMenuItem>
          <Separator className="my-1" />
          <DropdownMenuItem className={DROPDOWN_STYLE.item}>
            기본 이미지로 변경
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileImageButton;
