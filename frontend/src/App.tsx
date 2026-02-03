import { Toaster } from 'sonner';

import { PageRouter } from '@/routes';

function App() {
  return (
    <div className="h-screen w-screen">
      <PageRouter />
      <Toaster offset={{ bottom: '250px' }} />
    </div>
  );
}

export default App;
