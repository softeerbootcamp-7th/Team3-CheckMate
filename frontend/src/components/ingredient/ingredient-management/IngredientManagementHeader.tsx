import { useNavigate } from 'react-router-dom';

import { ChevronLeft } from 'lucide-react';

import { Button } from '@/components/shared/shadcn-ui';

export const IngredientManagementHeader = () => {
  const navigate = useNavigate();
  const handleClickBackButton = () => {
    navigate(-1);
  };
  return (
    <header className="flex items-center gap-4">
      <Button onClick={handleClickBackButton}>
        <ChevronLeft className="text-grey-600 size-8" />
      </Button>
      <h1 className="title-large-semibold text-grey-900">식재료 관리</h1>
    </header>
  );
};
