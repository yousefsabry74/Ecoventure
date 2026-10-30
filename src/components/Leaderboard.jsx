import { useState, useEffect, useRef } from 'react';
import '../styles/Leaderboard.css';

/* ── SVG Icon Components ── */
const LeafIcon = ({ size = 16, color = '#22c55e' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22L6.66 19.7C7.14 19.87 7.64 20 8.17 20C12.86 20 17 15.87 17 11.17V8Z" fill={color} />
    <path d="M17 8C17 8 20 5 21 3C19 4 16 7 16 7" stroke={color} strokeWidth="1.5" fill="none" />
  </svg>
);

const CrownIcon = () => (
  <svg width="32" height="24" viewBox="0 0 32 24" fill="none" className="crown-icon">
    <path d="M4 20H28L26 10L20 14L16 6L12 14L6 10L4 20Z" fill="#fbbf24" stroke="#e5a813" strokeWidth="1" />
    <circle cx="4" cy="8" r="2" fill="#fbbf24" />
    <circle cx="16" cy="4" r="2" fill="#fbbf24" />
    <circle cx="28" cy="8" r="2" fill="#fbbf24" />
  </svg>
);

const TrophyIcon = () => (
  <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="trophy-icon">
    <path d="M7 4H21V12C21 15.866 17.866 19 14 19C10.134 19 7 15.866 7 12V4Z" fill="#fbbf24" stroke="#d4a00a" strokeWidth="1" />
    <path d="M7 6H4C4 6 3 6 3 7.5C3 9 4.5 10 5.5 10.5C6.5 11 7 11 7 11" fill="#fbbf24" stroke="#d4a00a" strokeWidth="0.8" />
    <path d="M21 6H24C24 6 25 6 25 7.5C25 9 23.5 10 22.5 10.5C21.5 11 21 11 21 11" fill="#fbbf24" stroke="#d4a00a" strokeWidth="0.8" />
    <rect x="12" y="19" width="4" height="3" fill="#d4a00a" />
    <rect x="9" y="22" width="10" height="2" rx="1" fill="#d4a00a" />
  </svg>
);

const SilverCrownIcon = () => (
  <svg width="24" height="18" viewBox="0 0 32 24" fill="none" className="crown-icon crown-silver">
    <path d="M4 20H28L26 10L20 14L16 6L12 14L6 10L4 20Z" fill="#C0C0C0" stroke="#A0A0A0" strokeWidth="1" />
    <circle cx="4" cy="8" r="2" fill="#C0C0C0" />
    <circle cx="16" cy="4" r="2" fill="#C0C0C0" />
    <circle cx="28" cy="8" r="2" fill="#C0C0C0" />
  </svg>
);

const BronzeCrownIcon = () => (
  <svg width="24" height="18" viewBox="0 0 32 24" fill="none" className="crown-icon crown-bronze">
    <path d="M4 20H28L26 10L20 14L16 6L12 14L6 10L4 20Z" fill="#CD7F32" stroke="#B56E28" strokeWidth="1" />
    <circle cx="4" cy="8" r="2" fill="#CD7F32" />
    <circle cx="16" cy="4" r="2" fill="#CD7F32" />
    <circle cx="28" cy="8" r="2" fill="#CD7F32" />
  </svg>
);

/* ── Animated Background Elements ── */
const CloudSVG = ({ className }) => (
  <svg className={`cloud ${className}`} viewBox="0 0 120 50" fill="none">
    <ellipse cx="60" cy="30" rx="50" ry="18" fill="rgba(255,255,255,0.85)" />
    <ellipse cx="40" cy="25" rx="30" ry="15" fill="rgba(255,255,255,0.9)" />
    <ellipse cx="80" cy="25" rx="25" ry="12" fill="rgba(255,255,255,0.9)" />
    <ellipse cx="55" cy="20" rx="20" ry="12" fill="rgba(255,255,255,0.95)" />
  </svg>
);

const BirdSVG = ({ className }) => (
  <svg className={`bird ${className}`} width="24" height="16" viewBox="0 0 24 16" fill="none">
    <path d="M2 8C2 8 6 2 8 2C10 2 8 6 8 6" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 6C8 6 9 4 11 3C13 2 14 4 14 4" stroke="#2563eb" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="10" cy="5" r="3" fill="#3b82f6" />
    <circle cx="12" cy="4" r="1" fill="#fbbf24" />
    <circle cx="11.5" cy="4.5" r="0.5" fill="#1e3a5f" />
    <path d="M14 5L16 4" stroke="#fbbf24" strokeWidth="1" strokeLinecap="round" />
    <path d="M7 7C7 7 5 9 4 9" stroke="#3b82f6" strokeWidth="1" strokeLinecap="round" />
    <path d="M9 8C9 8 8 10 7 10" stroke="#60a5fa" strokeWidth="1" strokeLinecap="round" />
  </svg>
);

const ButterflySVG = ({ className }) => (
  <svg className={`butterfly ${className}`} width="20" height="18" viewBox="0 0 20 18" fill="none">
    <ellipse cx="6" cy="6" rx="5" ry="5" fill="#c084fc" opacity="0.8" />
    <ellipse cx="14" cy="6" rx="5" ry="5" fill="#e879f9" opacity="0.8" />
    <ellipse cx="7" cy="12" rx="3" ry="4" fill="#a78bfa" opacity="0.7" />
    <ellipse cx="13" cy="12" rx="3" ry="4" fill="#d946ef" opacity="0.7" />
    <line x1="10" y1="2" x2="10" y2="16" stroke="#6b21a8" strokeWidth="1" />
    <line x1="10" y1="2" x2="8" y2="0" stroke="#6b21a8" strokeWidth="0.5" />
    <line x1="10" y1="2" x2="12" y2="0" stroke="#6b21a8" strokeWidth="0.5" />
  </svg>
);

const SunSVG = () => (
  <svg className="sun" width="60" height="60" viewBox="0 0 60 60" fill="none">
    <circle cx="30" cy="30" r="15" fill="#fbbf24" />
    <circle cx="30" cy="30" r="12" fill="#fde68a" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line
        key={i}
        x1={30 + 18 * Math.cos((angle * Math.PI) / 180)}
        y1={30 + 18 * Math.sin((angle * Math.PI) / 180)}
        x2={30 + 25 * Math.cos((angle * Math.PI) / 180)}
        y2={30 + 25 * Math.sin((angle * Math.PI) / 180)}
        stroke="#fbbf24"
        strokeWidth="2"
        strokeLinecap="round"
      />
    ))}
  </svg>
);

