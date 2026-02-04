/// <reference types="vitest/config" />
// https://vite.dev/config/
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';
import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';

const dirname =
  typeof __dirname !== 'undefined'
    ? __dirname
    : path.dirname(fileURLToPath(import.meta.url));

// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineConfig(({ mode }) => {
  // const env = loadEnv(mode, process.cwd(), '');
  const isDevelopment = mode === 'development';
  // const apiUrl = env.VITE_API_URL;
  return {
    plugins: [
      react(),
      tailwindcss(),
      svgr({
        svgrOptions: {
          // 모든 SVG 내부의 특정 색상을 currentColor로 변환
          replaceAttrValues: {
            '#797A7D': 'currentColor',
          },
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      projects: [
        {
          extends: true,
          plugins: [
            // The plugin will run tests for the stories defined in your Storybook config
            // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
            storybookTest({
              configDir: path.join(dirname, '.storybook'),
            }),
          ],
          test: {
            name: 'storybook',
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [
                {
                  browser: 'chromium',
                },
              ],
            },
            setupFiles: ['.storybook/vitest.setup.ts'],
          },
        },
      ],
    },
    server: {
      // proxy: {
      //   '/api': {
      //     target: apiUrl,
      //     changeOrigin: true,
      //     rewrite: (path) => {
      //       return path.replaceAll('/api', '');
      //     },
      //   },
      // },
      https: isDevelopment
        ? {
            key: fs.readFileSync(path.resolve(__dirname, 'localhost-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'localhost.pem')),
          }
        : undefined,
    },
  };
});
