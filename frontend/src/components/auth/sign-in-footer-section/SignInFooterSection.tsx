import { Link } from 'react-router-dom';

import { ROUTE_PATHS } from '@/constants/shared';

export const SignInFooterSection = () => {
  return (
    <section className="flex size-full flex-col items-center justify-center gap-3">
      <div className="text-grey-700 body-medium-medium flex items-center gap-3">
        <Link to={ROUTE_PATHS.TERMS} target="_blank" rel="noopener noreferrer">
          이용약관
        </Link>
        <div className="bg-grey-400 h-4 w-px" />
        <Link
          to={ROUTE_PATHS.PRIVACY}
          target="_blank"
          rel="noopener noreferrer"
        >
          개인정보처리방침
        </Link>
      </div>
      <p className="body-medium-medium text-grey-500">
        Copyright(C) CHECKMATE.ALL RIGHTS RESERVED.
      </p>
    </section>
  );
};
