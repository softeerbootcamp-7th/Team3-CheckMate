import { ErrorBoundary } from 'react-error-boundary';

import { FetchBoundary } from '@/components/shared';

import { CardEditView } from './CardEditView';
import { EditCardProvider } from './EditCardProvider';
import { EditErrorFallback } from './EditErrorFallback';
import { MiniView } from './MiniView';

export const DashboardEditLayout = () => {
  return (
    <div className="flex size-full overflow-y-hidden">
      <FetchBoundary>
        <ErrorBoundary
          fallbackRender={(props) => <EditErrorFallback {...props} />}
        >
          <EditCardProvider>
            <MiniView />
            <CardEditView />
          </EditCardProvider>
        </ErrorBoundary>
      </FetchBoundary>
    </div>
  );
};
