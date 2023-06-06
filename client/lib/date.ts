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

