const WeightChart = () => {
  // Data points corresponding to your image
  const data = [
    { label: 'Now', value: 82, color: '#FF4D4D' }, // Red
    { label: 'Feb', value: 75, color: '#FF9F40' }, // Orange
    { label: 'Mar', value: 68, color: '#FFEB3B' }, // Yellow
    { label: 'Apr', value: 64, color: '#4CAF50' }, // Green
  ];

  // SVG dimensions
  const width = 500;
  const height = 200;
  const padding = 40;

  // Helper to calculate coordinates
  const getX = (index) =>
    (index * (width - padding * 2)) / (data.length - 1) + padding;
  const getY = (value) =>
    height - ((value - 60) * (height - padding * 2)) / (85 - 60) - padding;

  // Generate the Cubic Bezier Path (S-Curve)
  const points = data.map((d, i) => ({ x: getX(i), y: getY(d.value) }));

  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const controlX = (curr.x + next.x) / 2;
    pathD += ` C ${controlX} ${curr.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }

  return (
    // <div className="w-full max-w-2xl p-6 bg-white border border-gray-100 rounded-3xl shadow-sm font-sans">
    <div className="relative">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full overflow-visible"
      >
        <defs>
          {/* The multi-stop gradient for the line */}
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4D4D" />
            <stop offset="33%" stopColor="#FF9F40" />
            <stop offset="66%" stopColor="#FFEB3B" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>

          {/* Subtle gray area fill */}
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F4F4F5" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#F4F4F5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Background Area */}
        <path
          d={`${pathD} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`}
          fill="url(#areaGradient)"
        />

        {/* The Main Smooth Line */}
        <path
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="6"
          strokeLinecap="round"
        />

        {/* Data Points (Dots) */}
        {points.map((p, i) => (
          <g key={i}>
            <circle
              cx={p.x}
              cy={p.y}
              r="8"
              fill="white"
              className="shadow-sm"
            />
            <circle cx={p.x} cy={p.y} r="5" fill={data[i].color} />
            <text
              x={p.x}
              y={p.y - 20}
              textAnchor="middle"
              className="fill-gray-600 text-[12px] font-medium"
            >
              {data[i].value}kg
            </text>
            <text
              x={p.x}
              y={height + 15}
              textAnchor="middle"
              className="fill-gray-400 text-[12px]"
            >
              {data[i].label}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating Tooltip Target */}
      <div className="absolute top-[10%] right-[10%] rounded-[4px] border border-[#D1E7DD] bg-[#E8F5EE] p-3 text-center">
        <p className="text-[8px] font-bold tracking-wider text-[#198754] md:text-[10px]">
          Estimated target
        </p>
        <p className="text-[10px] font-bold text-[#198754] md:text-[12px]">
          62kg
        </p>
        {/* Tooltip Arrow */}
        <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-t-[8px] border-r-[8px] border-l-[8px] border-t-[#E8F5EE] border-r-transparent border-l-transparent"></div>
      </div>
    </div>
    // </div>
  );
};

export default WeightChart;
