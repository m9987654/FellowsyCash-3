import React from 'react';

interface Logo3DProps {
  size?: number;
  className?: string;
}

export default function Logo3D({ size = 64, className = "" }: Logo3DProps) {
  return (
    <div className={`relative ${className}`} style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        className="drop-shadow-2xl transform transition-transform hover:scale-110 hover:rotate-3"
      >
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#FFD700', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#FFA500', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#FF8C00', stopOpacity: 1 }} />
          </linearGradient>
          
          <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: '#4F46E5', stopOpacity: 1 }} />
            <stop offset="50%" style={{ stopColor: '#3B82F6', stopOpacity: 1 }} />
            <stop offset="100%" style={{ stopColor: '#1E40AF', stopOpacity: 1 }} />
          </linearGradient>
          
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodColor="rgba(0,0,0,0.3)" />
          </filter>
          
          <filter id="bevel" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
            <feSpecularLighting result="specOut" in="blur" specularConstant="1.5" specularExponent="20" lightingColor="white">
              <fePointLight x="-5000" y="-10000" z="20000"/>
            </feSpecularLighting>
            <feComposite in="specOut" in2="SourceAlpha" operator="in" result="specOut"/>
            <feComposite in="SourceGraphic" in2="specOut" operator="arithmetic" k1="0" k2="1" k3="1" k4="0"/>
          </filter>
        </defs>
        
        {/* Main coin circle */}
        <circle
          cx="50"
          cy="50"
          r="45"
          fill="url(#goldGrad)"
          filter="url(#shadow)"
          stroke="url(#blueGrad)"
          strokeWidth="2"
        />
        
        {/* Inner coin effect */}
        <circle
          cx="50"
          cy="50"
          r="38"
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        
        {/* Arabic text "ف" */}
        <text
          x="35"
          y="65"
          fontFamily="Cairo, Arial"
          fontSize="32"
          fontWeight="bold"
          fill="url(#blueGrad)"
          filter="url(#bevel)"
          textAnchor="middle"
        >
          ف
        </text>
        
        {/* Dollar sign */}
        <text
          x="65"
          y="65"
          fontFamily="Arial"
          fontSize="28"
          fontWeight="bold"
          fill="url(#goldGrad)"
          filter="url(#bevel)"
          textAnchor="middle"
        >
          $
        </text>
        
        {/* Highlight effect */}
        <ellipse
          cx="40"
          cy="35"
          rx="8"
          ry="4"
          fill="rgba(255,255,255,0.6)"
          transform="rotate(-30 40 35)"
        />
        
        {/* 3D edge effect */}
        <path
          d="M 50 5 A 45 45 0 0 1 95 50 L 88 50 A 38 38 0 0 0 50 12 Z"
          fill="rgba(255,255,255,0.2)"
        />
        
        <path
          d="M 95 50 A 45 45 0 0 1 50 95 L 50 88 A 38 38 0 0 0 88 50 Z"
          fill="rgba(0,0,0,0.1)"
        />
      </svg>
      
      {/* Animated glow effect */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-600 opacity-20 blur-md animate-pulse"></div>
    </div>
  );
}