'use client';

import EasterEggManager from './EasterEggManager';

/**
 * Wrapper component for easter eggs to be used in layout
 * @returns JSX element with easter egg functionality
 */
const EasterEggWrapper = () => {
  return (
    <EasterEggManager
      enableKonami={true}
      enableConsole={true}
      enableLogoClick={true}
      logoSelector="a[href='/'] img[alt='로고']" // 로고 선택자
      logoClickCount={5}
    />
  );
};

export default EasterEggWrapper;
