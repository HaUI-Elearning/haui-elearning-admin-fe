import * as Yup from 'yup'

export const loginValidate = () =>
  Yup.object({
    username: Yup.string().required('Tên đăng nhập là bắt buộc'),
    password: Yup.string().required('Mật khẩu là bắt buộc'),
  })