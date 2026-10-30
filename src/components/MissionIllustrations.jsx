

// Render the header icon matching the mission category
export const HeaderIcon = ({ type }) => {
  if (type === 'plant') {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#ecfccb] border-2 border-[#d9f99d] rounded-2xl sm:rounded-3xl flex items-center justify-center p-2.5 shadow-xs flex-shrink-0">
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="24" cy="24" r="18" fill="#84CC16" fillOpacity="0.2" />
          {/* Sprout stem */}
          <path d="M24 38V22" stroke="#4D7C0F" strokeWidth="3.5" strokeLinecap="round" />
          {/* Leaves */}
          <path d="M24 26C24 26 16 26 14 18C22 17 24 24 24 26Z" fill="#65A30D" stroke="#365314" strokeWidth="1.5" />
          <path d="M24 22C24 22 32 21 34 14C26 13 24 20 24 22Z" fill="#84CC16" stroke="#365314" strokeWidth="1.5" />
          {/* Cute soil mound */}
          <ellipse cx="24" cy="38" rx="8" ry="3" fill="#A16207" />
        </svg>
      </div>
    );
  }

  if (type === 'water') {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#e0f2fe] border-2 border-[#bae6fd] rounded-2xl sm:rounded-3xl flex items-center justify-center p-2.5 shadow-xs flex-shrink-0">
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="24" cy="24" r="18" fill="#38BDF8" fillOpacity="0.2" />
          <path d="M24 10C24 10 15 23 15 28C15 32.97 19.03 37 24 37C28.97 37 33 32.97 33 28C33 23 24 10 24 10Z" fill="#0284C7" />
          <path d="M20 25C20 22 22 19 24 18" stroke="#BAE6FD" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="28" cy="30" r="2.5" fill="#E0F2FE" />
        </svg>
      </div>
    );
  }

  if (type === 'reuse') {
    return (
      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#dcfce7] border-2 border-[#bbf7d0] rounded-2xl sm:rounded-3xl flex items-center justify-center p-2.5 shadow-xs flex-shrink-0">
        <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
          <circle cx="24" cy="24" r="18" fill="#16A34A" fillOpacity="0.15" />
          <path d="M24 12L28 17H20L24 12Z" fill="#16A34A" />
          <path d="M24 17V23" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
          <path d="M34 26L32 32L26 28" fill="#16A34A" />
          <path d="M30 26L23 29" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
          <path d="M14 26L20 28L18 34" fill="#16A34A" />
          <path d="M18 26L24 33" stroke="#16A34A" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </div>
    );
  }

  // Default: Paper
  return (
    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#fef5e7] border-2 border-[#fde5be] rounded-2xl sm:rounded-3xl flex items-center justify-center p-2.5 shadow-xs flex-shrink-0">
      <svg viewBox="0 0 48 48" className="w-12 h-12" fill="none">
        <rect x="8" y="18" width="32" height="24" rx="4" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" />
        <path d="M12 18V12C12 10.9 12.9 10 14 10H30L36 16V18" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="2" />
        <path d="M22 28H26" stroke="#B45309" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

// Render the dedicated Mission Photo / Scene
export const MissionScene = ({ type, title }) => {
  if (type === 'grow-a-seedling') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-3 select-none">
        <div className="flex items-center justify-center gap-4 mt-3">
          {/* Seed in soil cup */}
          <div className="w-20 h-20 bg-lime-100 rounded-2xl border-2 border-lime-300 shadow-md flex items-center justify-center relative transform -rotate-3">
            <span className="text-4xl">🪴</span>
            <div className="absolute -top-2 -right-1 bg-white text-[11px] font-black px-2 py-0.5 rounded-full border border-lime-200 shadow-2xs text-lime-700">
              Day 1
            </div>
          </div>

          <span className="text-3xl text-lime-600 font-black animate-pulse">➔</span>

          {/* Sprouted green plant */}
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl border-2 border-emerald-300 shadow-md flex items-center justify-center relative transform rotate-3">
            <span className="text-4xl">🌻</span>
            <div className="absolute -top-2 -right-1 bg-white text-[11px] font-black px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs text-emerald-700">
              Day 10!
            </div>
          </div>
        </div>
        <p className="text-xs sm:text-sm font-extrabold text-[#3f6212] mt-3.5 text-center">
          Watering & caring for a seed for 7 to 10 days until it blossoms! 🌱
        </p>
      </div>
    );
  }

  if (type === 'save-water') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-3 select-none">
        <div className="flex items-center justify-center gap-4 mt-3">
          {/* Faucet */}
          <div className="w-20 h-20 bg-sky-100 rounded-2xl border-2 border-sky-300 shadow-md flex items-center justify-center relative transform -rotate-3">
            <span className="text-4xl">🚰</span>
            <div className="absolute -top-2 -right-1 bg-white text-[11px] font-black px-2 py-0.5 rounded-full border border-sky-200 shadow-2xs text-sky-700">
              Save Water
            </div>
          </div>

          <span className="text-3xl text-sky-500 font-black animate-pulse">➔</span>

          {/* Happy Garden */}
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl border-2 border-emerald-300 shadow-md flex items-center justify-center relative transform rotate-3">
            <span className="text-4xl">🌻</span>
            <div className="absolute -top-2 -right-1 bg-white text-[11px] font-black px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs text-emerald-700">
              Bloom!
            </div>
          </div>
        </div>
        <p className="text-xs sm:text-sm font-extrabold text-[#0369a1] mt-3.5 text-center">
          Turning off running taps protects clean water for all! 💧
        </p>
      </div>
    );
  }

  if (type === 'reuse-and-reduce') {
    return (
      <div className="relative w-full h-full flex flex-col items-center justify-center p-3 select-none">
        <div className="flex items-center justify-center gap-4 mt-3">
          {/* Clean bottles */}
          <div className="w-20 h-20 bg-emerald-100 rounded-2xl border-2 border-emerald-300 shadow-md flex items-center justify-center relative transform -rotate-3">
            <span className="text-4xl">🍼</span>
            <div className="absolute -top-2 -right-1 bg-white text-[11px] font-black px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs text-emerald-700">
              Recycle
            </div>
          </div>

          <span className="text-3xl text-emerald-600 font-black animate-pulse">➔</span>

          {/* Pencil holder organizer */}
          <div className="w-20 h-20 bg-amber-100 rounded-2xl border-2 border-amber-300 shadow-md flex items-center justify-center relative transform rotate-3">
            <span className="text-4xl">✏️</span>
            <div className="absolute -top-2 -right-1 bg-white text-[11px] font-black px-2 py-0.5 rounded-full border border-amber-200 shadow-2xs text-amber-700">
              Eco-Desk!
            </div>
          </div>
        </div>
        <p className="text-xs sm:text-sm font-extrabold text-[#1f402e] mt-3.5 text-center">
          Upcycling clean bottles into colorful desk organizers! ♻️
        </p>
      </div>
    );
  }

  // Default: Paper
  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-3 select-none">
      <div className="flex items-center justify-center gap-4 mt-3">
        <div className="w-20 h-20 bg-amber-100 rounded-2xl border-2 border-amber-300 shadow-md flex items-center justify-center relative transform -rotate-3">
          <span className="text-4xl">📦</span>
          <div className="absolute -top-2 -right-1 bg-white text-[11px] font-black px-2 py-0.5 rounded-full border border-amber-200 shadow-2xs text-amber-700">
            Recycle
          </div>
        </div>

        <span className="text-3xl text-emerald-600 font-black animate-pulse">➔</span>

        <div className="w-20 h-20 bg-emerald-100 rounded-2xl border-2 border-emerald-300 shadow-md flex items-center justify-center relative transform rotate-3">
          <span className="text-4xl">🎨</span>
          <div className="absolute -top-2 -right-1 bg-white text-[11px] font-black px-2 py-0.5 rounded-full border border-emerald-200 shadow-2xs text-emerald-700">
            New Life!
          </div>
        </div>
      </div>
      <p className="text-xs sm:text-sm font-extrabold text-[#1f402e] mt-3.5 text-center">
        Turning scrap paper into creative school art! 🌿
      </p>
    </div>
  );
};

