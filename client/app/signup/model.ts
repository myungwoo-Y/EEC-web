export const CreateUser = {
  email: '',
  password: '',
  classification: '',
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
