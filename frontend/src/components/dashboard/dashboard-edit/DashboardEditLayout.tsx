import { CardEditView } from './CardEditView';
import { MiniView } from './MiniView';

export const DashboardEditLayout = () => {
  return (
    <div className="flex size-full overflow-y-hidden">
      <MiniView />
      <CardEditView />
    </div>
  );
};
