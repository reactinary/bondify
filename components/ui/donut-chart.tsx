"use client";
import { useEffect, useState, type ReactNode } from "react";

import { cn } from "@/lib/utils/core/cn";

interface DonutChartProps {
  size: number;
  progress: number;
  trackClassName?: string;
  circleWidth?: number;
  progressWidth?: number;
  rounded?: boolean;
  children?: ReactNode;
}

export function DonutChart({
  size,
  progress,
  trackClassName = "text-black/10 dark:text-white/10",
  circleWidth = 16,
  progressWidth = 16,
  rounded = true,
  children,
}: DonutChartProps) {
  const [shouldUseValue, setShouldUseValue] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // This is a hack to force the animation to run for the first time.
      // We can use framer-motion to achieve this but just keeping it simple for now.
      setShouldUseValue(true);
    }, 250);
    return () => clearTimeout(timeout);
  }, []);

  const radius = size / 2 - Math.max(progressWidth, circleWidth) / 2;
  const circumference = Math.PI * radius * 2;
  const percentage = shouldUseValue
    ? circumference * ((100 - progress) / 100)
    : circumference;

  return (
    <div className="absolute text-emerald-600">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: "rotate(-90deg)" }}
      >
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          fill="transparent"
          stroke="currentColor"
          strokeWidth={`${circleWidth}px`}
          strokeDasharray={"10px 0"}
          strokeDashoffset="0px"
          className={cn("duration-500", trackClassName)}
        />
        <circle
          r={radius}
          cx={size / 2}
          cy={size / 2}
          stroke="currentColor"
          className={cn("duration-500 text-emerald-600")}
          strokeWidth={`${progressWidth}px`}
          strokeLinecap={rounded ? "round" : "butt"}
          fill="transparent"
          strokeDasharray={`${circumference}px`}
          strokeDashoffset={`${percentage}px`}
        />
      </svg>
      {/* Add the progress number in the center */}
      <div
        className="absolute inset-0 flex items-center justify-center text-center text-xl font-bold text-neutral-500 transition-all duration-700 transform translate-y-2"
        style={{
          transform: shouldUseValue ? "translateY(0)" : "translateY(100%)",
          opacity: shouldUseValue ? 1 : 0,
        }}
      >
        {progress}%
      </div>
      {children}
    </div>
  );
}
