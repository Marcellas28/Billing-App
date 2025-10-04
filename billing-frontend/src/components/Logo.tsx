import React from 'react';
import './Logo.css';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showWatermark?: boolean;
}

const Logo: React.FC<LogoProps> = ({ size = 'medium', showWatermark = true }) => {
  return (
    <div className={`logo-container ${size}`}>
      <div className="logo-image">
        {/* Placeholder for your image - replace with your actual image */}
        <div className="logo-placeholder">
          <span>Dev. Marcel</span>
        </div>
        {/* Or use an actual img tag */}
        {/* <img src="/path-to-your-image.jpg" alt="Store Logo" className="logo-img" /> */}
      </div>
      
      {showWatermark && (
        <div className="watermark">
          Marcellas Did It
        </div>
      )}
    </div>
  );
};

export default Logo;