import { useState } from 'react';

export const useMenuCard = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  return { isDialogOpen, setIsDialogOpen };
};
