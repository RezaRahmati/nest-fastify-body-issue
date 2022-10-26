import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddlewareService } from './logger-middleware/logger-middleware.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, LoggerMiddlewareService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddlewareService).forRoutes('*');
}
}
