import * as yup from 'yup';

export const validationLogin = yup.object().shape({
  email: yup.string().label('Email').max(50).email().required(),
  password: yup.string().label('Password').min(4).max(20).required(),
});