// Render step-specific SVG illustrations
export const StepGraphic = ({ type }) => {
  switch (type) {
    // === SEEDLING / PLANT 7-10 DAYS STEPS ===
    case 'plant-seed':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          {/* Planting Cup with soil */}
          <path d="M42 46L50 92H90L98 46H42Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          <ellipse cx="70" cy="46" rx="28" ry="8" fill="#78350F" />
          {/* Seed being tucked inside */}
          <ellipse cx="70" cy="45" rx="5" ry="7" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" transform="rotate(25 70 45)" />
          {/* Little green shoot preview / sparkle */}
          <path d="M68 36C68 36 62 32 66 26C70 30 70 36 70 36" fill="#84CC16" />
          {/* Water drops */}
          <circle cx="85" cy="30" r="3" fill="#38BDF8" />
          <circle cx="92" cy="38" r="2" fill="#38BDF8" />
        </svg>
      );

    case 'plant-sun':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          {/* Warm Sun in corner */}
          <circle cx="36" cy="34" r="14" fill="#FBBF24" />
          <line x1="36" y1="12" x2="36" y2="16" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="14" y1="34" x2="18" y2="34" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="20" y1="20" x2="24" y2="24" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          <line x1="52" y1="20" x2="48" y2="24" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
          {/* Window sill table */}
          <rect x="25" y="86" width="90" height="8" rx="2" fill="#E2E8F0" stroke="#94A3B8" strokeWidth="1.5" />
          {/* Pot basking in sunlight */}
          <path d="M66 58L72 86H96L102 58H66Z" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
          <ellipse cx="84" cy="58" rx="18" ry="5" fill="#78350F" />
          {/* Little shoot stretching to the sun */}
          <path d="M84 56C84 56 74 44 65 42" stroke="#4D7C0F" strokeWidth="3" strokeLinecap="round" />
          <path d="M65 42C65 42 63 34 71 36C71 44 65 42 65 42Z" fill="#84CC16" />
        </svg>
      );

    case 'plant-sprout':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          {/* Soil ground cross-section */}
          <rect x="22" y="72" width="96" height="24" rx="6" fill="#78350F" stroke="#451A03" strokeWidth="2" />
          {/* Roots branching down */}
          <path d="M70 72V86C70 86 64 90 60 92" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          <path d="M70 78C70 78 76 84 80 88" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          {/* Tall strong stem shooting up */}
          <path d="M70 72V34" stroke="#4D7C0F" strokeWidth="3.5" strokeLinecap="round" />
          {/* Pair of beautiful baby leaves */}
          <path d="M70 42C70 42 54 36 50 26C62 25 70 38 70 42Z" fill="#65A30D" stroke="#365314" strokeWidth="1.5" />
          <path d="M70 34C70 34 86 28 90 18C78 17 70 30 70 34Z" fill="#84CC16" stroke="#365314" strokeWidth="1.5" />
          {/* Sparkles */}
          <path d="M96 28L98 32L102 34L98 36L96 40L94 36L90 34L94 32Z" fill="#FBBF24" />
        </svg>
      );

    case 'plant-show':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          {/* Fully grown plant with flower */}
          <rect x="48" y="70" width="34" height="24" rx="4" fill="#FED7AA" stroke="#EA580C" strokeWidth="2" />
          <path d="M65 70V30" stroke="#15803D" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="65" cy="24" r="9" fill="#FBBF24" />
          <circle cx="65" cy="12" r="5" fill="#F43F5E" />
          <circle cx="77" cy="24" r="5" fill="#F43F5E" />
          <circle cx="65" cy="36" r="5" fill="#F43F5E" />
          <circle cx="53" cy="24" r="5" fill="#F43F5E" />
          {/* Leaves */}
          <path d="M65 52C65 52 50 48 48 42C58 40 65 48 65 52Z" fill="#22C55E" />
          <path d="M65 44C65 44 80 40 82 34C72 32 65 40 65 44Z" fill="#22C55E" />
          {/* Yellow measuring ruler beside plant */}
          <rect x="94" y="20" width="14" height="74" rx="2" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
          <line x1="94" y1="30" x2="100" y2="30" stroke="#854D0E" strokeWidth="1.5" />
          <line x1="94" y1="42" x2="104" y2="42" stroke="#854D0E" strokeWidth="2" />
          <line x1="94" y1="54" x2="100" y2="54" stroke="#854D0E" strokeWidth="1.5" />
          <line x1="94" y1="66" x2="104" y2="66" stroke="#854D0E" strokeWidth="2" />
          <line x1="94" y1="78" x2="100" y2="78" stroke="#854D0E" strokeWidth="1.5" />
          {/* Stars */}
          <path d="M30 26L32 30L36 32L32 34L30 38L28 34L24 32L28 30Z" fill="#FBBF24" />
        </svg>
      );

    // === PAPER STEPS ===
    case 'paper-collect':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          <rect x="42" y="16" width="35" height="45" rx="3" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="2" transform="rotate(-10 42 16)" />
          <rect x="62" y="14" width="38" height="48" rx="3" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" transform="rotate(8 62 14)" />
          <line x1="72" y1="26" x2="90" y2="28" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="73" y1="34" x2="88" y2="36" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
          <path d="M25 45L70 32L115 45L115 88L70 102L25 88Z" fill="#F59E0B" opacity="0.3" />
          <path d="M25 45L70 58L70 102L25 88Z" fill="#FBBF24" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M70 58L115 45L115 88L70 102Z" fill="#F59E0B" stroke="#D97706" strokeWidth="2.5" strokeLinejoin="round" />
          <path d="M25 45L12 36L55 26L70 35Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          <path d="M115 45L128 36L85 26L70 35Z" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
          <circle cx="48" cy="74" r="10" fill="#FEF3C7" />
          <path d="M46 70C46 70 50 71 50 75C50 78 46 78 46 78" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'paper-craft':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          <rect x="30" y="25" width="40" height="55" rx="3" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" transform="rotate(-8 30 25)" />
          <rect x="58" y="25" width="45" height="58" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" transform="rotate(4 58 25)" />
          <path d="M68 38L92 40" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" />
          <path d="M69 46L88 47" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M70 54L85 55" stroke="#94A3B8" strokeWidth="1.5" strokeLinecap="round" />
          <polygon points="75,65 95,50 88,72" fill="#FDE047" stroke="#CA8A04" strokeWidth="2" />
          <circle cx="42" cy="78" r="6" stroke="#EA580C" strokeWidth="2.5" fill="#FFEDD5" />
          <circle cx="54" cy="84" r="6" stroke="#EA580C" strokeWidth="2.5" fill="#FFEDD5" />
          <line x1="46" y1="74" x2="65" y2="58" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="56" y1="80" x2="52" y2="58" stroke="#94A3B8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );

    case 'paper-show':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          <path d="M28 28L30 34L36 36L30 38L28 44L26 38L20 36L26 34Z" fill="#FBBF24" />
          <path d="M110 24L112 30L118 32L112 34L110 40L108 34L102 32L108 30Z" fill="#FBBF24" />
          <rect x="42" y="20" width="56" height="66" rx="6" fill="#F0FDF4" stroke="#86EFAC" strokeWidth="2.5" />
          <circle cx="70" cy="46" r="14" fill="#DCFCE7" />
          <path d="M70 54V40C70 40 64 36 62 42C60 48 70 50 70 50" fill="#22C55E" />
          <path d="M70 44C70 44 76 40 78 45C80 50 70 51 70 51" fill="#16A34A" />
          <rect x="62" y="58" width="16" height="14" rx="2" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="95" cy="75" r="9" fill="#16A34A" />
          <path d="M91 75L94 78L99 72" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    // === WATER STEPS ===
    case 'water-tap':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          <path d="M35 85V45C35 32 45 25 65 25H85V38H65C54 38 48 42 48 52V85H35Z" fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          <rect x="80" y="38" width="12" height="10" rx="2" fill="#64748B" />
          <rect x="74" y="16" width="24" height="6" rx="2" fill="#0284C7" stroke="#0369A1" strokeWidth="1.5" />
          <rect x="83" y="22" width="6" height="6" fill="#64748B" />
          <circle cx="86" cy="62" r="7" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="100" cy="56" r="5" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.5" />
          <circle cx="96" cy="72" r="4" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1" />
          <circle cx="50" cy="78" r="10" fill="#10B981" />
          <path d="M46 78L49 81L55 75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'water-leak':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          <path d="M70 24C70 24 50 50 50 64C50 75 59 84 70 84C81 84 90 75 90 64C90 50 70 24 70 24Z" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
          <path d="M60 60C60 54 64 48 68 44" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="78" cy="58" r="18" fill="white" fillOpacity="0.4" stroke="#F59E0B" strokeWidth="3" />
          <line x1="91" y1="71" x2="112" y2="92" stroke="#B45309" strokeWidth="5" strokeLinecap="round" />
          <path d="M40 32L42 36L46 38L42 40L40 44L38 40L34 38L38 36Z" fill="#FBBF24" />
        </svg>
      );

    case 'water-plants':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          <rect x="30" y="40" width="34" height="36" rx="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
          <path d="M64 54L85 44" stroke="#0284C7" strokeWidth="4" strokeLinecap="round" />
          <rect x="83" y="40" width="8" height="10" rx="2" fill="#0284C7" />
          <path d="M30 46C20 46 16 52 16 60C16 68 20 74 30 74" stroke="#0284C7" strokeWidth="3" fill="none" />
          <circle cx="92" cy="54" r="2.5" fill="#38BDF8" />
          <circle cx="98" cy="62" r="3" fill="#38BDF8" />
          <path d="M96 90L92 74H116L112 90H96Z" fill="#F97316" stroke="#C2410C" strokeWidth="2" />
          <line x1="104" y1="74" x2="104" y2="58" stroke="#16A34A" strokeWidth="2.5" />
          <circle cx="104" cy="54" r="6" fill="#FBBF24" />
          <circle cx="104" cy="46" r="4" fill="#F43F5E" />
          <circle cx="112" cy="54" r="4" fill="#F43F5E" />
          <circle cx="96" cy="54" r="4" fill="#F43F5E" />
        </svg>
      );

    // === REUSE STEPS ===
    case 'reuse-collect':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          <path d="M30 48L38 92H102L110 48H30Z" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" />
          <rect x="25" y="42" width="90" height="8" rx="3" fill="#16A34A" />
          <rect x="46" y="24" width="16" height="34" rx="4" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" transform="rotate(-6 46 24)" />
          <rect x="50" y="18" width="8" height="6" fill="#0284C7" transform="rotate(-6 50 18)" />
          <rect x="74" y="22" width="18" height="36" rx="4" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" transform="rotate(10 74 22)" />
          <circle cx="70" cy="72" r="10" fill="#BBF7D0" />
          <path d="M66 68L70 65L74 68" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M74 76L70 79L66 76" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'reuse-transform':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          <rect x="50" y="34" width="40" height="56" rx="10" fill="#FEF08A" stroke="#EAB308" strokeWidth="2.5" />
          <polygon points="54,34 50,22 62,34" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
          <polygon points="86,34 90,22 78,34" fill="#FEF08A" stroke="#EAB308" strokeWidth="2" />
          <circle cx="63" cy="50" r="3" fill="#451A03" />
          <circle cx="77" cy="50" r="3" fill="#451A03" />
          <path d="M70 54L68 58H72Z" fill="#F43F5E" />
          <rect x="58" y="16" width="6" height="24" rx="1" fill="#F43F5E" />
          <rect x="68" y="12" width="6" height="28" rx="1" fill="#38BDF8" />
          <rect x="78" y="18" width="6" height="22" rx="1" fill="#10B981" />
          <line x1="28" y1="84" x2="44" y2="56" stroke="#B45309" strokeWidth="3" strokeLinecap="round" />
          <polygon points="44,56 47,50 49,56" fill="#38BDF8" />
        </svg>
      );

    case 'reuse-organize':
      return (
        <svg viewBox="0 0 140 110" className="w-28 h-28" fill="none">
          <rect x="18" y="78" width="104" height="10" rx="3" fill="#FED7AA" stroke="#EA580C" strokeWidth="1.5" />
          <rect x="36" y="44" width="26" height="34" rx="6" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
          <rect x="42" y="30" width="4" height="20" fill="#F43F5E" />
          <rect x="50" y="26" width="4" height="24" fill="#10B981" />
          <rect x="68" y="48" width="32" height="30" rx="6" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2" />
          <rect x="74" y="38" width="6" height="16" fill="#FBBF24" />
          <rect x="84" y="34" width="10" height="20" rx="2" fill="#E2E8F0" stroke="#94A3B8" />
          <path d="M106 32L108 36L112 38L108 40L106 44L104 40L100 38L104 36Z" fill="#FBBF24" />
          <circle cx="28" cy="38" r="8" fill="#10B981" />
          <path d="M25 38L27 40L31 36" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    default:
      return null;
  }
};
