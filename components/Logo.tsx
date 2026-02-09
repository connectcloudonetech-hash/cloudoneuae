
import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", light = false }) => {
  const darkBlue = "#1F4E79";
  const lightBlue = "#34C1E5";
  const textColor = light ? "#FFFFFF" : darkBlue;

  return (
    <svg 
      viewBox="0 0 500 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* "cloud" text */}
      <text 
        x="0" 
        y="80" 
        fill={textColor} 
        style={{ fontSize: '72px', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}
      >
        cl
      </text>
      
      {/* The Cloud Icon (The 'o') */}
      <circle cx="115" cy="55" r="35" fill={textColor} />
      <path 
        d="M85 65C85 65 92.5 55 100 55C107.5 55 115 65 115 65C115 65 122.5 55 130 55C137.5 55 145 65 145 65V75C145 85 135 90 115 90C95 90 85 85 85 75V65Z" 
        fill={lightBlue} 
      />
      
      <text 
        x="155" 
        y="80" 
        fill={textColor} 
        style={{ fontSize: '72px', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}
      >
        ud
      </text>

      {/* "one" text */}
      <text 
        x="265" 
        y="80" 
        fill={lightBlue} 
        style={{ fontSize: '72px', fontWeight: '800', fontFamily: 'Outfit, sans-serif' }}
      >
        one
      </text>

      {/* "TECHNOLOGIES" subtext */}
      <text 
        x="75" 
        y="110" 
        fill={textColor} 
        letterSpacing="12"
        style={{ fontSize: '18px', fontWeight: '500', fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase' }}
      >
        TECHNOLOGIES
      </text>
    </svg>
  );
};

export default Logo;
