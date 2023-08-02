import dayjs from "dayjs";
import utc from 'dayjs/plugin/utc'
import tz from 'dayjs/plugin/timezone'

dayjs.extend(utc)
dayjs.extend(tz)
dayjs.tz.setDefault('Asia/Seoul');

export function addSlashToStr(date: string, split = 2) {
  let result = '';

  for (let i = 0; i < date.length; i++) {
    result += date[i];
    if ((i+1) % split === 0 && i !== date.length - 1) {
      result += '-';
    }
  }

  return result;
}

export function toInputDate(date: string) {
  if (!date) {
    return '';
  }
  
  return dayjs.utc(date).format('YYYY-MM-DD');
}

export function toKoreaDate(date: string) {
  if (!date) {
    return '';
  }
  return dayjs.utc(date).format('YYYY년 M월 D일');
}

