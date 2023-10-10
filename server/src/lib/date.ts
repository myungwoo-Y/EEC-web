const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const tz = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(tz);
dayjs.tz.setDefault('Asia/Seoul');

export function toFullDate(date: string | Date) {
  return dayjs.utc(date).format('YYYY년 M월 D일');
}

export function getNow() {
  return dayjs().toDate();
}