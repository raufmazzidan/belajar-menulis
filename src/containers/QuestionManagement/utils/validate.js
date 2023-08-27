import { yupResolver } from '@mantine/form';
import * as Yup from 'yup';

const validate = Yup.object().shape({
  title: Yup.string().required().label('Judul Question'),
  type: Yup.string().required().label('Tipe Question'),
  item: Yup.array().of(
    Yup.object().shape({
      question: Yup.string().required().label('Pertanyaan'),
    })
  ),
});

export default yupResolver(validate);
