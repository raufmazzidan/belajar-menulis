import { yupResolver } from '@mantine/form';
import * as Yup from 'yup';

const login = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().label('Password'),
});

const register = Yup.object().shape({
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('Password'),
  fullName: Yup.string().required().label('FullName'),
});

export const validateLogin = yupResolver(login);
export const validateRegister = yupResolver(register);
