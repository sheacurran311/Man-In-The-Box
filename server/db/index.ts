import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { config, services } from '../config';
import * as schema from '../../shared/schema';

// Create database client
let db: ReturnType<typeof drizzle> | null = null;
let pool: Pool | null = null;

if (services.database && config.DATABASE_URL) {
  pool = new Pool({
    connectionString: config.DATABASE_URL,
  });

  db = drizzle(pool, { schema });

  console.log('✅ Database connected');
} else {
  console.warn('⚠️  Database not configured - using mock storage');
}

export { db, pool };
export * from '../../shared/schema';
