export default function Science({ kind = 0 }: { kind?: number }) {
  return (
    <svg
      className="science"
      viewBox="0 0 300 230"
      role="img"
      aria-label={
        [
          "Ilustración de célula animal",
          "Doble hélice de ADN",
          "Cuidado de la salud",
          "Hoja y vida",
        ][kind]
      }
    >
      <defs>
        <radialGradient id={`g${kind}`}>
          <stop stopColor="#eee4ff" />
          <stop offset="1" stopColor="#ac8bd6" />
        </radialGradient>
      </defs>
      {kind === 0 ? (
        <g>
          <path
            d="M44 114C25 52 96 18 153 32S274 66 265 133s-68 77-124 65S57 181 44 114Z"
            fill="url(#g0)"
            stroke="#8c6ec2"
            strokeWidth="5"
          />
          <path
            d="M59 115C44 69 103 39 151 49s106 26 96 80-57 66-102 53S73 165 59 115Z"
            fill="#d9c9ed"
            stroke="#b59ace"
            strokeWidth="2"
          />
          <ellipse
            cx="155"
            cy="112"
            rx="45"
            ry="39"
            fill="#a77ec8"
            stroke="#8260ab"
            strokeWidth="3"
          />
          <ellipse cx="161" cy="108" rx="17" ry="15" fill="#7b539f" />
          {[
            [85, 84],
            [205, 150],
            [92, 149],
          ].map(([x, y]) => (
            <g key={x} transform={`translate(${x} ${y}) rotate(-25)`}>
              <rect
                x="-17"
                y="-8"
                width="34"
                height="16"
                rx="8"
                fill="#58aeb0"
              />
              <path
                d="M-10 0l6 -5 6 10 6 -10 4 5"
                fill="none"
                stroke="#d1eeee"
                strokeWidth="2"
              />
            </g>
          ))}
          <path
            d="M195 77q30-14 27 2m-32 6q32-14 31 2M117 147q-10 20 15 18m-10-11q-10 20 15 18"
            fill="none"
            stroke="#b58bb6"
            strokeWidth="5"
          />
          {[
            [76, 120],
            [120, 70],
            [200, 110],
            [170, 165],
            [133, 142],
          ].map(([x, y]) => (
            <circle key={x} cx={x} cy={y} r="3" fill="#8e6aa7" />
          ))}
        </g>
      ) : kind === 1 ? (
        <g fill="none" strokeWidth="9" strokeLinecap="round">
          <path d="M110 22c145 60-85 125 65 190" stroke="#37a4b4" />
          <path d="M175 22C30 82 260 147 110 212" stroke="#9176cd" />
          {Array.from({ length: 8 }, (_, i) => (
            <path
              key={i}
              d={`M${113 + Math.sin(i) * 25} ${35 + i * 25}h55`}
              stroke={i % 2 ? "#b8a4dc" : "#72bfc6"}
              strokeWidth="5"
            />
          ))}
        </g>
      ) : kind === 2 ? (
        <g>
          <circle cx="150" cy="115" r="88" fill="#f6dce9" />
          <path
            d="M150 171C40 105 99 40 150 85c51-45 110 20 0 86"
            fill="#d57fa5"
          />
          <path
            d="M78 117h40l14-27 17 55 18-35h53"
            stroke="white"
            strokeWidth="6"
            fill="none"
          />
        </g>
      ) : (
        <g>
          <circle cx="150" cy="115" r="87" fill="#f7e8ca" />
          <path d="M103 168Q69 62 209 52q15 113-106 116" fill="#74b69c" />
          <path
            d="M93 190 188 76m-64 77-5-42m25 18 35-3"
            stroke="#e7f6df"
            strokeWidth="5"
            fill="none"
          />
        </g>
      )}
      <circle cx="250" cy="36" r="5" fill="#85c9c7" />
      <path d="M45 39v16m-8-8h16" stroke="#ac9cdd" strokeWidth="3" />
    </svg>
  );
}
