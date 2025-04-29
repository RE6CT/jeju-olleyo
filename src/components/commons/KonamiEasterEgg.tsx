'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import confetti from 'canvas-confetti';

/**
 * Interface for the Easter Egg state
 * @interface EasterEggState
 * @property {boolean} isActivated - Whether the easter egg is activated
 * @property {number} activationCount - How many times the easter egg has been activated
 * @property {() => void} activate - Function to activate the easter egg
 * @property {() => void} reset - Function to reset the easter egg state
 */
interface EasterEggState {
  isActivated: boolean;
  activationCount: number;
  activate: () => void;
  reset: () => void;
}

/**
 * Zustand store for managing the Easter Egg state
 */
const useEasterEggStore = create<EasterEggState>((set) => ({
  isActivated: false,
  activationCount: 0,
  activate: () =>
    set((state) => ({
      isActivated: true,
      activationCount: state.activationCount + 1,
    })),
  reset: () => set({ isActivated: false }),
}));

/**
 * The Konami code sequence
 */
const KONAMI_CODE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * Component that listens for the Konami code and triggers an easter egg
 * @returns JSX element
 */
const KonamiEasterEgg = () => {
  const [keysPressed, setKeysPressed] = useState<string[]>([]);
  const { isActivated, activationCount, activate, reset } = useEasterEggStore();

  // Handle key presses to detect Konami code
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Add the new key to the sequence
      const updatedKeys = [...keysPressed, e.key];

      // Keep only the last N keys where N is the length of the Konami code
      if (updatedKeys.length > KONAMI_CODE.length) {
        updatedKeys.shift();
      }

      setKeysPressed(updatedKeys);

      // Check if the sequence matches the Konami code
      const isKonamiCode =
        updatedKeys.length === KONAMI_CODE.length &&
        updatedKeys.every((key, index) => {
          // 안전하게 key 값 확인 (undefined나 null인 경우 처리)
          if (key === undefined || key === null) return false;
          // 문자열이 아닌 경우 String으로 변환하여 처리
          const keyStr = String(key).toLowerCase();
          return keyStr === KONAMI_CODE[index].toLowerCase();
        });

      if (isKonamiCode) {
        activate();

        // Trigger confetti
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });

        // Reset after animation completes
        setTimeout(() => {
          reset();
        }, 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [keysPressed, activate, reset]);

  // Render different easter eggs based on activation count
  useEffect(() => {
    if (!isActivated) return;

    // Different effects based on how many times activated
    switch (activationCount % 3) {
      case 1: {
        // First type: Background effect
        // console.log 제거됨
        document.body.style.transition = 'background-color 3s';
        document.body.style.backgroundColor = '#f0f8ff';
        setTimeout(() => {
          document.body.style.backgroundColor = '';
        }, 3000);
        break;
      }
      case 2: {
        // Second type: Temporary spinning effect
        const elements = document.querySelectorAll('div, p, h1, h2, h3, img');
        elements.forEach((el) => {
          const element = el as HTMLElement;
          element.style.transition = 'transform 3s';
          element.style.transform = 'rotate(360deg)';
          setTimeout(() => {
            element.style.transform = '';
          }, 3000);
        });
        break;
      }
      case 0: {
        // Third type: Gravitational effect
        const allElements = document.querySelectorAll(
          'div, p, h1, h2, h3, img, button',
        );
        allElements.forEach((el, index) => {
          const element = el as HTMLElement;
          element.style.transition =
            'transform 2s cubic-bezier(.17,.67,.83,.67)';
          element.style.transform = 'translateY(20px)';
          setTimeout(
            () => {
              element.style.transform = '';
              element.style.transition = 'transform 1s';
            },
            2000 + index * 50,
          );
        });
        break;
      }
      default:
        break;
    }
  }, [isActivated, activationCount]);

  return null; // This component doesn't render anything visible
};

export default KonamiEasterEgg;
