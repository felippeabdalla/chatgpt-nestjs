import { Module } from '@nestjs/common';
import { PinoLogger } from 'nestjs-pino';
import { Logger } from './logger.service';

@Module({
  providers: [Logger, PinoLogger],
  exports: [Logger],
})
export class LoggerModule {}
