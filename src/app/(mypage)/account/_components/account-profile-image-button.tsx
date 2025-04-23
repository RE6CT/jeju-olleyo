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
          <EditIcon />
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

const EditIcon = () => {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M36.6629 7.63785C36.1487 7.11845 35.5382 6.70646 34.8662 6.42543C34.1942 6.14439 33.4739 5.99983 32.7466 6C32.0192 6.00017 31.2991 6.14507 30.6272 6.42642C29.9554 6.70777 29.345 7.12005 28.8311 7.6397L11.4469 25.2149C10.411 26.2631 9.82909 27.6832 9.82857 29.1638V35.077C9.82857 35.8413 10.443 36.4616 11.2 36.4616H17.0935C18.5618 36.4616 19.9698 35.8708 21.0066 34.8241L38.3781 17.2747C39.4143 16.226 39.9962 14.8052 39.9962 13.324C39.9962 11.8427 39.4143 10.4219 38.3781 9.37322L36.6629 7.63785ZM9.37143 39.2308C9.0077 39.2308 8.65887 39.3767 8.40168 39.6363C8.14449 39.896 8 40.2482 8 40.6154C8 40.9826 8.14449 41.3348 8.40168 41.5945C8.65887 41.8541 9.0077 42 9.37143 42H38.6286C38.9923 42 39.3411 41.8541 39.5983 41.5945C39.8555 41.3348 40 40.9826 40 40.6154C40 40.2482 39.8555 39.896 39.5983 39.6363C39.3411 39.3767 38.9923 39.2308 38.6286 39.2308H9.37143Z"
        className="fill-gray-900"
      />
    </svg>
  );
};
