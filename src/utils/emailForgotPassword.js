import * as yup from 'yup';


export const sendEmailForgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Please enter your email')
    .email('Invalid email format'),
});

export const verifyOtpForgotPasswordSchema = yup.object({
  otp: yup
    .string()
    .required('Please enter the OTP code')
    .matches(/^\d{6}$/, 'Invalid OTP code'),
});



export const resetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .required("Please enter a new password")
      .min(6, "Password must be at least 6 characters"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Passwords do not match")
      .required("Please confirm your password"),
  })
  .required();
