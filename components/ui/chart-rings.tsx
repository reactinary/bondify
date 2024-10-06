export type RingItem = {
  progress: number;
  className?: string;
  trackClassName?: string;
  progressClassName?: string;
};

export interface RingChartProps {
  size?: number;
  gap?: number;
  width?: number;
  className?: string;
  rings?: RingItem[];
}

export const calculateRingSize = ({
  size = 96,
  width = 20,
  gap = 4,
  index,
  total,
}: Pick<RingChartProps, "gap" | "size" | "width"> & {
  index: number;
  total: number;
}) => {
  const position = total - index;
  // Size of the smallest ring + ring width on 2 side + gap on 2 side
  // offset by the position.
  return size + position * width * 2 + gap * position * 2;
};
