import { UTCDate } from '@date-fns/utc';
import { Injectable } from '@nestjs/common';
import {
  addDays,
  addMonths,
  endOfDay,
  format,
  getMonth,
  getUnixTime,
  getYear,
  startOfDay,
  subDays,
  subHours,
} from 'date-fns';
import { ICurrentMonthYear } from '../interfaces/current-dates.interface';
import { ICurrentDayMonthYearAndHour } from '../interfaces/current-day-month-year-and-hour.interface';
import { IStartEndDatetime } from '../interfaces/start-end-datetime.interface';
import {
  ITodayDates,
  IYesterdayDates,
} from '../interfaces/yesterday-dates.interface';

@Injectable()
export class DateHelperAdapter {
  getYesterdayDates(): IYesterdayDates {
    const yesterdayDate = subDays(new Date(), 1);
    const currentYear = getYear(yesterdayDate);
    const currentMonth = getMonth(yesterdayDate) + 1;

    return {
      currentMonth: currentMonth,
      currentYear: currentYear,
      yesterdayDate: format(yesterdayDate, 'yyyy/MM/dd'),
    };
  }

  getTodayDates(): ITodayDates {
    const todayDate = new Date(this.parseToLocalDatetime());
    const currentYear = getYear(todayDate);
    const currentMonth = getMonth(todayDate) + 1;

    return {
      currentMonth: currentMonth,
      currentYear: currentYear,
      todayDate: format(todayDate, 'yyyy/MM/dd'),
    };
  }

  parseToLocalDatetime(date: Date | string = new Date()): string {
    if (!(date instanceof Date)) {
      date = new Date(date);
    }

    return subHours(new UTCDate(date), 3).toISOString();
  }

  getDateTimeSubThreeHours(): string {
    return subHours(new Date(), 3).toISOString();
  }

  getNextMonthDate(): string {
    return subHours(addMonths(new Date(), 1), 3).toISOString();
  }

  getYesterdayDateFormated(): string {
    return format(subDays(new Date(), 1), 'yyyyMMdd');
  }

  getFutureStartEndDatetime(days: number): IStartEndDatetime {
    const futureDate = addDays(new Date(), days);
    return {
      startDatetime: startOfDay(futureDate).toISOString(),
      endDatetime: endOfDay(futureDate).toISOString(),
    };
  }

  getStartDatetime(date: Date): string {
    return startOfDay(date).toISOString();
  }

  getEndDatetime(date: Date): string {
    return endOfDay(date).toISOString();
  }

  getYesterdayDate(): string {
    return subDays(new Date(), 1).toISOString();
  }

  getCurrentDayMonthYearAndHour(): ICurrentDayMonthYearAndHour {
    const currentDates = new Date(this.parseToLocalDatetime());
    const day = currentDates.getDate();
    const hour = currentDates.getHours();
    const month = currentDates.getMonth() + 1;
    const year = currentDates.getFullYear();

    return {
      day,
      hour,
      month,
      year,
    };
  }

  getCurrentMonthYear(): ICurrentMonthYear {
    const currentDate = new Date();
    const currentYear = getYear(currentDate);
    const currentMonth = getMonth(currentDate) + 1;

    return {
      currentMonth: currentMonth,
      currentYear: currentYear,
    };
  }

  getPastStartEndDatetime(days: number): IStartEndDatetime {
    const futureDate = subDays(new Date(), days);
    return {
      startDatetime: startOfDay(futureDate).toISOString(),
      endDatetime: endOfDay(futureDate).toISOString(),
    };
  }

  diffInMilisecondsWithCurrentDate(previouDate: string) {
    const currentDate =
      getUnixTime(new Date(this.parseToLocalDatetime())) * 1000;

    const previouDateTime = getUnixTime(new Date(previouDate)) * 1000;

    const difference = currentDate - previouDateTime;

    return difference;
  }

  formatedDate(date: Date, dateFormat: string) {
    return format(date, dateFormat);
  }
}
