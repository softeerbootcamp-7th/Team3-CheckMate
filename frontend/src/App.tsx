import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Sidebar } from './components/shared';

function App() {
  return (
    <div className="h-screen w-screen">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
