import { ButtonAdnt } from '../../../Components/button'
import { useForm } from 'react-hook-form'
import { changePasswordSchema } from '../../../utils/Rule'
import { yupResolver } from '@hookform/resolvers/yup'

import InputEye from '../../../Components/inputEye'
import { notification } from 'antd'
import { useChangePassword } from '../../../hooks/auth/useChangePassword'
import { httpErrorToToastAtr } from '../../../helpers/httpErrorToToastAtr'
import { useAccessToken } from '../../../hooks/auth/useUserInfo'
const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<any>({ resolver: yupResolver(changePasswordSchema) })
  const token = useAccessToken();
  const { mutate ,isPending} = useChangePassword(token as string);
  const onSubmit = async (data: any) => {
    const {confirmPassword, newPassword,oldPassword } = data;
    if(confirmPassword != newPassword){
      notification.error({message: "Mật khẩu nhập lại không khớp"});
      return;
    }
    mutate({newPassword, oldPassword}, {
          onSuccess: (_) => {
            notification.success({
              message: 'Đổi mật khẩu thành công',
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
      <InputEye name='oldPassword' label='Mật khẩu cũ' register={register} errors={errors} required={true} placeholder=' ' />
      <InputEye name='newPassword' label='Mật khẩu mới' register={register} errors={errors} required={true} placeholder=' ' />
      <InputEye name='confirmPassword' label='Nhập lại mật khẩu' register={register} errors={errors} required={true} placeholder=' ' />
      <ButtonAdnt isLoading={isPending} label='Tiếp tục' style='py-3' />
    </form>
  )
}

export default ChangePassword
