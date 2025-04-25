'use client';

import { useEffect, useState, useRef } from 'react';

// 타입 선언을 위한 인터페이스
interface EasterEggCommands {
  party: () => void;
  matrix: () => void;
  flip: () => void;
  help: () => void;
}

/**
 * Component that adds a console easter egg
 * @returns JSX element (no visible UI)
 */
const ConsoleEasterEgg = () => {
  useEffect(() => {
    // 명령어 함수 정의
    const partyMode = () => {
      console.log(
        '%c🎉 PARTY MODE ACTIVATED! 🎉',
        'color: #ff00ff; font-size: 24px; font-weight: bold;',
      );

      const colors = [
        '#ff0000',
        '#ff7f00',
        '#ffff00',
        '#00ff00',
        '#0000ff',
        '#4b0082',
        '#9400d3',
      ];
      let index = 0;

      const partyInterval = setInterval(() => {
        document.body.style.backgroundColor = colors[index % colors.length];
        index++;

        if (index > 20) {
          // Stop after 20 color changes
          clearInterval(partyInterval);
          document.body.style.backgroundColor = '';
          document.body.style.transition = '';
        }
      }, 200);

      document.body.style.transition = 'background-color 0.2s';
    };

    const matrixMode = () => {
      console.log(
        '%c🖥️ ENTERING THE MATRIX 🖥️',
        'color: #00ff00; font-size: 24px; font-weight: bold;',
      );

      // Create matrix canvas
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.zIndex = '9999';
      canvas.style.pointerEvents = 'none';
      document.body.appendChild(canvas);

      const ctx = canvas.getContext('2d')!;

      // Matrix characters
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$&+,:;=?@#'.split(
        '',
      );

      // Columns
      const columns = Math.floor(canvas.width / 20);
      const drops: number[] = [];

      // Initialize drops
      for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100;
      }

      // Draw the matrix
      const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#0f0';
        ctx.font = '15px monospace';

        for (let i = 0; i < drops.length; i++) {
          const text =
            characters[Math.floor(Math.random() * characters.length)];
          ctx.fillText(text, i * 20, drops[i] * 20);

          if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
          }

          drops[i]++;
        }
      };

      // Start the animation
      const matrixInterval = setInterval(draw, 50);

      // Stop after 10 seconds
      setTimeout(() => {
        clearInterval(matrixInterval);
        document.body.removeChild(canvas);
      }, 10000);
    };

    const flipMode = () => {
      console.log(
        '%c🙃 FLIPPING OUT! 🙃',
        'color: #0099ff; font-size: 24px; font-weight: bold;',
      );

      document.body.style.transition = 'transform 1s';
      document.body.style.transform = 'rotate(180deg)';

      setTimeout(() => {
        document.body.style.transform = '';
      }, 5000);
    };

    const showHelpCommands = () => {
      console.log(
        '%c🔍 비밀 콘솔 명령어:',
        'font-size: 16px; font-weight: bold;',
      );
      console.log(
        '%cwindow.easterEggCommands.party() - 파티 모드 활성화',
        'font-size: 14px;',
      );
      console.log(
        '%cwindow.easterEggCommands.matrix() - 매트릭스 효과 활성화',
        'font-size: 14px;',
      );
      console.log(
        '%cwindow.easterEggCommands.flip() - 페이지 뒤집기',
        'font-size: 14px;',
      );
      console.log(
        '%cwindow.easterEggCommands.help() - 도움말 보기',
        'font-size: 14px;',
      );
    };

    // 글로벌 명령어 맵 생성
    if (!window.easterEggCommands) {
      window.easterEggCommands = {
        party: partyMode,
        matrix: matrixMode,
        flip: flipMode,
        help: showHelpCommands,
      };
    }

    // 시작시 가이드 메시지 표시
    console.log(
      '%c🔍 이스터에그 명령어를 사용하려면 다음과 같이 입력하세요: window.easterEggCommands.help()',
      'color: #9c27b0; font-size: 14px; font-weight: bold;',
    );

    return () => {
      // 컴포넌트 언마운트시 null 처리 (delete 대신)
      if (window.easterEggCommands) {
        window.easterEggCommands = null as any;
      }
    };
  }, []);

  return null; // No visible UI
};

/**
 * Props for the LogoClickEasterEgg component
 * @interface LogoClickEasterEggProps
 * @property {string} logoSelector - CSS selector for the logo element
 * @property {number} clickCount - Number of clicks required to activate
 */
interface LogoClickEasterEggProps {
  logoSelector: string;
  clickCount?: number;
}

/**
 * Component that activates an easter egg when logo is clicked multiple times
 * @param props - Component props
 * @returns JSX element (no visible UI)
 */
const LogoClickEasterEgg = ({
  logoSelector,
  clickCount = 5,
}: LogoClickEasterEggProps) => {
  const [clicks, setClicks] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const logoElement = document.querySelector(logoSelector);

    if (!logoElement) {
      console.warn(`Logo element with selector "${logoSelector}" not found`);
      return;
    }

    const handleClick = () => {
      setClicks((prev) => {
        const newCount = prev + 1;

        // Clear existing timer
        if (timerRef.current) {
          clearTimeout(timerRef.current);
        }

        // Set a new timer to reset clicks after 2 seconds of inactivity
        timerRef.current = setTimeout(() => {
          setClicks(0);
        }, 2000);

        // Check if we've reached the required click count
        if (newCount === clickCount) {
          activateEasterEgg();
          return 0; // Reset click count
        }

        return newCount;
      });
    };

    // Add click event listener
    logoElement.addEventListener('click', handleClick);

    return () => {
      // Clean up
      logoElement.removeEventListener('click', handleClick);
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [logoSelector, clickCount]);

  /**
   * Activates the easter egg effect
   */
  const activateEasterEgg = () => {
    // Create a secret notification div with Tailwind classes
    const secretDiv = document.createElement('div');
    secretDiv.textContent = '와우 비밀의상자를 찾았어요!! 🎁';
    secretDiv.className =
      'fixed bottom-5 right-5 bg-pink-500 text-white py-4 px-5 rounded-lg shadow-lg z-50 animate-bounce';

    // Add to body
    document.body.appendChild(secretDiv);

    // Add dynamic style for rainbow effect
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes rainbow-bg {
        0% { background-color: rgba(255, 0, 0, 0.1); }
        16% { background-color: rgba(255, 165, 0, 0.1); }
        33% { background-color: rgba(255, 255, 0, 0.1); }
        50% { background-color: rgba(0, 128, 0, 0.1); }
        66% { background-color: rgba(0, 0, 255, 0.1); }
        83% { background-color: rgba(75, 0, 130, 0.1); }
        100% { background-color: rgba(238, 130, 238, 0.1); }
      }
      
      body {
        animation: rainbow-bg 2s linear infinite;
      }
    `;
    document.head.appendChild(styleElement);

    // Remove after 5 seconds
    setTimeout(() => {
      document.body.removeChild(secretDiv);
      document.head.removeChild(styleElement);
      document.body.style.animation = '';
    }, 5000);
  };

  return null; // No visible UI
};

// 타입 확장을 위한 선언 병합
declare global {
  interface Window {
    easterEggCommands: EasterEggCommands | null;
  }
}

export { ConsoleEasterEgg, LogoClickEasterEgg };
