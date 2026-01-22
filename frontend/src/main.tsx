import './index.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { worker } from './mocks/browser.ts';
import App from './App.tsx';

const root = document.getElementById('root');

if (root) {
  // 개발 환경에서만 MSW 워커 시작
  if (process.env.NODE_ENV === 'development') {
    worker.start().then(() => {
      createRoot(root).render(
        <StrictMode>
          <App />
        </StrictMode>,
      );
    });
  } else {
    createRoot(root).render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
  }
}
