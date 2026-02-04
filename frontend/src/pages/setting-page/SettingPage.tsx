import { useState } from 'react';

import { IngredientEditDialog } from '@/components/ingredient';

export const SettingPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(true);
  return (
    <IngredientEditDialog
      open={isDialogOpen}
      onOpenChange={setIsDialogOpen}
      menuId="28"
    />
  );
};