/* ── Plant/Tree SVG Components ── */
const TreeSVG = ({ height = 160, leafColor = '#22c55e', hasFlowers = false }) => (
  <svg width="120" height={height} viewBox={`0 0 120 ${height}`} fill="none" className="tree-svg">
    {/* Trunk */}
    <rect x="52" y={height - 50} width="16" height="50" rx="3" fill="#8B6914" />
    <rect x="55" y={height - 45} width="4" height="40" rx="2" fill="#a07d1e" opacity="0.4" />
    {/* Canopy layers */}
    <ellipse cx="60" cy={height - 65} rx="45" ry="30" fill={leafColor} className="canopy-layer canopy-1" />
    <ellipse cx="50" cy={height - 80} rx="35" ry="25" fill="#2dd46a" className="canopy-layer canopy-2" />
    <ellipse cx="65" cy={height - 90} rx="30" ry="22" fill="#3beb7a" className="canopy-layer canopy-3" />
    <ellipse cx="55" cy={height - 100} rx="20" ry="16" fill="#5ef294" className="canopy-layer canopy-4" />
    {/* Leaf details */}
    <path d={`M35 ${height - 70} Q40 ${height - 80} 45 ${height - 75}`} stroke="#1a8c3f" strokeWidth="1.5" fill="none" opacity="0.5" />
    <path d={`M70 ${height - 85} Q75 ${height - 95} 80 ${height - 80}`} stroke="#1a8c3f" strokeWidth="1.5" fill="none" opacity="0.5" />
    {hasFlowers && (
      <>
        <circle cx="35" cy={height - 55} r="4" fill="#fbbf24" className="flower-dot" />
        <circle cx="80" cy={height - 60} r="3.5" fill="#fb923c" className="flower-dot" />
        <circle cx="45" cy={height - 90} r="3" fill="#f472b6" className="flower-dot" />
        <circle cx="75" cy={height - 80} r="3.5" fill="#fbbf24" className="flower-dot" />
      </>
    )}
  </svg>
);

