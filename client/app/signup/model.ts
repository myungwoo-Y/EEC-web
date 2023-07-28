export const CreateUser = {
  email: '',
  password: '',
  role: '',
  name: '',
  birthday: new Date(),
  phoneNumber: '',
  department: '',
  jobLevel: '',
  classOrder: '',
  agreementTerms: true
};

export const ErrorMsgMap = {
  ...CreateUser,
  birthday: '',
  confirmPassword: '',
};
