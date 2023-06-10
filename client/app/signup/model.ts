export const CreateUser = {
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

export const ErrorMsgMap = {
  ...CreateUser,
  birthday: '',
  confirmPassword: '',
};
