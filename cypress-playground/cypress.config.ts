import { defineConfig } from 'cypress';
import * as path from 'path';

export default defineConfig({
  e2e: {
    baseUrl: 'https://thinking-tester-contact-list.herokuapp.com',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    chromeWebSecurity: false,
    setupNodeEvents(on, config) {
      // Access and copy environment variables
      config.env = {
        ...config.env,
        UIUSER: process.env.UIUSER,
        UIPWD: process.env.UIPWD
      };
      
      return config;
    },
  },
  fixturesFolder: path.resolve(__dirname, '../'), // Set the fixtures folder to the project root
  // Use the main project's tsconfig
  env: {
    tsConfig: path.resolve(__dirname, '../tsconfig.json')
  }
});