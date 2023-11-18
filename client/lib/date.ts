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
  if (!date || date === '-infinity') {
    return '';
  }
  return dayjs.utc(date).tz('Asia/Seoul').format('YYYY-MM-DD');
}

export function toKrDate(date: string) {
  if (!date || date === '-infinity') {
    return '';
  }
  return dayjs.utc(date).tz('Asia/Seoul').format('YYYY년 M월 D일');
}

export function toSixBirthday(date: string) {
  if (!date || date === '-infinity') {
    return '';
  }
  return dayjs.utc(date).tz('Asia/Seoul').format('YYMMDD');
}

export function toISOString(date: string | number) {
  if (!date || date === '-infinity') {
    return '-infinity';
  }
  return dayjs.utc(date).tz('Asia/Seoul').toISOString();
}

export function toDetailDate(date: string) {
  if (!date || date === '-infinity') {
    return '';
  } 

  return dayjs.utc(date).tz('Asia/Seoul').format('YYYY-MM-DD HH:mm');
}

export function getSimpleNow() {
  return dayjs.utc(Date.now()).tz('Asia/Seoul').format('YYMMDD');
}

