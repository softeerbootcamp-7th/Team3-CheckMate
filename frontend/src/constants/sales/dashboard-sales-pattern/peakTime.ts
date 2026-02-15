import type { GetDetailPeakTimeResponseDto } from '@/types/sales';

export const PEAK_TIME = {
  EXAMPLE_DATA: {
    todayPeak: 8,
    comparisonPeak: 18,
    diff: 10,
    shiftDirection: 'EARLY',
    beforeComparisonPeak: true,
    todayItems: [
      { timeSlot2H: 0, orderCount: 12, netAmount: 300000 },
      { timeSlot2H: 2, orderCount: 8, netAmount: 180000 },
      { timeSlot2H: 4, orderCount: 5, netAmount: 120000 },
      { timeSlot2H: 6, orderCount: 18, netAmount: 420000 },
      { timeSlot2H: 8, orderCount: 42, netAmount: 980000 },
      { timeSlot2H: 10, orderCount: null, netAmount: null },
      { timeSlot2H: 12, orderCount: null, netAmount: null },
      { timeSlot2H: 14, orderCount: null, netAmount: null },
      { timeSlot2H: 16, orderCount: null, netAmount: null },
      { timeSlot2H: 18, orderCount: null, netAmount: null },
      { timeSlot2H: 20, orderCount: null, netAmount: null },
      { timeSlot2H: 22, orderCount: null, netAmount: null },
    ],
    week4Items: [
      { timeSlot2H: 0, orderCount: 10, netAmount: 250000 },
      { timeSlot2H: 2, orderCount: 7, netAmount: 170000 },
      { timeSlot2H: 4, orderCount: 6, netAmount: 140000 },
      { timeSlot2H: 6, orderCount: 15, netAmount: 360000 },
      { timeSlot2H: 8, orderCount: 35, netAmount: 840000 },
      { timeSlot2H: 10, orderCount: 48, netAmount: 1160000 },
      { timeSlot2H: 12, orderCount: 62, netAmount: 1520000 },
      { timeSlot2H: 14, orderCount: 58, netAmount: 1430000 },
      { timeSlot2H: 16, orderCount: 54, netAmount: 1310000 },
      { timeSlot2H: 18, orderCount: 66, netAmount: 1650000 },
      { timeSlot2H: 20, orderCount: 40, netAmount: 990000 },
      { timeSlot2H: 22, orderCount: 22, netAmount: 540000 },
    ],
  } satisfies GetDetailPeakTimeResponseDto,
};
