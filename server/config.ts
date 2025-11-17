import { z } from 'zod';

/**
 * Environment Configuration Schema
 * Makes critical fields optional with safe defaults for development
 */
const envSchema = z.object({
  // Core
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('5000'),

  // Database - OPTIONAL in development
  DATABASE_URL: z.string().optional(),

  // AI Services - OPTIONAL
  ANTHROPIC_API_KEY: z.string().optional(),
  ANTHROPIC_MODEL: z.string().default('claude-3-5-sonnet-20241022'),
  GENIE_3_API_KEY: z.string().optional(),
  REPLICATE_API_TOKEN: z.string().optional(),
  ELEVENLABS_API_KEY: z.string().optional(),

  // Web3 - OPTIONAL
  VITE_DYNAMIC_ENVIRONMENT_ID: z.string().optional(),
  DYNAMIC_API_KEY: z.string().optional(),
  NFT_CONTRACT_ADDRESS: z.string().optional(),
  ALCHEMY_API_KEY: z.string().optional(),
  ALCHEMY_NETWORK: z.string().default('eth-mainnet'),
  TREASURY_ADDRESS: z.string().optional(),

  // Storage - OPTIONAL
  PINATA_API_KEY: z.string().optional(),
  PINATA_SECRET_KEY: z.string().optional(),

  // Real-time - OPTIONAL
  PUSHER_APP_ID: z.string().optional(),
  PUSHER_KEY: z.string().optional(),
  PUSHER_SECRET: z.string().optional(),
  REDIS_URL: z.string().optional(),

  // Session - OPTIONAL in development
  SESSION_SECRET: z.string().optional(),

  // Monitoring - OPTIONAL
  SENTRY_DSN: z.string().optional(),
  POSTHOG_API_KEY: z.string().optional(),

  // Feature Flags
  ENABLE_BLOCKCHAIN: z.string().transform(val => val === 'true').default('false'),
  ENABLE_REAL_TIME: z.string().transform(val => val === 'true').default('true'),
  ENABLE_AI_RESPONSES: z.string().transform(val => val === 'true').default('true'),
  ENABLE_VOICE_SYNTHESIS: z.string().transform(val => val === 'true').default('false'),
  ENABLE_ENVIRONMENT_GENERATION: z.string().transform(val => val === 'true').default('false'),
});

type Env = z.infer<typeof envSchema>;

/**
 * Load and validate environment configuration with graceful error handling
 */
let config: Env;

try {
  config = envSchema.parse(process.env);
} catch (error) {
  if (process.env.NODE_ENV === 'production') {
    console.error('❌ Environment validation failed in production:');
    if (error instanceof z.ZodError) {
      error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
    }
    process.exit(1);
  } else {
    console.warn('⚠️  Some environment variables missing - using defaults for development');
    config = envSchema.parse({
      NODE_ENV: 'development',
      ...process.env,
    });
  }
}

/**
 * Check if specific services are configured and available
 */
export const services = {
  ai: {
    claude: !!config.ANTHROPIC_API_KEY,
    genie: !!config.GENIE_3_API_KEY,
    replicate: !!config.REPLICATE_API_TOKEN,
    voice: !!config.ELEVENLABS_API_KEY,
  },
  web3: {
    auth: !!config.VITE_DYNAMIC_ENVIRONMENT_ID,
    blockchain: !!config.ALCHEMY_API_KEY && !!config.NFT_CONTRACT_ADDRESS,
  },
  storage: {
    ipfs: !!config.PINATA_API_KEY && !!config.PINATA_SECRET_KEY,
  },
  database: !!config.DATABASE_URL,
  realtime: config.ENABLE_REAL_TIME,
  monitoring: {
    sentry: !!config.SENTRY_DSN,
    posthog: !!config.POSTHOG_API_KEY,
  }
};

/**
 * Log configuration status on startup
 */
export function logConfigStatus() {
  console.log('\n📊 Service Configuration Status:\n');

  console.log('🤖 AI Services:');
  console.log(`   Claude API: ${services.ai.claude ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Genie 3: ${services.ai.genie ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Replicate: ${services.ai.replicate ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Voice (ElevenLabs): ${services.ai.voice ? '✅ Configured' : '❌ Not configured'}`);

  console.log('\n🌐 Web3 Services:');
  console.log(`   Dynamic Auth: ${services.web3.auth ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   Blockchain RPC: ${services.web3.blockchain ? '✅ Configured' : '❌ Not configured'}`);

  console.log('\n💾 Database:');
  console.log(`   PostgreSQL: ${services.database ? '✅ Connected' : '❌ Not configured'}`);

  console.log('\n📦 Storage:');
  console.log(`   IPFS (Pinata): ${services.storage.ipfs ? '✅ Configured' : '❌ Not configured'}`);

  console.log('\n⚡ Features:');
  console.log(`   Real-time: ${services.realtime ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`   AI Responses: ${config.ENABLE_AI_RESPONSES ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`   Blockchain: ${config.ENABLE_BLOCKCHAIN ? '✅ Enabled' : '❌ Disabled'}`);
  console.log(`   Voice Synthesis: ${config.ENABLE_VOICE_SYNTHESIS ? '✅ Enabled' : '❌ Disabled'}`);

  console.log('\n📊 Monitoring:');
  console.log(`   Sentry: ${services.monitoring.sentry ? '✅ Configured' : '❌ Not configured'}`);
  console.log(`   PostHog: ${services.monitoring.posthog ? '✅ Configured' : '❌ Not configured'}`);

  console.log('\n');
}

export { config };
