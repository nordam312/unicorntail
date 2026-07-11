import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

// Prisma 7 moved CLI/Migrate configuration out of schema.prisma into this file.
// The connection URL is read from DATABASE_URL (injected by Docker, or loaded
// from a local .env via the dotenv import above).
export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});
