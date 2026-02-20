import { CardEditView } from './CardEditView';
import { EditCardProvider } from './EditCardProvider';
import { MiniView } from './MiniView';

export const DashboardEditLayout = () => {
  return (
    <div className="flex size-full">
      <EditCardProvider>
        <MiniView />
        <CardEditView />
      </EditCardProvider>
    </div>
  );
};
