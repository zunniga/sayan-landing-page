import React from 'react';

interface SocialIconProps {
  type: 'facebook' | 'instagram' | 'youtube' | 'tiktok' | 'linkedin';
  size?: number;
  className?: string;
}

export const SocialIcon: React.FC<SocialIconProps> = ({ 
  type, 
  size = 20, 
  className = "" 
}) => {
  const baseClass = `transition-all duration-300 ${className}`;

  switch (type) {
    case 'facebook':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          className={baseClass}
        >
          <path 
            d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" 
            fill="currentColor"
          />
          <path 
            d="M16.671 15.543l.532-3.47h-3.328v-2.25c0-.949.465-1.874 1.956-1.874h1.513V4.996s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.142H7.078v3.47h3.047v8.385a12.118 12.118 0 003.75 0v-8.385h2.796z" 
            fill="#fff"
          />
        </svg>
      );

    case 'instagram':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          className={baseClass}
        >
          <defs>
            <radialGradient id="instagram-gradient" cx="0.33" cy="1" r="1.2">
              <stop offset="0%" stopColor="#FFD600"/>
              <stop offset="25%" stopColor="#FF6B00"/>
              <stop offset="50%" stopColor="#E73C7E"/>
              <stop offset="75%" stopColor="#C13584"/>
              <stop offset="100%" stopColor="#833AB4"/>
            </radialGradient>
          </defs>
          <rect x="2" y="2" width="20" height="20" rx="5.5" ry="5.5" fill="url(#instagram-gradient)"/>
          <circle cx="12" cy="12" r="3.2" fill="none" stroke="#fff" strokeWidth="2"/>
          <circle cx="17.5" cy="6.5" r="1.5" fill="#fff"/>
        </svg>
      );

    case 'youtube':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          className={baseClass}
        >
          <path 
            d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" 
            fill="currentColor"
          />
        </svg>
      );

    case 'tiktok':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          className={baseClass}
        >
          <path 
            d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" 
            fill="currentColor"
          />
        </svg>
      );

    case 'linkedin':
      return (
        <svg 
          width={size} 
          height={size} 
          viewBox="0 0 24 24" 
          fill="none" 
          className={baseClass}
        >
          <path 
            d="M22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46c.98 0 1.77-.77 1.77-1.72V1.72C24 .77 23.21 0 22.23 0zM7.27 20.1H3.65V9.24h3.62V20.1zM5.47 7.76h-.03c-1.22 0-2-.83-2-1.87C3.44 4.78 4.24 4 5.47 4c1.22 0 2 .78 2.03 1.89C7.5 6.93 6.69 7.76 5.47 7.76zM20.34 20.1h-3.63v-5.8c0-1.45-.52-2.45-1.83-2.45-1 0-1.6.67-1.87 1.32-.1.23-.11.55-.11.88v6.05H9.28s.05-9.82 0-10.84h3.63v1.54a3.6 3.6 0 0 1 3.26-1.8c2.37 0 4.15 1.55 4.15 4.9v6.2h.02z" 
            fill="currentColor"
          />
        </svg>
      );

    default:
      return null;
  }
};