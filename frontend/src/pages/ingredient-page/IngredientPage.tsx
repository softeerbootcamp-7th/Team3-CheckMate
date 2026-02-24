import { IngredientManagement } from '@/components/ingredient';
import { FetchBoundary } from '@/components/shared';

const IngredientPage = () => {
  return (
    <div className="mt-20">
      <FetchBoundary>
        <IngredientManagement />
      </FetchBoundary>
    </div>
  );
};

export default IngredientPage;
