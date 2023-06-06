export const initUser = {
  email: '',
  password: '',
  classification: '',
  name: '',
  birthday: new Date(),
  phone_number: '',
  department: '',
  job_level: '',
  class_order: '',
};

export const initErrorMsgMap = {
  ...initUser,
  birthday: '',
  confirmPassword: '',
};
