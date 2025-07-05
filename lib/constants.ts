export const FIXED_CATEGORIES = [
  "Food",
  "Transportation",
  "Utilities",
  "Entertainment",
  "Healthcare",
  "Education",
  "Shopping",
  "Savings",
  "Miscellaneous",
] as const;

export type CategoryType = (typeof FIXED_CATEGORIES)[number];
