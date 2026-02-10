import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';

import { TooltipProvider } from '@/components/shared/shadcn-ui';
import { PageRouter } from '@/routes';
import { queryClient } from '@/services/shared';

function App() {
  return (
    <div className="h-screen w-screen">
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <PageRouter />
          <Toaster offset={{ bottom: '250px' }} />
          <ReactQueryDevtools initialIsOpen={false} />
        </TooltipProvider>
      </QueryClientProvider>
    </div>
  );
}

export default App;
