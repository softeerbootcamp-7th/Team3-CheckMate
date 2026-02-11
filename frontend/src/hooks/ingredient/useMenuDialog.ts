import { useState } from 'react';

export const useMenuDialog = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return { isDialogOpen, setIsDialogOpen };
};
