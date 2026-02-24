import {
  SalesOverview,
  SalesPatterns,
  SalesSource,
  SalesTrends,
} from '@/components/sales';
import { useMainScrollTop } from '@/hooks/shared';

const SalesPage = () => {
  const { handleMainScrollToTop } = useMainScrollTop();
  return (
    <div
      className="mt-32.5 flex flex-col gap-13 pb-29.5"
      ref={handleMainScrollToTop}
    >
      <SalesOverview />
      <SalesSource />
      <SalesTrends />
      <SalesPatterns />
    </div>
  );
};

export default SalesPage;
