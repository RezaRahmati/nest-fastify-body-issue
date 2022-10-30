import {
  Module,
  OnModuleInit,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Application } from 'express';
import { FastifyInstance } from 'fastify';

@Module({})
export class LoggerModule implements OnModuleInit, NestModule {
  constructor(private readonly adapterHost: HttpAdapterHost) { }

  onModuleInit(): void {
    const adapterInstance = this.adapterHost.httpAdapter.getInstance();
    if (this.adapterIsFastify(adapterInstance)) {
      adapterInstance.addHook('onRequest', this.log as any);
    }
  }

  configure(consumer: MiddlewareConsumer): void {
    if (!this.adapterIsFastify(this.adapterHost.httpAdapter.getInstance())) {
      consumer.apply(this.log).forRoutes('*');
    }
  }

  private adapterIsFastify(
    adapter: Application | FastifyInstance,
  ): adapter is FastifyInstance {
    return this.adapterHost.httpAdapter.getType() === 'fastify';
  }

  private log(req: any, res, next): void {
    console.log(Object.keys(req));
    console.log(`req.raw.body`, req.raw?.body);
    console.log(`req.body`, req.body);
    console.log(`req.query`, req.query);
  }
}
