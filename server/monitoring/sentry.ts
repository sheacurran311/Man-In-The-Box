import * as Sentry from '@sentry/node';
import { config } from '../config';
import type { Express } from 'express';

export function initializeSentry(app: Express) {
  if (!process.env.SENTRY_DSN) {
    console.warn('⚠️  Sentry not configured - error monitoring disabled');
    return;
  }

  Sentry.init({
    dsn: process.env.SENTRY_DSN,
    environment: config.NODE_ENV,
    tracesSampleRate: config.NODE_ENV === 'production' ? 0.1 : 1.0,
    integrations: [
      new Sentry.Integrations.Http({ tracing: true }),
      new Sentry.Integrations.Express({ app }),
    ],
  });

  // Request handler must be first
  app.use(Sentry.Handlers.requestHandler());

  // Tracing handler
  app.use(Sentry.Handlers.tracingHandler());

  console.log('✅ Sentry initialized');
}

export function addSentryErrorHandler(app: Express) {
  // Error handler must be last
  app.use(Sentry.Handlers.errorHandler());
}

export { Sentry };
