import { useState } from 'react';

import { IngredientEditDialog } from '@/components/shared';

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
