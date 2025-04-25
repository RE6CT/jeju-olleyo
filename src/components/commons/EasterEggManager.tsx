'use client';

import { useEffect } from 'react';
import KonamiEasterEgg from './KonamiEasterEgg';
import { ConsoleEasterEgg, LogoClickEasterEgg } from './ConsoleEasterEgg';

/**
 * Configuration options for EasterEggManager
 * @interface EasterEggOptions
 * @property {boolean} enableKonami - Enable Konami code easter egg
 * @property {boolean} enableConsole - Enable console commands easter egg
 * @property {boolean} enableLogoClick - Enable logo click easter egg
 * @property {string} logoSelector - CSS selector for the logo element (if logo click enabled)
 * @property {number} logoClickCount - Number of clicks required to activate logo easter egg
 */
interface EasterEggOptions {
  enableKonami?: boolean;
  enableConsole?: boolean;
  enableLogoClick?: boolean;
  logoSelector?: string;
  logoClickCount?: number;
}

/**
 * Component that manages all easter eggs in the application
 * @param props - Component props
 * @returns JSX element with all enabled easter eggs
 */
const EasterEggManager = ({
  enableKonami = true,
  enableConsole = true,
  enableLogoClick = true,
  logoSelector = 'a[href="/"] img[alt="로고"]',
  logoClickCount = 5,
}: EasterEggOptions) => {
  useEffect(() => {
    // Log a hint to the console when the app starts
    console.log(
      '%c🥚 이스터에그가 숨겨져 있습니다. 콘솔에 window.easterEggCommands.help()를 입력해보세요! 🥚',
      'color: #9c27b0; font-size: 14px; font-weight: bold;',
    );

    // Add special URL parameter easter egg
    const urlParams = new URLSearchParams(window.location.search);
    const secretParam = urlParams.get('secret');

    if (secretParam === 'rainbow') {
      activateRainbowMode();
    } else if (secretParam === 'dark') {
      activateDarkMode();
    } else if (secretParam === 'debug') {
      activateDebugMode();
    }
  }, []);

  /**
   * Activates rainbow mode when ?secret=rainbow is in URL
   */
  const activateRainbowMode = () => {
    // Create notification with Tailwind classes
    const notification = document.createElement('div');
    notification.textContent = '🌈 Rainbow Mode Activated! 🌈';
    notification.className =
      'fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-full z-50';
    document.body.appendChild(notification);

    // Add rainbow text effect with dynamic style
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      @keyframes rainbow-text {
        0% { color: #ff0000; }
        15% { color: #ff8000; }
        30% { color: #ffff00; }
        45% { color: #00ff00; }
        60% { color: #00ffff; }
        75% { color: #0000ff; }
        90% { color: #8000ff; }
        100% { color: #ff0000; }
      }
      
      * {
        animation: rainbow-text 4s linear infinite !important;
      }
    `;
    document.head.appendChild(styleElement);

    // Remove notification after 3 seconds
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  /**
   * Activates dark mode when ?secret=dark is in URL
   */
  const activateDarkMode = () => {
    // Instead of using inline styles, add a class to enable dark mode
    document.documentElement.classList.add('dark');

    // Create notification with Tailwind classes
    const notification = document.createElement('div');
    notification.textContent = '🌙 Dark Mode Activated! 🌙';
    notification.className =
      'fixed top-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white px-5 py-3 rounded-full z-50';
    document.body.appendChild(notification);

    // Remove notification after 3 seconds
    setTimeout(() => {
      document.body.removeChild(notification);
    }, 3000);
  };

  /**
   * Activates debug mode when ?secret=debug is in URL
   */
  const activateDebugMode = () => {
    // Add debug outlines with dynamic style
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      * {
        outline: 1px solid rgba(255, 0, 0, 0.2) !important;
      }
      
      *:hover {
        outline: 2px solid rgba(255, 0, 0, 0.5) !important;
      }
    `;
    document.head.appendChild(styleElement);

    // Create debug panel with Tailwind classes
    const debugPanel = document.createElement('div');
    debugPanel.className =
      'fixed bottom-2 right-2 bg-black bg-opacity-80 text-green-400 p-3 rounded font-mono text-xs z-50 max-h-48 overflow-auto max-w-xs';
    document.body.appendChild(debugPanel);

    // Add timer to update debug info
    setInterval(() => {
      const memory = (performance as any).memory
        ? `Memory: ${Math.round((performance as any).memory.usedJSHeapSize / 1048576)}MB / 
         ${Math.round((performance as any).memory.jsHeapSizeLimit / 1048576)}MB`
        : 'Memory: N/A';

      debugPanel.innerHTML = `
        <div class="font-bold mb-1">🐞 DEBUG INFO</div>
        <div>Window: ${window.innerWidth}x${window.innerHeight}</div>
        <div>Time: ${new Date().toLocaleTimeString()}</div>
        <div>${memory}</div>
        <div>DOM Elements: ${document.getElementsByTagName('*').length}</div>
        <div>URL: ${window.location.pathname}</div>
      `;
    }, 1000);
  };

  return (
    <>
      {enableKonami && <KonamiEasterEgg />}
      {enableConsole && <ConsoleEasterEgg />}
      {enableLogoClick && (
        <LogoClickEasterEgg
          logoSelector={logoSelector}
          clickCount={logoClickCount}
        />
      )}
    </>
  );
};

export default EasterEggManager;
