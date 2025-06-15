import * as Yup from 'yup'

export const loginValidate = () =>
  Yup.object({
    username: Yup.string().required('Login name is required'),
    password: Yup.string().required('Password is required'),
  })