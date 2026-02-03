import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.tsx';

const enableMocking = async () => {
  if (import.meta.env.MODE !== 'development') {
    return;
  }
  const { worker } = await import('./mocks/browser.ts');
  return worker.start();
};

const root = document.getElementById('root');

enableMocking().then(() => {
  if (root) {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
});
