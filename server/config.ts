import { z } from 'zod';

/**
 * Environment Configuration Schema
 * Validates all required environment variables
 */
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url(),
  REDIS_URL: z.string().optional(),

  // AI Services
  ANTHROPIC_API_KEY: z.string().optional(),
  ANTHROPIC_MODEL: z.string().default('claude-3-5-sonnet-20241022'),
  GENIE_3_API_KEY: z.string().optional(),
  REPLICATE_API_TOKEN: z.string().optional(),
  ELEVENLABS_API_KEY: z.string().optional(),

  // Web3
  VITE_DYNAMIC_ENVIRONMENT_ID: z.string().optional(),
  DYNAMIC_API_KEY: z.string().optional(),
  ALCHEMY_API_KEY: z.string().optional(),
  NFT_CONTRACT_ADDRESS: z.string().optional(),
  TREASURY_ADDRESS: z.string().optional(),

  // Storage
  PINATA_API_KEY: z.string().optional(),
  PINATA_SECRET_KEY: z.string().optional(),

  // Real-time
  PUSHER_APP_ID: z.string().optional(),
  PUSHER_KEY: z.string().optional(),
  PUSHER_SECRET: z.string().optional(),

  // Monitoring
  SENTRY_DSN: z.string().optional(),
  POSTHOG_API_KEY: z.string().optional(),

  // Application
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3000'),
  SESSION_SECRET: z.string().min(32),

  // Feature Flags
  ENABLE_VOICE_SYNTHESIS: z.string().transform(val => val === 'true').default('false'),
  ENABLE_ENVIRONMENT_GENERATION: z.string().transform(val => val === 'true').default('false'),
  ENABLE_BLOCKCHAIN: z.string().transform(val => val === 'true').default('false'),
  ENABLE_REAL_TIME: z.string().transform(val => val === 'true').default('false'),
});

type Env = z.infer<typeof envSchema>;

/**
 * Load and validate environment configuration
 */
function loadConfig(): Env {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment configuration:');
      error.errors.forEach(err => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
}

export const config = loadConfig();

/**
 * Check if specific services are configured
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
    ipfs: !!config.PINATA_API_KEY,
  },
  realtime: {
    pusher: !!config.PUSHER_APP_ID,
  },
  monitoring: {
    sentry: !!config.SENTRY_DSN,
    posthog: !!config.POSTHOG_API_KEY,
  }
};

/**
 * Log configuration status on startup
 */
export function logConfigStatus() {
  console.log('\n🔧 Configuration Status:');
  console.log(`   Environment: ${config.NODE_ENV}`);
  console.log(`   Port: ${config.PORT}`);
  console.log('\n🤖 AI Services:`);
  console.log(`   Claude API: ${services.ai.claude ? '✅' : '❌ Not configured'}`);
  console.log(`   Genie 3: ${services.ai.genie ? '✅' : '❌ Not configured'}`);
  console.log(`   Replicate: ${services.ai.replicate ? '✅' : '❌ Not configured'}`);
  console.log(`   Voice: ${services.ai.voice ? '✅' : '❌ Not configured'}`);
  console.log('\n⛓️  Web3 Services:');
  console.log(`   Authentication: ${services.web3.auth ? '✅' : '❌ Not configured'}`);
  console.log(`   Blockchain: ${services.web3.blockchain ? '✅' : '❌ Not configured'}`);
  console.log('\n💾 Storage:');
  console.log(`   IPFS: ${services.storage.ipfs ? '✅' : '❌ Not configured'}`);
  console.log('\n🔴 Real-time:');
  console.log(`   Pusher: ${services.realtime.pusher ? '✅' : '❌ Not configured'}`);
  console.log('\n📊 Monitoring:');
  console.log(`   Sentry: ${services.monitoring.sentry ? '✅' : '❌ Not configured'}`);
  console.log(`   PostHog: ${services.monitoring.posthog ? '✅' : '❌ Not configured'}\n`);
}
