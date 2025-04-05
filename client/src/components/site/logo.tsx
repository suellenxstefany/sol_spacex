import React from 'react';
import { Link } from 'wouter';
import logoPath from '@assets/IMG_1340.png';

interface LogoProps {
  size?: 'small' | 'medium' | 'large' | 'xlarge' | 'xxlarge';
  withText?: boolean;
  textOnly?: boolean;
}

export function Logo({ size = 'medium', withText = true, textOnly = false }: LogoProps) {
  const sizeClass = {
    small: 'w-8 h-8',
    medium: 'w-12 h-12',
    large: 'w-24 h-24',
    xlarge: 'w-[170px] h-[170px]',
    xxlarge: 'w-[300px] h-[300px]' // Increased to 300px as requested
  };

  const textSizeClass = {
    small: 'text-xl',
    medium: 'text-2xl',
    large: 'text-4xl',
    xlarge: 'text-5xl',
    xxlarge: 'text-6xl'
  };

  return (
    <Link href="/" className="flex items-center space-x-3">
      {!textOnly && (
        <div className={`${sizeClass[size]} flex items-center justify-center overflow-hidden`}>
          <img 
            src={logoPath} 
            alt="Sol Space Logo" 
            className="w-full h-full object-contain" 
          />
        </div>
      )}
      {withText && (
        <span className={`font-dancing ${textSizeClass[size]} font-medium text-[#C19B97]`}>
          Sol Space
        </span>
      )}
    </Link>
  );
}