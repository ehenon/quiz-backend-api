import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { InstrumentsModule } from './instruments/instruments.module';
import { HealthModule } from './health/health.module';
import { HttpLoggerMiddleware } from './logger/http-logger.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    InstrumentsModule,
    HealthModule,
  ],
})
export class AppModule implements NestModule {
  configure(middlewareConsumer: MiddlewareConsumer) {
    // For every route of the app, use the HTTP Logger middleware
    middlewareConsumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
