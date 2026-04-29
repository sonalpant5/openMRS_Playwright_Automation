import { defineConfig, devices } from '@playwright/test';
import { ENV } from './src/utils/env';
import fs from 'fs';

const storageFile = 'storageState.json';
const skipLogin = process.env.SKIP_LOGIN !== 'false';

export default defineConfig({
  testDir: './src',
  testIgnore: skipLogin ? ['**/login.spec.ts'] : [],
  globalSetup: require.resolve('./src/setup/globalSetup'),

  fullyParallel: true,

  use: {
    baseURL: ENV.baseURL,

    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',

    storageState: fs.existsSync(storageFile) ? storageFile : undefined,
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
