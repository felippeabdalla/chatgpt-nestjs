import { Module } from '@nestjs/common';
import { DateHelperAdapter } from './adapters/date-helper.adapter';
import { DateHelperService } from './services/date-helper.service';

@Module({
  providers: [DateHelperService, DateHelperAdapter],
  exports: [DateHelperService, DateHelperAdapter],
})
export class DateHelperModule {}
