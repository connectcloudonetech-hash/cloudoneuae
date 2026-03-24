
import React from 'react';

interface LogoProps {
  className?: string;
  light?: boolean;
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", light = false }) => {
  return (
    <img 
      src="https://raw.githubusercontent.com/connectcloudonetech-hash/cloudoneuae/44e513ea14d013e92e082b6745214388afa534d8/images/cloudonetechlogo.svg" 
      alt="Cloud One Technologies" 
      className={`${className} object-contain ${light ? 'brightness-0 invert' : ''}`}
      referrerPolicy="no-referrer"
    />
  );
};

export default Logo;