const BushSVG = ({ height = 100, color = '#22c55e', flowerColor = '#fbbf24', hasFlowers = true }) => (
  <svg width="110" height={height} viewBox={`0 0 110 ${height}`} fill="none" className="bush-svg">
    {/* Bush body */}
    <ellipse cx="55" cy={height - 15} rx="50" ry={height * 0.35} fill={color} className="bush-body" />
    <ellipse cx="40" cy={height - 25} rx="35" ry={height * 0.28} fill="#2dd46a" className="bush-body" />
    <ellipse cx="70" cy={height - 22} rx="30" ry={height * 0.25} fill="#3beb7a" className="bush-body" />
    <ellipse cx="55" cy={height - 30} rx="25" ry={height * 0.2} fill="#5ef294" className="bush-body" />
    {/* Flowers */}
    {hasFlowers && (
      <>
        <circle cx="30" cy={height - 30} r="5" fill={flowerColor} className="flower-dot" />
        <circle cx="30" cy={height - 30} r="2" fill="#fff" />
        <circle cx="55" cy={height - 40} r="6" fill={flowerColor} className="flower-dot" />
        <circle cx="55" cy={height - 40} r="2.5" fill="#fff" />
        <circle cx="80" cy={height - 28} r="5" fill={flowerColor} className="flower-dot" />
        <circle cx="80" cy={height - 28} r="2" fill="#fff" />
        <circle cx="42" cy={height - 22} r="4" fill={flowerColor === '#fbbf24' ? '#fb923c' : '#f472b6'} className="flower-dot" />
        <circle cx="42" cy={height - 22} r="1.5" fill="#fff" />
        <circle cx="68" cy={height - 35} r="4.5" fill={flowerColor === '#fbbf24' ? '#f472b6' : '#a78bfa'} className="flower-dot" />
        <circle cx="68" cy={height - 35} r="1.8" fill="#fff" />
      </>
    )}
    {/* Leaves */}
    <path d={`M20 ${height - 18} Q25 ${height - 28} 30 ${height - 20}`} stroke="#15803d" strokeWidth="1.2" fill="none" opacity="0.4" />
    <path d={`M85 ${height - 20} Q88 ${height - 30} 92 ${height - 22}`} stroke="#15803d" strokeWidth="1.2" fill="none" opacity="0.4" />
  </svg>
);

const SmallPlantSVG = ({ height = 70, flowerColor = '#f472b6' }) => (
  <svg width="80" height={height} viewBox={`0 0 80 ${height}`} fill="none" className="plant-svg">
    {/* Stem */}
    <line x1="40" y1={height} x2="40" y2={height - 35} stroke="#22c55e" strokeWidth="3" strokeLinecap="round" />
    <line x1="40" y1={height - 20} x2="30" y2={height - 30} stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
    <line x1="40" y1={height - 25} x2="52" y2={height - 35} stroke="#22c55e" strokeWidth="2" strokeLinecap="round" />
    {/* Leaves */}
    <ellipse cx="27" cy={height - 32} rx="8" ry="5" fill="#4ade80" transform={`rotate(-20, 27, ${height - 32})`} />
    <ellipse cx="55" cy={height - 37} rx="8" ry="5" fill="#4ade80" transform={`rotate(20, 55, ${height - 37})`} />
    <ellipse cx="35" cy={height - 40} rx="10" ry="7" fill="#22c55e" />
    <ellipse cx="48" cy={height - 42} rx="9" ry="6" fill="#22c55e" />
    {/* Flowers */}
    {[0, 72, 144, 216, 288].map((angle, i) => (
      <ellipse
        key={i}
        cx={40 + 7 * Math.cos((angle * Math.PI) / 180)}
        cy={height - 48 + 7 * Math.sin((angle * Math.PI) / 180)}
        rx="5"
        ry="5"
        fill={flowerColor}
        opacity="0.85"
        className="flower-petal"
      />
    ))}
    <circle cx="40" cy={height - 48} r="4" fill="#fbbf24" className="flower-center" />
  </svg>
);

