import { ButtonAdnt } from '../../../Components/button'
import { createUserWithEmailAndPassword, User } from 'firebase/auth'
import { auth, db } from '../../../../firebase/FirebaseConfig'
import { setDoc, doc, serverTimestamp } from 'firebase/firestore'
import { useForm } from 'react-hook-form'
import { registerSchema, registerType } from '../../../utils/Rule'
import { yupResolver } from '@hookform/resolvers/yup'
import { notification } from 'antd'
import { Input } from '../../../Components/input'
import InputEye from '../../../Components/inputEye'
import { Link } from 'react-router-dom'
import { sendEmailVerification, onAuthStateChanged } from 'firebase/auth'
import { getUserInfo, TypeInfor } from '../../../Types/Users.type'
const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<registerType>({ resolver: yupResolver(registerSchema) })

  const handleRegister = async (data: registerType) => {
    try {
      const { email, password, firstName, lastName } = data

      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user: TypeInfor = userCredential.user
      if (user) {
        const displayName = `${firstName} ${lastName}`
        const userInfo = getUserInfo(user)

        await setDoc(doc(db, 'Users', user.uid), {
          ...userInfo,
          displayName,
          emailVerified: false,
          updatedAt: serverTimestamp()
        })

        await sendEmailVerification(user)

        window.location.href = '/verify'

        notification.success({
          message: 'Đăng ký thành công',
          description: 'Bạn đã đăng ký thành công tài khoản!'
        })
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        notification.error({
          message: 'Email đã được sử dụng',
          description: 'Email này đã được đăng ký. Vui lòng sử dụng email khác.'
        })
      } else if (error.code === 'auth/invalid-email') {
        notification.error({
          message: 'Email không hợp lệ',
          description: 'Vui lòng nhập một địa chỉ email hợp lệ.'
        })
      } else {
        notification.error({
          message: 'Đăng ký không thành công',
          description: 'Có lỗi xảy ra. Vui lòng thử lại.'
        })
      }
      console.error(error)
    }
  }
  const updateUserVerificationStatus = async (user: User) => {
    const userRef = doc(db, 'Users', user.uid)
    await setDoc(userRef, { emailVerified: true, updatedAt: serverTimestamp() }, { merge: true })
  }

  onAuthStateChanged(auth, async (user) => {
    if (user && user.emailVerified) {
      await updateUserVerificationStatus(user)
      console.log(user.emailVerified)
    }
  })

  return (
    <form className='space-y-6' onSubmit={handleSubmit(handleRegister)}>
      <div>
        <div className='grid grid-cols-2 '>
          <div className='mr-1'>
            <Input type='text' label='firstName' register={register} errors={errors} required={true} placeholder=' ' />
          </div>
          <div className='ml-1'>
            <Input type='text' label='lastName' register={register} errors={errors} required={true} placeholder=' ' />
          </div>
        </div>

        <Input type='email' label='email' register={register} errors={errors} required={true} placeholder=' ' />
        <InputEye label='Password' register={register} errors={errors} required={true} placeholder=' ' />
        <p className='text-sx text-gray-500 mt-3'>
          Bạn đã có tài khoản?
          <Link className='text-primary underline' to='/login'>
            Đăng nhập
          </Link>
        </p>
      </div>
      <ButtonAdnt label='Tiếp tục' style='py-3' />
    </form>
  )
}

export default Register
