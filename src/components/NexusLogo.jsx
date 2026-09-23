import React from 'react';

/**
 * NexusLogo Component
 * Faithfully represents the orbital NEXUS logo from user design:
 * Geometric typography with an electric cyan-to-violet gradient X
 * encircled by an orbital particle path with twin nodal celestial dots.
 */
export default function NexusLogo({ size = 'md', className = '', showSubtitle = false, dark = false }) {
  const sizeMap = {
    sm: { icon: 'h-6 w-auto', text: 'text-base', sub: 'text-[9px]' },
    md: { icon: 'h-8 w-auto', text: 'text-xl', sub: 'text-[10px]' },
    lg: { icon: 'h-11 w-auto', text: 'text-2xl', sub: 'text-xs' }
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* SVG Icon / Mark */}
      <div className="relative shrink-0 flex items-center justify-center">
        <svg
          viewBox="0 0 160 110"
          className={`${currentSize.icon} transition-transform duration-300 hover:scale-105`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nexusXGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00C6FF" />
              <stop offset="50%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#8B5CF6" />
            </linearGradient>
            <linearGradient id="nexusOrbitGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#00D2FF" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
            <filter id="nexusGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background orbital ring (behind X) */}
          <ellipse
            cx="80"
            cy="55"
            rx="56"
            ry="20"
            transform="rotate(-24, 80, 55)"
            stroke="url(#nexusOrbitGrad)"
            strokeWidth="2.4"
            strokeDasharray="140 16"
            opacity="0.85"
          />

          {/* Letter N */}
          <path
            d="M 12 78 V 32 H 24 L 40 60 V 32 H 51 V 78 H 39 L 23 49 V 78 Z"
            fill={dark ? "#F8FAFC" : "#0F172A"}
          />

          {/* Letter E */}
          <path
            d="M 58 78 V 32 H 83 V 41 H 68 V 50 H 80 V 59 H 68 V 69 H 84 V 78 Z"
            transform="translate(-6, 0)"
            fill={dark ? "#F8FAFC" : "#0F172A"}
          />

          {/* Stylized X (Central focal point) */}
          <g>
            {/* Top-left to bottom-right arm */}
            <path
              d="M 68 32 H 81 L 105 78 H 92 Z"
              fill="url(#nexusXGrad)"
            />
            {/* Bottom-left to top-right arm */}
            <path
              d="M 70 78 H 83 L 107 32 H 94 Z"
              fill="url(#nexusXGrad)"
            />
          </g>

          {/* Orbital Nodes / Planets */}
          <circle cx="34" cy="74" r="4.2" fill="#00C6FF" filter="url(#nexusGlow)" />
          <circle cx="126" cy="36" r="4.2" fill="#A855F7" filter="url(#nexusGlow)" />

          {/* Letter U */}
          <path
            d="M 103 32 H 113 V 63 C 113 74, 116 78, 126 78 C 136 78, 139 74, 139 63 V 32 H 149 V 63 C 149 83, 140 88, 126 88 C 112 88, 103 83, 103 63 Z"
            transform="translate(1, -9)"
            fill={dark ? "#F8FAFC" : "#0F172A"}
          />

          {/* Letter S */}
          <path
            d="M 136 75 C 127 75, 121 70, 121 62 H 131 C 131 66, 134 68, 139 68 C 144 68, 147 66, 147 62 C 147 52, 121 56, 121 40 C 121 31, 127 26, 138 26 C 148 26, 154 30, 155 38 H 144 C 144 34, 141 32, 138 32 C 133 32, 131 34, 131 38 C 131 46, 157 43, 157 60 C 157 70, 149 75, 136 75 Z"
            transform="translate(10, 4)"
            fill={dark ? "#F8FAFC" : "#0F172A"}
          />
        </svg>
      </div>

      {showSubtitle && (
        <div className="flex flex-col leading-none">
          <span className={`font-bold tracking-tight ${currentSize.text} ${dark ? 'text-white' : 'text-slate-900'}`}>
            NEXUS
          </span>
          <span className={`font-medium tracking-wider uppercase text-slate-500 ${currentSize.sub}`}>
            Interaction Intelligence
          </span>
        </div>
      )}
    </div>
  );
}
