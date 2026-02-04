import { useState } from 'react';

import { IngredientEditDialog } from '@/components/ingredient';

export const SettingPage = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return (
    <div>
      <div
        className="bg-special-card-bg rounded-200 flex h-[200px] w-[256px] cursor-pointer flex-col justify-between p-6"
        onClick={() => setIsDialogOpen(true)}
      >
        <p className="title-small-bold">딸기 스무디</p>
        <p className="text-end">5800 원</p>
      </div>
      <IngredientEditDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        menuId="28"
      />
    </div>
  );
};
