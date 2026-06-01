/** نمای گرافیکی مفهومی: ترازو + تقویم — بدون تصویر خارجی */
export function HomeHeroIllustration() {
  return (
    <div
      className="relative mx-auto aspect-[4/3] w-full max-w-md lg:max-w-none"
      aria-hidden
    >
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-lawwin-navy via-lawwin-navy-deepest to-black/40 ring-1 ring-white/10" />
      <div className="absolute inset-4 rounded-2xl bg-lawwin-gold/5 ring-1 ring-lawwin-gold/20" />

      <svg
        viewBox="0 0 320 240"
        className="relative h-full w-full p-6"
        fill="none"
      >
        <ellipse cx="160" cy="200" rx="100" ry="12" fill="url(#heroGlow)" />
        <defs>
          <radialGradient id="heroGlow">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* تقویم */}
        <rect
          x="48"
          y="56"
          width="88"
          height="96"
          rx="8"
          fill="#F8F9FA"
          fillOpacity="0.95"
        />
        <rect x="48" y="56" width="88" height="24" rx="8" fill="#D4AF37" />
        <text
          x="92"
          y="72"
          textAnchor="middle"
          fill="#0D1B2A"
          fontSize="11"
          fontWeight="600"
        >
          ۱۴۰۵
        </text>
        {[0, 1, 2].map((row) =>
          [0, 1, 2].map((col) => (
            <rect
              key={`${row}-${col}`}
              x={58 + col * 24}
              y={90 + row * 22}
              width="18"
              height="14"
              rx="2"
              fill={row === 1 && col === 1 ? "#D4AF37" : "#E4E4E7"}
              fillOpacity={row === 1 && col === 1 ? 1 : 0.8}
            />
          )),
        )}

        {/* ترازو */}
        <path
          d="M200 88h48M224 88v72M200 160h48"
          stroke="#D4AF37"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M176 100c0-8 6-14 14-14h4c8 0 14 6 14 14v4H176v-4Z"
          fill="#D4AF37"
          fillOpacity="0.9"
        />
        <path
          d="M168 108h32l-8 28H176l-8-28Z"
          fill="#F8F9FA"
          fillOpacity="0.9"
        />
        <path
          d="M248 108h32l-8 28h-16l-8-28Z"
          fill="#F8F9FA"
          fillOpacity="0.9"
        />
        <circle cx="224" cy="88" r="6" fill="#D4AF37" />

        {/* ساعت کوچک */}
        <circle cx="248" cy="52" r="20" stroke="#D4AF37" strokeWidth="2" />
        <path
          d="M248 52v-8M248 52l6 4"
          stroke="#D4AF37"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
