import { yupResolver } from '@mantine/form';
import * as Yup from 'yup';

const validate = Yup.object().shape({
  fullName: Yup.string().required().label('Nama Lengkap'),
  email: Yup.string().required().email().label('Email'),
  password: Yup.string().required().min(6).label('PIN'),
});

export default yupResolver(validate);
