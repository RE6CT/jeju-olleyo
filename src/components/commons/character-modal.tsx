'use client';

import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogTitle,
} from '@/components/ui/dialog';
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
      <DialogContent className="flex flex-col items-center gap-6 p-8">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        <div className="flex flex-col items-center gap-6">
          <Image
            src={characterSrc}
            alt="캐릭터 이미지"
            width={CHARACTER_MODAL.IMAGE.WIDTH}
            height={CHARACTER_MODAL.IMAGE.HEIGHT}
          />
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-18 font-bold text-gray-900">{title}</h2>
            <p className="text-14 text-gray-600">{description}</p>
          </div>
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
      </DialogContent>
    </Dialog>
  );
};

export default CharacterModal;
