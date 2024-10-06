"use client";
import React from "react";

import {
	AvailableChartColors,
	type AvailableChartColorsKeys,
	getColorClassName,
} from "@/components/ui/charts/chart-colors";
import { cn } from "@/lib/utils/core/cn";

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@/components/ui/tooltip";

const getMarkerBgColor = (
	marker: number | undefined,
	values: number[],
	colors: AvailableChartColorsKeys[],
): string => {
	if (marker === undefined) return "";

	if (marker === 0) {
		for (let index = 0; index < values.length; index++) {
			if (values[index] > 0) {
				return getColorClassName(colors[index], "bg");
			}
		}
	}

	let prefixSum = 0;
	for (let index = 0; index < values.length; index++) {
		prefixSum += values[index];
		if (prefixSum >= marker) {
			return getColorClassName(colors[index], "bg");
		}
	}

	return getColorClassName(colors[values.length - 1], "bg");
};

const getPositionLeft = (
	value: number | undefined,
	maxValue: number,
): number => (value ? (value / maxValue) * 100 : 0);

const sumNumericArray = (arr: number[]) =>
	arr.reduce((prefixSum, num) => prefixSum + num, 0);

const BarLabels = ({ values }: { values: number[] }) => {
	const sumValues = React.useMemo(() => sumNumericArray(values), [values]);
	let prefixSum = 0;
	let sumConsecutiveHiddenLabels = 0;

	return (
		<div
			className={cn(
				// base
				"relative mb-2 flex h-5 w-full text-sm font-medium",
				// text color
				"text-gray-700 dark:text-gray-300",
			)}
		>
			{values.map((widthPercentage, index) => {
				prefixSum += widthPercentage;

				const showLabel =
					(widthPercentage >= 0.1 * sumValues ||
						sumConsecutiveHiddenLabels >= 0.09 * sumValues) &&
					sumValues - prefixSum >= 0.1 * sumValues &&
					prefixSum >= 0.1 * sumValues &&
					prefixSum < 0.9 * sumValues;

				sumConsecutiveHiddenLabels = showLabel
					? 0
					: (sumConsecutiveHiddenLabels += widthPercentage);

				const widthPositionLeft = getPositionLeft(widthPercentage, sumValues);

				return (
					<div
						key={`item-${index}`}
						className="flex items-center justify-end pr-0.5"
						style={{ width: `${widthPositionLeft}%` }}
					>
						<span
							className={cn(
								showLabel ? "block" : "hidden",
								"translate-x-1/2 text-sm tabular-nums",
							)}
						>
							{prefixSum}
						</span>
					</div>
				);
			})}
			<div className="absolute bottom-0 left-0 flex items-center">0</div>
			<div className="absolute bottom-0 right-0 flex items-center">
				{sumValues}
			</div>
		</div>
	);
};

interface CategoryBarProps extends React.HTMLAttributes<HTMLDivElement> {
	values: number[];
	colors?: AvailableChartColorsKeys[];
	marker?: {
		value: number;
		tooltipContent?: React.ReactNode;
		showAnimation?: boolean;
	};
	showLabels?: boolean;
}

const CategoryBar = React.forwardRef<HTMLDivElement, CategoryBarProps>(
	(
		{
			values = [],
			colors = AvailableChartColors,
			marker,
			showLabels = true,
			className,
			...props
		},
		forwardedRef,
	) => {
		const markerBgColor = React.useMemo(
			() => getMarkerBgColor(marker?.value, values, colors),
			[marker, values, colors],
		);

		const maxValue = React.useMemo(() => sumNumericArray(values), [values]);

		const adjustedMarkerValue = React.useMemo(() => {
			if (marker === undefined) return undefined;
			if (marker.value < 0) return 0;
			if (marker.value > maxValue) return maxValue;
			return marker.value;
		}, [marker, maxValue]);

		const markerPositionLeft: number = React.useMemo(
			() => getPositionLeft(adjustedMarkerValue, maxValue),
			[adjustedMarkerValue, maxValue],
		);

		return (
			<TooltipProvider>
				<div
					ref={forwardedRef}
					className={cn(className)}
					aria-label="category bar"
					aria-valuenow={marker?.value}
					tremor-id="tremor-raw"
					{...props}
				>
					{showLabels ? <BarLabels values={values} /> : null}
					<div className="relative flex h-2 w-full items-center">
						<div className="flex h-full flex-1 items-center gap-0.5 overflow-hidden rounded-full">
							{values.map((value, index) => {
								const barColor = colors[index] ?? "gray";
								const percentage = (value / maxValue) * 100;
								return (
									<div
										key={`item-${index}`}
										className={cn(
											"h-full",
											getColorClassName(
												barColor as AvailableChartColorsKeys,
												"bg",
											),
											percentage === 0 && "hidden",
										)}
										style={{ width: `${percentage}%` }}
									/>
								);
							})}
						</div>

						{marker !== undefined ? (
							<div
								className={cn(
									"absolute w-2 -translate-x-1/2",
									marker.showAnimation &&
										"transform-gpu transition-all duration-300 ease-in-out",
								)}
								style={{
									left: `${markerPositionLeft}%`,
								}}
							>
								{marker.tooltipContent ? (
									<Tooltip>
										<TooltipTrigger>
											<div
												aria-hidden="true"
												className={cn(
													"relative mx-auto h-4 w-1 rounded-full ring-2",
													"ring-white dark:ring-gray-950",
													markerBgColor,
												)}
											>
												<div
													aria-hidden
													className="absolute size-7 -translate-x-[45%] -translate-y-[15%]"
												/>
											</div>
										</TooltipTrigger>
										<TooltipContent>{marker.tooltipContent}</TooltipContent>
									</Tooltip>
								) : (
									<div
										className={cn(
											"mx-auto h-4 w-1 rounded-full ring-2",
											"ring-white dark:ring-gray-950",
											markerBgColor,
										)}
									/>
								)}
							</div>
						) : null}
					</div>
				</div>
			</TooltipProvider>
		);
	},
);

CategoryBar.displayName = "CategoryBar";

export { CategoryBar, type CategoryBarProps };
