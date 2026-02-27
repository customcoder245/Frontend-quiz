import { useEffect, useRef, useState } from 'react';

const WeightChart = ({ currentWeight = 82, goalWeight = 62 }: { currentWeight?: number, goalWeight?: number }) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);
  const [pathLength, setPathLength] = useState(1000); // Default high value

  useEffect(() => {
    if (pathRef.current) {
      const length = pathRef.current.getTotalLength();
      setPathLength(length);
    }
    // Small delay to ensure the browser has registered the initial dashoffset
    const timer = setTimeout(() => setIsAnimated(true), 100);
    return () => clearTimeout(timer);
  }, [currentWeight, goalWeight]);

  // Generate dynamic data points
  const diff = currentWeight - goalWeight;
  const data = [
    { label: 'NOW', value: currentWeight, color: '#FF4D4D' },
    { label: 'FEB', value: Math.round(currentWeight - diff * 0.35), color: '#FF9F40' },
    { label: 'MAR', value: Math.round(currentWeight - diff * 0.7), color: '#FFEB3B' },
    { label: 'APR', value: goalWeight, color: '#4CAF50' },
  ];

  // SVG dimensions
  const width = 600;
  const height = 300;
  const paddingX = 60;
  const paddingY = 60;

  // Scale calculations
  const minVal = goalWeight - 10;
  const maxVal = currentWeight + 10;
  const range = maxVal - minVal;

  // Helper to calculate coordinates
  const getX = (index: number) =>
    (index * (width - paddingX * 2)) / (data.length - 1) + paddingX;

  const getY = (value: number) =>
    height - ((value - minVal) * (height - paddingY * 2)) / range - paddingY;

  // Generate the points
  const points = data.map((d, i) => ({ x: getX(i), y: getY(d.value) }));

  // Generate the Cubic Bezier Path (S-Curve)
  let pathD = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const controlX = (curr.x + next.x) / 2;
    pathD += ` C ${controlX} ${curr.y}, ${controlX} ${next.y}, ${next.x} ${next.y}`;
  }

  return (
    <div className="relative w-full overflow-visible py-10">
      <style dangerouslySetInnerHTML={{
        __html: `
        .draw-path {
          stroke-dasharray: ${pathLength};
          stroke-dashoffset: ${isAnimated ? 0 : pathLength};
          transition: stroke-dashoffset 2000ms ease-in-out;
        }
        .fade-in {
          opacity: ${isAnimated ? 1 : 0};
          transition: opacity 800ms ease-out;
        }
      `}} />

      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-auto w-full overflow-visible"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FF4D4D" />
            <stop offset="33%" stopColor="#FF9F40" />
            <stop offset="66%" stopColor="#FFEB3B" />
            <stop offset="100%" stopColor="#4CAF50" />
          </linearGradient>

          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F4F4F5" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#F4F4F5" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Background Area */}
        <path
          d={`${pathD} L ${points[points.length - 1].x} ${height - paddingY / 2} L ${points[0].x} ${height - paddingY / 2} Z`}
          fill="url(#areaGradient)"
          className="fade-in"
          style={{ transitionDelay: '500ms' }}
        />

        {/* The Main Smooth Line */}
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="url(#lineGradient)"
          strokeWidth="8"
          strokeLinecap="round"
          className="draw-path"
        />

        {/* Data Points and Labels */}
        {points.map((p, i) => (
          <g
            key={i}
            className="fade-in"
            style={{
              transitionDelay: `${(i * 400 + 800)}ms`
            }}
          >
            {/* White glow behind circle */}
            <circle cx={p.x} cy={p.y} r="10" fill="white" className="opacity-50" />

            <circle
              cx={p.x}
              cy={p.y}
              r="7"
              fill="white"
              stroke={data[i].color}
              strokeWidth="3"
              className="shadow-sm"
            />

            {/* Weight Value Text */}
            <text
              x={p.x}
              y={p.y - 25}
              textAnchor="middle"
              className="fill-[#1a1a1b] text-[16px] font-black baikal-trial"
            >
              {data[i].value}kg
            </text>

            {/* Month Label Text */}
            <text
              x={p.x}
              y={height - 10}
              textAnchor="middle"
              className="fill-gray-400 text-[14px] font-bold tracking-widest uppercase"
            >
              {data[i].label}
            </text>
          </g>
        ))}
      </svg>

      {/* Floating Tooltip Target */}
      <div
        className="absolute top-0 right-0 md:right-[5%] translate-x-[10%] md:translate-x-0 fade-in"
        style={{
          transitionDelay: '2000ms',
          top: `${(getY(goalWeight) / height) * 100 - 20}%`
        }}
      >
        <div className="relative rounded-[16px] border border-[#D1E7DD] bg-[#E8F5EE] px-6 py-4 text-center shadow-xl shadow-green-900/10 animate-bounce min-w-[120px]">
          <p className="text-[10px] font-black tracking-[0.15em] text-[#198754] uppercase mb-1 whitespace-nowrap">
            Estimated target
          </p>
          <p className="text-[20px] font-black text-[#198754] leading-none">
            {goalWeight}kg
          </p>
          {/* Tooltip Arrow */}
          <div className="absolute -bottom-2 left-1/2 h-0 w-0 -translate-x-1/2 border-t-[10px] border-r-[10px] border-l-[10px] border-t-[#E8F5EE] border-r-transparent border-l-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default WeightChart;
