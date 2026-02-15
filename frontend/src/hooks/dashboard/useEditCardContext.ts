import { useContext } from 'react';

import { EditCardContext } from '@/constants/dashboard/editCardContext';

export const useEditCardContext = () => {
  const context = useContext(EditCardContext);

  if (!context) {
    throw new Error('EditCardContext not found');
  }

  return context;
};
