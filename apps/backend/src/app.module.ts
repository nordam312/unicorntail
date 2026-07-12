import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { SitesModule } from './modules/sites/sites.module';
import { PagesModule } from './modules/pages/pages.module';

@Module({
  imports: [
    // Load environment variables globally (reads process.env, injected by Docker).
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    HealthModule,
    SitesModule,
    PagesModule,
  ],
})
export class AppModule {}
