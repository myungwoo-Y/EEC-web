import * as dayjs from 'dayjs';

export function toFullDate(date: string | Date) {
  return dayjs(date).format('YYYY년 M월 D일');
}