/* ── Wooden Sign Component ── */
const WoodenSign = ({ text }) => (
  <div className="wooden-sign-decoration">
    <svg width="90" height="100" viewBox="0 0 90 100" fill="none">
      <rect x="38" y="50" width="14" height="50" rx="3" fill="#8B6914" />
      <rect x="5" y="5" width="80" height="50" rx="6" fill="#c9a84c" stroke="#8B6914" strokeWidth="2" />
      <rect x="10" y="10" width="70" height="40" rx="4" fill="#dbb85e" />
      <line x1="10" y1="15" x2="80" y2="15" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
      <line x1="10" y1="25" x2="80" y2="25" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
      <line x1="10" y1="35" x2="80" y2="35" stroke="#c9a84c" strokeWidth="0.5" opacity="0.5" />
    </svg>
    <span className="sign-text">{text}</span>
  </div>
);

/* ── Fence Component ── */
const FenceSVG = ({ width = 200 }) => (
  <svg className="fence-svg" width={width} height="50" viewBox={`0 0 ${width} 50`} fill="none">
    {Array.from({ length: Math.floor(width / 25) + 1 }).map((_, i) => (
      <g key={i}>
        <rect x={i * 25} y="5" width="8" height="40" rx="2" fill="#c9a84c" stroke="#a08030" strokeWidth="0.5" />
        <polygon points={`${i * 25},5 ${i * 25 + 4},0 ${i * 25 + 8},5`} fill="#c9a84c" stroke="#a08030" strokeWidth="0.5" />
      </g>
    ))}
    <rect x="0" y="15" width={width} height="4" rx="1" fill="#b8933d" />
    <rect x="0" y="32" width={width} height="4" rx="1" fill="#b8933d" />
  </svg>
);

/* ── Stepping Stones ── */
const SteppingStoneSVG = () => (
  <svg className="stepping-stones" width="60" height="180" viewBox="0 0 60 180" fill="none">
    <ellipse cx="25" cy="15" rx="15" ry="8" fill="#d1c9a3" opacity="0.7" />
    <ellipse cx="35" cy="50" rx="12" ry="7" fill="#c9c19a" opacity="0.6" />
    <ellipse cx="20" cy="85" rx="14" ry="7" fill="#d1c9a3" opacity="0.7" />
    <ellipse cx="38" cy="120" rx="13" ry="8" fill="#c9c19a" opacity="0.6" />
    <ellipse cx="25" cy="155" rx="15" ry="8" fill="#d1c9a3" opacity="0.7" />
  </svg>
);

/* ── Small Flower decorations ── */
const SmallFlowerDeco = ({ x, y, color = '#f472b6', size = 1 }) => (
  <div className="small-flower-deco" style={{ left: `${x}%`, top: `${y}%`, transform: `scale(${size})` }}>
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      {[0, 72, 144, 216, 288].map((angle, i) => (
        <circle
          key={i}
          cx={8 + 4 * Math.cos((angle * Math.PI) / 180)}
          cy={8 + 4 * Math.sin((angle * Math.PI) / 180)}
          r="2.5"
          fill={color}
          opacity="0.9"
        />
      ))}
      <circle cx="8" cy="8" r="2" fill="#fbbf24" />
    </svg>
  </div>
);

/* ── Watering Can ── */
const WateringCanSVG = () => (
  <svg className="watering-can" width="50" height="50" viewBox="0 0 50 50" fill="none">
    <rect x="12" y="18" width="22" height="24" rx="4" fill="#60a5fa" />
    <rect x="14" y="20" width="18" height="8" rx="2" fill="#93c5fd" opacity="0.5" />
    <path d="M34 25 L45 18 L47 20 L36 28" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />
    <ellipse cx="47" cy="19" rx="4" ry="3" fill="none" stroke="#3b82f6" strokeWidth="1" />
    <path d="M10 18 Q8 14 12 10 Q16 6 18 10 Q20 14 18 18" fill="#60a5fa" stroke="#3b82f6" strokeWidth="1" />
    {/* Water drops */}
    <circle cx="44" cy="24" r="1.5" fill="#93c5fd" className="water-drop drop-1" />
    <circle cx="46" cy="26" r="1" fill="#93c5fd" className="water-drop drop-2" />
    <circle cx="43" cy="27" r="1.2" fill="#93c5fd" className="water-drop drop-3" />
  </svg>
);

