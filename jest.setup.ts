require('dotenv').config();
jest.setTimeout(30000); // 30 seconds timeout

// Import expect from Jest
import { expect } from '@jest/globals';

// More precise type declaration
declare global {
  namespace NodeJS {
    interface Global {
      expect: typeof expect;
    }
  }
  // For newer TypeScript versions
  var expect: typeof expect;
}

// // Set global expect
// global.expect = expect;