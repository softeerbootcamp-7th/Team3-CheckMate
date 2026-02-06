import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

import { Toaster } from '@/components/shared/shadcn-ui';
import { PageRouter } from '@/routes';
import { queryClient } from '@/services/shared';

function App() {
  return (
    <div className="h-screen w-screen">
      <QueryClientProvider client={queryClient}>
        <PageRouter />
        <ReactQueryDevtools initialIsOpen={false} />
        <Toaster />
      </QueryClientProvider>
    </div>
  );
}

export default App;
