import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddlewareService } from './logger-middleware/logger-middleware.service';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [LoggerModule],
  controllers: [AppController],
  providers: [AppService, LoggerMiddlewareService],
})
export class AppModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoggerMiddlewareService).forRoutes('*');
// }
}
