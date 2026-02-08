import { Link } from 'react-router-dom';

import { ChevronLeft } from 'lucide-react';

export const IngredientManagementHeader = () => {
  return (
    <header className="flex items-center gap-4">
      <Link to="/settings">
        <ChevronLeft className="text-grey-600 size-8" />
      </Link>
      <span className="title-large-semibold text-grey-900">식재료 관리</span>
    </header>
  );
};
