'use client';

import { Dialog, DialogContent, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const CHARACTER_MODAL = {
  WIDTH: {
    DIALOG: 336,
    BUTTON: 120,
    CHARACTER: 128,
  },
  HEIGHT: {
    CHARACTER: 124,
  },
  IMAGE: {
    WIDTH: 165.98,
    HEIGHT: 161.544,
  },
  STYLE: {
    SHADOW: '1px 1px_8px_1px rgba(213,187,169,0.20)',
    BORDER_RADIUS: 24,
  },
} as const;

const CharacterModal = ({
  isOpen,
  onClose,
  characterSrc,
  title,
  description,
  primaryButton,
  secondaryButton,
}: {
  isOpen: boolean;
  onClose: () => void;
  characterSrc: string;
  title: string;
  description: string;
  primaryButton?: {
    text: string;
    onClick: () => void;
  };
  secondaryButton?: {
    text: string;
    onClick: () => void;
  };
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-[336px] flex-col items-center justify-center gap-6 rounded-[24px] bg-white p-5 shadow-[1px_1px_8px_1px_rgba(213,187,169,0.20)]">
        <DialogClose className="flex items-center justify-end gap-[10px] self-stretch text-transparent outline-none focus:ring-0 focus-visible:ring-0 focus-visible:ring-offset-0">
          {/* <Image
            src="/icons/close.svg"
            alt="닫기"
            width={24}
            height={24}
            className="h-6 w-6 flex-shrink-0 text-gray-300"
          /> */}
        </DialogClose>
        <Image
          src={characterSrc}
          alt="캐릭터"
          width={CHARACTER_MODAL.IMAGE.WIDTH}
          height={CHARACTER_MODAL.IMAGE.HEIGHT}
          className="h-[161.544px] w-[165.98px]"
        />
        <div className="flex flex-col items-start gap-8 self-stretch">
          <div className="flex w-full flex-col">
            <h2 className="semibold-24 text-center text-gray-800">{title}</h2>
            <p className="medium-16 text-center text-gray-600">{description}</p>
          </div>
          <div className="flex h-12 items-center gap-3 self-stretch">
            {secondaryButton && (
              <Button
                onClick={secondaryButton.onClick}
                className="semibold-20 flex flex-[1_0_0] items-center justify-center gap-[10px] self-stretch rounded-[12px] border-[1.5px] border-secondary-300 bg-white px-4 py-[10px] text-secondary-300 hover:bg-gray-50"
              >
                {secondaryButton.text}
              </Button>
            )}
            {primaryButton && (
              <Button
                onClick={primaryButton.onClick}
                className="semibold-20 flex flex-[1_0_0] items-center justify-center gap-[10px] self-stretch rounded-[12px] border-[1.5px] border-primary-500 bg-primary-500 px-4 py-[10px] text-white hover:bg-primary-600 hover:text-white"
              >
                {primaryButton.text}
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CharacterModal;
