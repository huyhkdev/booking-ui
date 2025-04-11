import * as yup from 'yup'

export const schema = yup
  .object({
    email: yup.string().email('Email không đúng định dạng').required('Email không được để trống'),
    password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
  })
  .required()

export type schemaType = yup.InferType<typeof schema>

export const registerSchema = yup
  .object({
    email: yup.string().email('Email không đúng định dạng').required('Email không được để trống'),
    password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    fullName: yup.string().required('Họ không được để trống')
  })
  .required()

export const changePasswordSchema = yup
  .object({
    oldPassword: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    newPassword: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
    confirmPassword: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  })
  .required()

  export const forgotPasswordSchema = yup
  .object({
    email: yup.string().email('Email không đúng định dạng').required('Email không được để trống'),
  })
  .required()

  export const resetPasswordSchema = yup
  .object({
    password: yup.string().required('Mật khẩu không được để trống').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
  })
  .required()

export type registerType = yup.InferType<typeof registerSchema>
