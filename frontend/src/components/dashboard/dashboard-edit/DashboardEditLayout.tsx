import { FetchBoundary } from '@/components/shared';

import { CardEditView } from './CardEditView';
import { EditCardProvider } from './EditCardProvider';
import { MiniView } from './MiniView';

export const DashboardEditLayout = () => {
  return (
    <div className="flex size-full overflow-y-hidden">
      <FetchBoundary>
        <EditCardProvider>
          <MiniView />
          <CardEditView />
        </EditCardProvider>
      </FetchBoundary>
    </div>
  );
};
