import { Controller, Get } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller()
export class HealthController {
  constructor(private readonly prisma: PrismaService) {}

  @Get()
  root() {
    return {
      name: 'UnicornTail API',
      status: 'ok',
    };
  }

  @Get('health')
  health() {
    return {
      status: 'ok',
      uptime: process.uptime(),
    };
  }

  @Get('health/db')
  async database() {
    try {
      // Round-trip to Postgres to confirm the connection is live.
      await this.prisma.$queryRaw`SELECT 1`;
      return { status: 'ok', database: 'up' };
    } catch {
      return { status: 'error', database: 'down' };
    }
  }
}