/* ── Rank Badge ── */
const RankBadge = ({ rank }) => {
  const colors = {
    1: { bg: '#22c55e', border: '#15803d', text: '#fff' },
    2: { bg: '#4ade80', border: '#22c55e', text: '#fff' },
    3: { bg: '#86efac', border: '#4ade80', text: '#15803d' },
    4: { bg: '#bbf7d0', border: '#86efac', text: '#166534' },
    5: { bg: '#dcfce7', border: '#bbf7d0', text: '#166534' },
  };
  const c = colors[rank] || colors[5];
  return (
    <div className="rank-badge" style={{ background: c.bg, borderColor: c.border, color: c.text }}>
      {rank}
    </div>
  );
};

/* ── Avatar Component ── */
const Avatar = ({ name, rank }) => {
  const colors = ['#22c55e', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316'];
  const colorIndex = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % colors.length;
  const bgColor = colors[colorIndex];
  const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2);

  return (
    <div className={`avatar avatar-rank-${rank}`}>
      <div className="avatar-circle" style={{ background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)` }}>
        <span className="avatar-initials">{initials}</span>
      </div>
      {rank === 1 && <CrownIcon />}
      {rank === 2 && <SilverCrownIcon />}
      {rank === 3 && <BronzeCrownIcon />}
    </div>
  );
};

/* ── Data ── */
const defaultClassesData = [
  { id: 1, name: 'Grade 5A', points: 1240, growth: 12 },
  { id: 2, name: 'Grade 4B', points: 980, growth: 8 },
  { id: 3, name: 'Grade 6C', points: 870, growth: 15 },
  { id: 4, name: 'Grade 5B', points: 760, growth: 5 },
  { id: 5, name: 'Grade 4A', points: 690, growth: 10 },
];

/* ── Garden Spot (Individual plant position on garden map) ── */
const GardenSpot = ({ item, rank, isVisible, onClick, isSelected }) => {
  const plantTypes = {
    1: <TreeSVG height={140} leafColor="#22c55e" hasFlowers />,
    2: <BushSVG height={95} color="#22c55e" flowerColor="#fbbf24" />,
    3: <BushSVG height={85} color="#34d399" flowerColor="#93c5fd" />,
    4: <SmallPlantSVG height={65} flowerColor="#f472b6" />,
    5: <SmallPlantSVG height={55} flowerColor="#c084fc" />,
  };

  return (
    <div
      className={`garden-spot spot-${rank} ${isVisible ? 'visible' : ''} ${isSelected ? 'selected' : ''}`}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      aria-label={`${item.name} - Rank ${rank} - ${item.points} points`}
    >
      {/* Plant */}
      <div className="plant-container">
        {plantTypes[rank]}
      </div>

      {/* Rank badge on the garden post */}
      <div className="garden-post">
        <RankBadge rank={rank} />
      </div>

      {/* Info Card */}
      <div className="spot-info-card">
        <Avatar name={item.name} rank={rank} />
        <div className="spot-info-text">
          <span className="spot-name">{item.name}</span>
          <span className="spot-points">
            <LeafIcon size={14} /> {item.points.toLocaleString()} pts
          </span>
        </div>
      </div>

      {/* Ground / Soil patch */}
      <div className="ground-patch"></div>

      {/* Small decorative stones */}
      <div className="deco-stones">
        <svg width="60" height="12" viewBox="0 0 60 12" fill="none">
          <ellipse cx="10" cy="8" rx="8" ry="4" fill="#9ca38a" opacity="0.3" />
          <ellipse cx="35" cy="9" rx="6" ry="3" fill="#9ca38a" opacity="0.25" />
          <ellipse cx="52" cy="7" rx="5" ry="3" fill="#9ca38a" opacity="0.2" />
        </svg>
      </div>
    </div>
  );
};

/* ── Student Podium (for Students view top 3) ── */
const StudentPodium = ({ item, rank, isVisible, onClick }) => {
  const podiumHeights = { 1: 120, 2: 85, 3: 70 };
  const podiumColors = {
    1: { top: '#8B6914', side: '#72570f', ring: '#fbbf24' },
    2: { top: '#9c8a5c', side: '#8a7a4e', ring: '#C0C0C0' },
    3: { top: '#a08050', side: '#8a6e40', ring: '#CD7F32' },
  };
  const c = podiumColors[rank];

  return (
    <div
      className={`student-podium podium-${rank} ${isVisible ? 'visible' : ''}`}
      onClick={() => onClick(item)}
      role="button"
      tabIndex={0}
      aria-label={`${item.name} - Rank ${rank} - ${item.points} points`}
    >
      {/* Crown / Badge */}
      <div className="podium-crown">
        {rank === 1 && <CrownIcon />}
        {rank === 2 && <SilverCrownIcon />}
        {rank === 3 && <BronzeCrownIcon />}
      </div>

      {/* Avatar */}
      <div className="podium-avatar-wrapper">
        <div className="podium-avatar-ring" style={{ borderColor: c.ring }}>
          <Avatar name={item.name} rank={rank} />
        </div>
        <RankBadge rank={rank} />
      </div>

      {/* Info */}
      <div className="podium-info">
        <span className="podium-name">{item.name}</span>
        <span className="podium-points">
          <LeafIcon size={14} /> {item.points.toLocaleString()} pts
        </span>
      </div>

      {/* Tree stump podium */}
      <div className="stump" style={{ height: podiumHeights[rank] }}>
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none" fill="none">
          <rect x="5" y="0" width="90" height="100" rx="8" fill={c.top} />
          <rect x="5" y="5" width="90" height="8" rx="3" fill={c.side} opacity="0.3" />
          <ellipse cx="50" cy="10" rx="45" ry="8" fill={c.top} />
          <ellipse cx="50" cy="10" rx="45" ry="8" fill="rgba(255,255,255,0.1)" />
          {/* Tree rings */}
          <ellipse cx="50" cy="10" rx="30" ry="5" fill="none" stroke={c.side} strokeWidth="0.5" opacity="0.3" />
          <ellipse cx="50" cy="10" rx="18" ry="3" fill="none" stroke={c.side} strokeWidth="0.5" opacity="0.3" />
          <ellipse cx="50" cy="10" rx="8" ry="1.5" fill="none" stroke={c.side} strokeWidth="0.5" opacity="0.3" />
        </svg>
      </div>

      {/* Leaves around stump */}
      <div className="stump-leaves">
        <LeafIcon size={18} color="#4ade80" />
        <LeafIcon size={14} color="#22c55e" />
      </div>
    </div>
  );
};

/* ── List Item (for ranks 4-5 in Students view) ── */
const ListItem = ({ item, rank, isVisible, onClick }) => (
  <div
    className={`list-item ${isVisible ? 'visible' : ''}`}
    onClick={() => onClick(item)}
    role="button"
    tabIndex={0}
    aria-label={`${item.name} - Rank ${rank} - ${item.points} points`}
    style={{ animationDelay: `${(rank - 3) * 150}ms` }}
  >
    <div className="list-item-rank">
      <RankBadge rank={rank} />
    </div>
    <Avatar name={item.name} rank={rank} />
    <div className="list-item-info">
      <span className="list-item-name">{item.name}</span>
      <span className="list-item-points">
        <LeafIcon size={14} /> {item.points.toLocaleString()} pts
      </span>
    </div>
    <div className="list-item-leaf">
      <LeafIcon size={20} color="#86efac" />
    </div>
  </div>
);

/* ── Detail Modal ── */
const DetailModal = ({ item, rank, onClose }) => {
  if (!item) return null;

  const maxPoints = 1500;
  const progressPercent = Math.min((item.points / maxPoints) * 100, 100);

  return (
    <div className="detail-modal-overlay" onClick={onClose}>
      <div className="detail-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">✕</button>
        <div className="modal-header">
          <Avatar name={item.name} rank={rank} />
          <div>
            <h3 className="modal-name">{item.name}</h3>
            <span className="modal-rank-label">Rank #{rank}</span>
          </div>
        </div>
        <div className="modal-stats">
          <div className="modal-stat">
            <span className="stat-label">Total Points</span>
            <span className="stat-value">{item.points.toLocaleString()}</span>
          </div>
          <div className="modal-stat">
            <span className="stat-label">Growth</span>
            <span className="stat-value stat-growth">+{item.growth}%</span>
          </div>
        </div>
        <div className="modal-progress">
          <span className="progress-label">Progress to next level</span>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <span className="progress-text">{item.points} / {maxPoints}</span>
        </div>
        <div className="modal-message">
          <LeafIcon size={18} />
          <span>Keep growing! Every action makes the planet greener 🌍</span>
        </div>
      </div>
    </div>
  );
};

/* ════════════════════════════════════════════════
   MAIN LEADERBOARD COMPONENT
   ════════════════════════════════════════════════ */
export default function Leaderboard({ onBack, students = [], teams = [] }) {
  const [activeTab, setActiveTab] = useState('classes');
  const [isVisible, setIsVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);
  const [animateSwitch, setAnimateSwitch] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const handleTabSwitch = (tab) => {
    if (tab === activeTab) return;
    setAnimateSwitch(true);
    setIsVisible(false);
    setTimeout(() => {
      setActiveTab(tab);
      setAnimateSwitch(false);
      setTimeout(() => setIsVisible(true), 100);
    }, 400);
  };

  const handleItemClick = (item) => {
    const data = activeTab === 'classes' ? classesData : studentsData;
    const rank = data.findIndex(d => d.id === item.id) + 1;
    setSelectedItem(item);
    setSelectedRank(rank);
  };

  const studentsData = students.map(student => ({ ...student, growth: 0 }));
  const classesData = teams.length > 0
    ? teams.map(team => ({ ...team, points: team.points || 0, growth: 0 }))
    : defaultClassesData;
  const data = activeTab === 'classes' ? classesData : studentsData;

  return (
    <section className="leaderboard-page" ref={containerRef} id="leaderboard-section">
      {/* ── Sky Background ── */}
      <div className="sky-bg">
        <SunSVG />
        <CloudSVG className="cloud-1" />
        <CloudSVG className="cloud-2" />
        <CloudSVG className="cloud-3" />
        <BirdSVG className="bird-1" />
        <BirdSVG className="bird-2" />
        <ButterflySVG className="butterfly-1" />
        <ButterflySVG className="butterfly-2" />
      </div>

      {/* ── Header ── */}
      <div className="leaderboard-header">
        {onBack ? (
          <button className="back-btn" aria-label="Go back" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            <span>Leaderboard</span>
          </button>
        ) : (
          <div className="leaderboard-header-title">
            <span>🏆 Leaderboard</span>
          </div>
        )}

        <div className="tab-switcher">
          <button
            className={`tab-btn ${activeTab === 'classes' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('classes')}
            id="tab-classes"
          >
            Classes
          </button>
          <button
            className={`tab-btn ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => handleTabSwitch('students')}
            id="tab-students"
          >
            Students
          </button>
          <div className={`tab-indicator ${activeTab}`}></div>
        </div>
      </div>

      {/* ── Title Banner ── */}
      <div className="title-banner">
        <div className="banner-leaves banner-leaf-left">
          <LeafIcon size={24} color="#22c55e" />
          <LeafIcon size={18} color="#4ade80" />
        </div>
        <div className="banner-content">
          {activeTab === 'classes' ? (
            <>
              <TrophyIcon />
              <h1 className="banner-title">Top Performers</h1>
              <p className="banner-subtitle">Growing ideas, building a greener tomorrow</p>
            </>
          ) : (
            <>
              <TrophyIcon />
              <h1 className="banner-title">Top Students</h1>
              <p className="banner-subtitle">Small steps make a big difference!</p>
            </>
          )}
        </div>
        <div className="banner-leaves banner-leaf-right">
          <LeafIcon size={18} color="#4ade80" />
          <LeafIcon size={24} color="#22c55e" />
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className={`leaderboard-content ${animateSwitch ? 'switching' : ''}`}>
        {/* ── Garden Background Elements ── */}
        <div className="garden-bg">
          <div className="garden-flowerbed flowerbed-left" aria-hidden="true">
            <BushSVG height={76} color="#48a95e" flowerColor="#f472b6" />
            <SmallPlantSVG height={58} flowerColor="#fbbf24" />
            <SmallPlantSVG height={52} flowerColor="#a78bfa" />
          </div>
          <div className="garden-flowerbed flowerbed-right" aria-hidden="true">
            <SmallPlantSVG height={54} flowerColor="#f472b6" />
            <BushSVG height={82} color="#3da35a" flowerColor="#fbbf24" />
            <SmallPlantSVG height={60} flowerColor="#93c5fd" />
          </div>
          <div className="garden-sparkles" aria-hidden="true">
            <span>✦</span><span>✦</span><span>✦</span>
          </div>
          {/* Fences */}
          <div className="fence fence-left"><FenceSVG width={160} /></div>
          <div className="fence fence-right"><FenceSVG width={160} /></div>
          <div className="fence fence-bottom"><FenceSVG width={300} /></div>

          {/* Stepping stones */}
          <div className="stones-left"><SteppingStoneSVG /></div>
          <div className="stones-right"><SteppingStoneSVG /></div>

          {/* Wooden sign */}
          <WoodenSign text={activeTab === 'classes' ? 'Small Actions Big Impact' : 'Great Students Grow Here'} />

          {/* Decorative flowers */}
          <SmallFlowerDeco x={5} y={60} color="#f472b6" size={0.9} />
          <SmallFlowerDeco x={92} y={55} color="#fbbf24" size={1.1} />
          <SmallFlowerDeco x={15} y={75} color="#93c5fd" size={0.8} />
          <SmallFlowerDeco x={85} y={70} color="#f472b6" size={0.7} />
          <SmallFlowerDeco x={50} y={82} color="#a78bfa" size={0.9} />
          <SmallFlowerDeco x={30} y={85} color="#fbbf24" size={0.6} />
          <SmallFlowerDeco x={70} y={88} color="#f472b6" size={0.8} />
          <SmallFlowerDeco x={8} y={90} color="#93c5fd" size={1} />
          <SmallFlowerDeco x={88} y={85} color="#fbbf24" size={0.7} />

          {/* Watering can */}
          <div className="watering-can-wrapper">
            <WateringCanSVG />
          </div>

          {/* Grass tufts */}
          {[10, 25, 45, 65, 80, 90].map((x, i) => (
            <div key={i} className="grass-tuft" style={{ left: `${x}%`, bottom: `${5 + (i % 3) * 3}%` }}>
              <svg width="20" height="16" viewBox="0 0 20 16" fill="none">
                <path d="M10 16 Q8 8 4 2" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M10 16 Q10 6 10 0" stroke="#22c55e" strokeWidth="2" strokeLinecap="round" fill="none" />
                <path d="M10 16 Q12 8 16 2" stroke="#4ade80" strokeWidth="2" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          ))}
        </div>

        {/* ── Classes View: Garden Map ── */}
        {activeTab === 'classes' && (
          <div className="garden-map">
            {data.map((item, index) => (
              <GardenSpot
                key={item.id}
                item={item}
                rank={index + 1}
                isVisible={isVisible}
                onClick={handleItemClick}
                isSelected={selectedItem?.id === item.id}
              />
            ))}
          </div>
        )}

        {/* ── Students View: Podiums + List ── */}
        {activeTab === 'students' && (
          <div className="students-view">
            {/* Top 3 podiums */}
            <div className="podium-area">
              {/* Render in 2, 1, 3 order for visual layout */}
              {[1, 0, 2].map(idx => (
                <StudentPodium
                  key={data[idx].id}
                  item={data[idx]}
                  rank={idx + 1}
                  isVisible={isVisible}
                  onClick={handleItemClick}
                />
              ))}
            </div>

            {/* Ranks 4-5 list */}
            <div className="remaining-list">
              {data.slice(3).map((item, index) => (
                <ListItem
                  key={item.id}
                  item={item}
                  rank={index + 4}
                  isVisible={isVisible}
                  onClick={handleItemClick}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ── Bottom Banner ── */}
      <div className="bottom-banner">
        <div className="bottom-banner-content">
          <LeafIcon size={20} color="#22c55e" />
          <span>
            {activeTab === 'classes'
              ? 'Ideas grow when we work together!'
              : 'Together we make a greener tomorrow'}
          </span>
          <LeafIcon size={20} color="#22c55e" />
        </div>
        {activeTab === 'students' && (
          <button className="keep-going-btn">Keep going! 💚</button>
        )}
      </div>

      {/* ── Detail Modal ── */}
      {selectedItem && (
        <DetailModal
          item={selectedItem}
          rank={selectedRank}
          onClose={() => { setSelectedItem(null); setSelectedRank(null); }}
        />
      )}
    </section>
  );
}
