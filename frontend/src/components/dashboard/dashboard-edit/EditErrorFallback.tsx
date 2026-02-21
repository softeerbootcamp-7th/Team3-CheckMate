import type { FallbackProps } from 'react-error-boundary';
import { useNavigate } from 'react-router-dom';

import { ErrorFallback } from '@/components/shared';

export const EditErrorFallback = (props: FallbackProps) => {
  const navigate = useNavigate();

  return (
    <ErrorFallback
      buttonText="나가기"
      onClickButton={() => navigate(-1)}
      {...props}
    />
  );
};
