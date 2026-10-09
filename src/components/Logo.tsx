import React from 'react';

interface LogoProps {
  variant?: 'light' | 'dark' | 'auto';
  className?: string;
  iconOnly?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'dark',
  className = '',
  iconOnly = false,
  size = 'md'
}) => {
  // Size mappings
  const iconDimensions = {
    sm: { w: 26, h: 31 },
    md: { w: 34, h: 41 },
    lg: { w: 42, h: 50 },
    xl: { w: 52, h: 62 }
  }[size];

  const titleSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  }[size];

  const subSizes = {
    sm: 'text-[7px] tracking-[0.22em] mt-0.5',
    md: 'text-[8.5px] tracking-[0.26em] mt-0.5',
    lg: 'text-[10px] tracking-[0.28em] mt-1',
    xl: 'text-[12px] tracking-[0.3em] mt-1'
  }[size];

  const infoColor = variant === 'light' ? 'text-slate-900' : 'text-white';
  const subColor = variant === 'light' ? 'text-slate-500' : 'text-slate-300/90';

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Vector InfoPro Shield Icon */}
      <svg
        width={iconDimensions.w}
        height={iconDimensions.h}
        viewBox="0 0 40 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-200 group-hover:scale-105"
        aria-hidden="true"
      >
        {/* Left half facet of shield */}
        <path
          d="M20 4.2C14.2 6.1 8.2 7.7 4 9.6C4 24.2 7.2 36.8 20 43.8V4.2Z"
          fill="#2563EB"
        />
        {/* Right half facet of shield */}
        <path
          d="M20 4.2C25.8 6.1 31.8 7.7 36 9.6C36 24.2 32.8 36.8 20 43.8V4.2Z"
          fill="#1D4ED8"
        />
        {/* Lowercase 'i' - Circular Dot */}
        <circle cx="20" cy="16.5" r="2.7" fill="#FFFFFF" />
        {/* Lowercase 'i' - Rounded Stem */}
        <rect x="17.6" y="22.2" width="4.8" height="12.2" rx="2.4" fill="#FFFFFF" />
      </svg>

      {/* Brand Typography */}
      {!iconOnly && (
        <div className="flex flex-col text-left leading-none justify-center">
          <div className={`font-display font-bold tracking-tight flex items-baseline ${titleSizes}`}>
            <span className={infoColor}>Info</span>
            <span className="text-[#3B82F6]">Pro</span>
          </div>
          <span className={`font-sans font-semibold uppercase ${subColor} ${subSizes}`}>
            CYBERSECURITY
          </span>
        </div>
      )}
    </div>
  );
};
