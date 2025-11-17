import type { Config } from 'drizzle-kit';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.DATABASE_URL) {
  console.warn('⚠️  DATABASE_URL not found - migrations will fail');
  console.warn('   Add DATABASE_URL to your environment variables');
}

export default {
  schema: './shared/schema.ts',
  out: './drizzle/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL || 'postgresql://localhost:5432/mitb',
  },
  verbose: true,
  strict: true,
} satisfies Config;
