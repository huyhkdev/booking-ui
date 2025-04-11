import { ButtonAdnt } from '../../../Components/button'
import { useForm } from 'react-hook-form'
import { registerSchema, registerType } from '../../../utils/Rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { Input } from '../../../Components/input'
import InputEye from '../../../Components/inputEye'
import { Link } from 'react-router-dom'
import { useRegister } from '../../../hooks/auth/useRegister'
import { notification } from 'antd'
import { httpErrorToToastAtr } from '../../../helpers/httpErrorToToastAtr'
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<registerType>({ resolver: yupResolver(registerSchema) })
  const { mutate, isPending } = useRegister();
  const handleRegister = async (data: registerType) => {
    const { fullName, email, password } = data
    mutate({ fullName, email, password },
      {
        onSuccess: () => {
          notification.success({
            message: 'Đăng ký thành công',
            description: 'Vui lòng kiểm tra email để xác thực tài khoản của bạn',})
        },
        onError: (error) => {
         const [message, description] =  httpErrorToToastAtr(error)
          notification.error({
            message,
            description
          });
        }
      }
    );
  }


  return (
    <form className='space-y-6' onSubmit={handleSubmit(handleRegister)}>
      <div>
        <div className='grid  '>
          <div className='ml-1'>
            <Input name='fullName' type='text' label='Tên Đầy đủ' register={register} errors={errors} required={true} placeholder=' ' />
          </div>
        </div>

        <Input name='email' type='email' label='Địa chỉ email' register={register} errors={errors} required={true} placeholder=' ' />
        <InputEye name='password' label='Mật khẩu' register={register} errors={errors} required={true} placeholder=' ' />
        <p className='text-sx text-gray-500 mt-3'>
          Bạn đã có tài khoản?
          <Link className='text-primary underline' to='/login'>
            Đăng nhập
          </Link>
        </p>
      </div>
      <ButtonAdnt isLoading={isPending} label='Tiếp tục' style='py-3' />
    </form>
  )
}

export default Register
