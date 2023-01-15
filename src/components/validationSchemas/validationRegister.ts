import * as yup from 'yup';

export const validationRegister = yup.object().shape({
  firstName: yup.string().label('First Name').min(2).max(25).required(),
  lastName: yup.string().label('Last Name').min(2).max(25).required(),
  email: yup.string().label('Email').max(50).email().required(),
  password: yup.string().label('Password').min(4).max(20).required(),
  location: yup.string().label('Location').required(),
  occupation: yup.string().label('Occupation').required(),
  picture: yup.string().label('Picture').required(),
});
