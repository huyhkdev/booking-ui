import { ButtonAdnt } from '../../../Components/button'
import { useForm } from 'react-hook-form'
import { schema, schemaType } from '../../../utils/Rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../../../firebase/FirebaseConfig'
import { Link } from 'react-router-dom'
import { Input } from '../../../Components/input'
import InputEye from '../../../Components/inputEye'
import { notification } from 'antd'

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<schemaType>({ resolver: yupResolver(schema) })

  const onSubmit = async (data: schemaType) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
      if (data) {
        window.location.href = '/'
      }
      notification.success({
        message: 'Thành công',
        description: 'Bạn đã đăng nhập thành công'
      })
    } catch (error) {
      notification.error({
        message: 'Đăng nhập thất bại',
        description: 'Email hoặc mật khẩu không hợp lệ. Vui lòng thử lại.'
      })
      console.log(error)
    }
  }
  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)} noValidate>
      <Input type='email' label='email' register={register} errors={errors} required={true} placeholder=' ' />
      <InputEye label='Password' register={register} errors={errors} required={true} placeholder=' ' />

      <p className='text-sx text-gray-500 mt-3'>
        Bạn chưa có tài khoản?
        <Link className='text-primary underline' to='/register'>
          Đăng ký
        </Link>
      </p>

      <ButtonAdnt label='Tiếp tục' style='py-3' />
    </form>
  )
}

export default Login
