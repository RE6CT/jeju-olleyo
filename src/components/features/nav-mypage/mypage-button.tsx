import { useRouter } from 'next/navigation';
import { useState } from 'react';
import MypageModal from './mypage-modal';

const MypageButton = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const router = useRouter();

  const handleMypageModalToggle = () => {
    setIsOpen(isOpen ? false : true);
  };

  const handleLinkClick = (path: string) => {
    router.push(`/mypage/${path}`);
    setIsOpen(false);
  };

  return (
    <>
      <button onClick={handleMypageModalToggle} className="relative">
        마이페이지
      </button>
      {isOpen && <MypageModal onLinkClick={handleLinkClick} />}
    </>
  );
};

export default MypageButton;
