import { PATH } from '@/constants/path.constants';
import EmptyResult from '@/components/commons/empty-result-link';

// TODO : 메인 레이아웃 적용되면 감싸고 있는 디브 태그 없애야 될 것임.

const NotFound = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-white px-4 text-center">
      <EmptyResult
        buttonText="홈으로 돌아가기"
        href={PATH.HOME}
        imagePath="/notfound/not_found.png"
      />
    </div>
  );
};

export default NotFound;
