import * as yup from 'yup';

export const registerSchema = yup.object().shape({
  username: yup.string().required('Username is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Confirm password is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  name: yup.string().required('Full name is required'),
});