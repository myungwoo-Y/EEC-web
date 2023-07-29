export function validateEmail(value: string, user: any) {
  if (!value) {
    return '이메일을 입력해주세요';
  }
  
  if (user) {
    return '중복된 이메일 입니다'
  }
  
  return '';
}

export function validatePassword(value: string | undefined) {
  if (!value) {
    return '비밀번호를 입력해주세요';
  }
  return '';
}

export function validateConfirmPassword(password: string | undefined, confirmPassword: string) {
  if (!confirmPassword) {
    return '비밀번호를 한번 더 입력해주세요';
  } else if (password !== confirmPassword) {
    return '비밀번호가 서로 같지 않습니다'
  }
  return '';
}

export function validateRole(value: string | undefined) {
  if (!value) {
    return '계정 구분을 선택해주세요';
  }
  return '';
}

export function validateDepartment(value: string | undefined) {
  if (!value) {
    return '소속을 입력해주세요';
  }
  return '';
}

export function validateJobLevel(value: string | undefined) {
  if (!value) {
    return '직급을 입력해주세요';
  }
  return '';
}

export function validateName(value: string | undefined) {
  if (!value) {
    return '이름을 입력해주세요';
  }
  return '';
}

export function validatePhoneNumber(value: string | undefined) {
  if (!value) {
    return '핸드폰 번호를 입력해주세요';
  }
  return '';
}

export function validateClassOrder(value: string | number | undefined) {
  if (!value) {
    return '기수를 선택해주세요';
  }
  return '';
}
