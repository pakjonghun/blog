import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CacheStore } from './cache';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, CacheStore],
})
export class AppModule {}
