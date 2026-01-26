import { BrowserRouter } from 'react-router-dom';

import { Sidebar } from '@/components/shared';

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Sidebar />
      </BrowserRouter>
    </div>
  );
}

export default App;
