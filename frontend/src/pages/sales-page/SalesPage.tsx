import {
  SalesOverview,
  SalesPatterns,
  SalesSource,
  SalesTrends,
} from '@/components/sales';

export const SalesPage = () => {
  return (
    <div className="mt-32.5 flex flex-col gap-13 pb-29.5">
      <SalesOverview />
      <SalesSource />
      <SalesTrends />
      <SalesPatterns />
    </div>
  );
};
