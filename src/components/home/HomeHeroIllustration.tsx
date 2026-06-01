/** نمای گرافیکی مفهومی: ترازو + تقویم — بدون تصویر خارجی */
export function HomeHeroIllustration() {
  return (
    <div
      className="relative aspect-[4/3] w-full"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-br from-lawwin-navy via-lawwin-navy-deepest to-black/50" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(212,175,55,0.2),transparent_55%)]" />
      <div className="absolute inset-x-8 bottom-8 top-8 rounded-2xl ring-1 ring-lawwin-gold/15" />

      <svg
        viewBox="0 0 320 240"
        className="relative h-full w-full p-8 sm:p-10"
        fill="none"
      >
        <ellipse cx="160" cy="200" rx="110" ry="14" fill="url(#heroGlow)" />
        <defs>
          <radialGradient id="heroGlow">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
          </radialGradient>
        </defs>

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
