import { ButtonAdnt } from '../../../Components/button'
import { useForm } from 'react-hook-form'
import {  forgotPasswordSchema } from '../../../utils/Rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../../Components/input'
import { useForgotPassword } from '../../../hooks/auth/useForgotPassword'
import { notification } from 'antd'
import { httpErrorToToastAtr } from '../../../helpers/httpErrorToToastAtr'
const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({ resolver: yupResolver(forgotPasswordSchema) })
  const {mutate, isPending} = useForgotPassword();
  const onSubmit = async (data: any) => {
    mutate(data,{
      onSuccess: (_) => {
        notification.success({
          message: 'Vui lòng kiểm tra email',
          description: 'Chúng tôi đã gửi email lấy lại mật khẩu đến email của bạn'
        })
      },
      onError: (error) => {
        const [message, description] = httpErrorToToastAtr(error)
        notification.error({
          message,
          description
        })
      }
    })
  }
  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input type='email' name='email' label='Nhập email tài khoản của bạn' register={register} errors={errors} required={true} placeholder=' ' />
      <ButtonAdnt isLoading={isPending} label='Lấy lại mật khẩu' style='py-3' />
    </form>
  )
}

export default ForgotPassword
