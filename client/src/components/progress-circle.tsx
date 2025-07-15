interface ProgressCircleProps {
  percentage: number;
  size?: number;
}

export default function ProgressCircle({ percentage, size = 128 }: ProgressCircleProps) {
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (circumference * percentage) / 100;
  
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg 
        className="transform -rotate-90" 
        width={size} 
        height={size}
      >
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={radius} 
          stroke="currentColor" 
          strokeWidth="8" 
          fill="transparent" 
          className="text-gray-300 dark:text-gray-600"
        />
        <circle 
          cx={size / 2} 
          cy={size / 2} 
          r={radius} 
          stroke="currentColor" 
          strokeWidth="8" 
          fill="transparent" 
          className="baby-blue dark:golden transition-all duration-500 ease-in-out"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-2xl font-bold text-gray-800 dark:text-white">
          {Math.round(percentage)}%
        </span>
      </div>
    </div>
  );
}
