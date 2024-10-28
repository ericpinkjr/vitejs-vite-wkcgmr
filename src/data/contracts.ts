export interface Contract {
  pick: number;
  years: number;
  total: number;
  average: number;
}

export const rookieContracts: Contract[] = [
  { pick: 1, years: 4, total: 54.07, average: 13.52 },
  { pick: 2, years: 4, total: 48.48, average: 12.12 },
  { pick: 3, years: 4, total: 43.39, average: 10.85 },
  { pick: 4, years: 4, total: 38.85, average: 9.71 },
  { pick: 5, years: 4, total: 34.84, average: 8.71 },
  { pick: 6, years: 4, total: 31.33, average: 7.83 },
  { pick: 7, years: 4, total: 28.28, average: 7.07 },
  { pick: 8, years: 4, total: 25.62, average: 6.41 },
  { pick: 9, years: 4, total: 23.32, average: 5.83 },
  { pick: 10, years: 4, total: 21.31, average: 5.33 },
  { pick: 11, years: 4, total: 19.58, average: 4.90 },
  { pick: 12, years: 4, total: 18.08, average: 4.52 },
  { pick: 13, years: 4, total: 16.74, average: 4.19 },
  { pick: 14, years: 4, total: 15.63, average: 3.91 },
  { pick: 15, years: 4, total: 14.59, average: 3.65 },
  { pick: 16, years: 4, total: 13.74, average: 3.43 },
  { pick: 17, years: 4, total: 12.92, average: 3.23 },
  { pick: 18, years: 4, total: 12.24, average: 3.06 },
  { pick: 19, years: 4, total: 11.60, average: 2.90 },
  { pick: 20, years: 4, total: 11.00, average: 2.75 },
  { pick: 21, years: 4, total: 10.47, average: 2.62 },
  { pick: 22, years: 4, total: 9.96, average: 2.49 },
  { pick: 23, years: 4, total: 9.49, average: 2.37 },
  { pick: 24, years: 4, total: 9.05, average: 2.26 },
  { pick: 25, years: 4, total: 8.66, average: 2.17 },
  { pick: 26, years: 4, total: 8.29, average: 2.07 },
  { pick: 27, years: 4, total: 7.97, average: 1.99 },
  { pick: 28, years: 4, total: 7.66, average: 1.92 },
  { pick: 29, years: 4, total: 7.35, average: 1.84 },
  { pick: 30, years: 4, total: 7.09, average: 1.77 }
];

export const secondRoundContract: Contract = {
  pick: 31,
  years: 2,
  total: 3.2,
  average: 1.6
};

export const undraftedContract: Contract = {
  pick: 0,
  years: 1,
  total: 1.1,
  average: 1.1
};

export const getContractByPick = (pick: number): Contract => {
  if (pick === 0) return undraftedContract;
  if (pick > 30) return secondRoundContract;
  return rookieContracts.find(c => c.pick === pick) || undraftedContract;
};

export const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount * 1000000);
};

export type DraftStatus = 'undrafted' | 'first_round' | 'second_round';