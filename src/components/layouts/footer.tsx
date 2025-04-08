import { Copyright } from 'lucide-react';
import React from 'react';

const Footer = () => {
  return (
    <footer className="border-lightgray border-t-[1px] bg-white py-8 text-center">
      <div className="flex items-center justify-center gap-1">
        <Copyright size={13} color="var(--color-gray)" strokeWidth={1} />
        <span className="text-gray text-md">
          2025 리왹트. All rights reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
