import * as yup from 'yup';

export const verifySignUpSchema = yup.object().shape({
  otp: yup.string().required('OTP is required').length(6, 'OTP must be 6 digits'),
});
