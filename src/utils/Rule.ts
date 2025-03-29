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
    firstName: yup.string().required('Tên không được để trống'),
    lastName: yup.string().required('Họ không được để trống')
  })
  .required()
export type registerType = yup.InferType<typeof registerSchema>
