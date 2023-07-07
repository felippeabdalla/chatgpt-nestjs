import { UTCDate } from '@date-fns/utc';
import { subHours } from 'date-fns';

export function parseToLocalDatetime(date: Date | string = new Date()): string {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }
  return subHours(new UTCDate(date), 3).toISOString();
}

export function getDateTimeSubThreeHours(): string {
  return subHours(new Date(), 3).toISOString();
}
