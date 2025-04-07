import ProfileImage from '@/components/commons/profile-image';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

const ProfileInfo = () => {
  return (
    <li className="flex flex-col gap-3">
      <h3 className="text-lg font-semibold">프로필</h3>
      <div className="flex">
        <div className="flex min-w-[176px]">
          <div className="relative">
            <ProfileImage
              image={null}
              width={88}
              height={88}
              className="rounded-[44px]"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute bottom-0 right-0 h-7 w-7"
            >
              <Plus />
            </Button>
          </div>
        </div>
        <div className="flex w-full items-center">
          <span className="w-[120px]">닉네임</span>
          <span className="flex-grow">부앙이</span>
          <Button className="w-fit">수정</Button>
        </div>
      </div>
    </li>
  );
};

export default ProfileInfo;
