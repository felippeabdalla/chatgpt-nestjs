import { Injectable } from '@nestjs/common';
import { ICurrentMonthYear } from '../interfaces/current-dates.interface';
import { IStartEndDatetime } from '../interfaces/start-end-datetime.interface';
import {
  ITodayDates,
  IYesterdayDates,
} from '../interfaces/yesterday-dates.interface';
import { ICurrentDayMonthYearAndHour } from '../interfaces/current-day-month-year-and-hour.interface';
import { DateHelperAdapter } from '../adapters/date-helper.adapter';

@Injectable()
export class DateHelperService {
  constructor(private readonly dateHelperAdapter: DateHelperAdapter) {}

  getYesterdayDates(): IYesterdayDates {
    return this.dateHelperAdapter.getYesterdayDates();
  }

  parseToLocalDatetime(date: Date | string = new Date()): string {
    return this.dateHelperAdapter.parseToLocalDatetime(date);
  }

  getDateTimeSubThreeHours(): string {
    return this.dateHelperAdapter.getDateTimeSubThreeHours();
  }

  getNextMonthDate(): string {
    return this.dateHelperAdapter.getNextMonthDate();
  }

  getYesterdayDateFormated(): string {
    return this.dateHelperAdapter.getYesterdayDateFormated();
  }

  getFutureStartEndDatetime(days: number): IStartEndDatetime {
    return this.dateHelperAdapter.getFutureStartEndDatetime(days);
  }

  getStartDatetime(date: Date): string {
    return this.dateHelperAdapter.getStartDatetime(date);
  }

  getEndDatetime(date: Date): string {
    return this.dateHelperAdapter.getEndDatetime(date);
  }

  getYesterdayDate(): string {
    return this.dateHelperAdapter.getYesterdayDate();
  }

  getCurrentDayMonthYearAndHour(): ICurrentDayMonthYearAndHour {
    return this.dateHelperAdapter.getCurrentDayMonthYearAndHour();
  }

  getCurrentMonthYear(): ICurrentMonthYear {
    return this.dateHelperAdapter.getCurrentMonthYear();
  }

  getPastStartEndDatetime(days: number): IStartEndDatetime {
    return this.dateHelperAdapter.getPastStartEndDatetime(days);
  }

  diffInMilisecondsWithCurrentDate(previouDate: string) {
    return this.dateHelperAdapter.diffInMilisecondsWithCurrentDate(previouDate);
  }

  formatedDate(date: Date, dateFormat: string) {
    return this.dateHelperAdapter.formatedDate(date, dateFormat);
  }

  getTodayDates(): ITodayDates {
    return this.dateHelperAdapter.getTodayDates();
  }
}
