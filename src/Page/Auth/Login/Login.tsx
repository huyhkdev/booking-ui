import { ButtonAdnt } from '../../../Components/button'
import { useForm } from 'react-hook-form'
import { schema, schemaType } from '../../../utils/Rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import { Input } from '../../../Components/input'
import InputEye from '../../../Components/inputEye'
import { notification } from 'antd'
import { useLogin } from '../../../hooks/auth/useLogin'
import { httpErrorToToastAtr } from '../../../helpers/httpErrorToToastAtr'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<schemaType>({ resolver: yupResolver(schema) })
  const { mutate, isPending } = useLogin();
  const navigate = useNavigate();
  const onSubmit = async (data: schemaType) => {

    mutate(data, {
      onSuccess: (data) => {
        console.log(data.data.data.accessToken)
        localStorage.setItem('accessToken', data.data.data.accessToken);
        localStorage.setItem('code', data.data.data.refreshToken);
        localStorage.setItem('userInfo', JSON.stringify(data.data.data.user));
        navigate('/');
        notification.success({
          message: 'Đăng nhập thành công',
          description: 'Chúc bạn một ngày tốt lành'
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
      <Input type='email' name='email' label='Email' register={register} errors={errors} required={true} placeholder=' ' />
      <InputEye label='Mật khẩu' name='password' register={register} errors={errors} required={true} placeholder=' ' />

      <p className='text-sx text-gray-500 mt-3'>
        Bạn chưa có tài khoản?
        <Link className='text-primary underline ml-1' to='/register'>
          Đăng ký
        </Link>
      </p>
      <p className='text-sx text-gray-500 mt-3'>
        <Link className='text-primary underline' to='/forgot-password'>
          Quên mật khẩu
        </Link>
      </p>

      <ButtonAdnt isLoading={isPending} label='Tiếp tục' style='py-3' />
    </form>
  )
}

export default Login
