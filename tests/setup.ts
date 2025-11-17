import { config } from 'dotenv';
import { beforeAll, afterAll } from 'vitest';

// Load test environment
config({ path: '.env.test' });

beforeAll(async () => {
  console.log('🧪 Test suite starting...');
});

afterAll(async () => {
  console.log('✅ Test suite complete');
});
