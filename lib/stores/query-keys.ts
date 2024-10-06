const MAIN_KEYS = {
  rates: "rates",
} as const;

export const rateQKey = {
  rates: () => [MAIN_KEYS.rates],
} as const;
