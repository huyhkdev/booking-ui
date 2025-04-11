import { ButtonAdnt } from '../../../Components/button'
import { useForm } from 'react-hook-form'
import { resetPasswordSchema } from '../../../utils/Rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import { httpErrorToToastAtr } from '../../../helpers/httpErrorToToastAtr'
import InputEye from '../../../Components/inputEye'
import { useResetPassword } from '../../../hooks/auth/useResetPassword'
import { useNavigate, useParams } from 'react-router-dom'
const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({ resolver: yupResolver(resetPasswordSchema) })
  const { mutate, isPending } = useResetPassword();
  const { resetToken } = useParams() as {resetToken: string};
  const navigate = useNavigate();
  const onSubmit = async (data: any) => {
    const body = { newPassword: data.password, resetToken };
    mutate(body, {
      onSuccess: (_) => {
        notification.success({
          message: 'Cập nhật mật khẩu thành công',
        })
        navigate("/login");
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
      <InputEye label='Mật khẩu' name='password' register={register} errors={errors} required={true} placeholder='' />
      <ButtonAdnt isLoading={isPending} label='Cật nhật mật khẩu' style='py-3' />
    </form>
  )
}

export default ResetPassword
