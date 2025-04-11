import { GoogleOutlined } from '@ant-design/icons'
import backgroundImage from '../../assets/imageAuthen.jpg'
import { motion } from 'framer-motion'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../firebase'
import { useLoginGoogle } from '../../hooks/auth/useLoginGoogle'
import { httpErrorToToastAtr } from '../../helpers/httpErrorToToastAtr'
import { notification } from 'antd'
const HIDE_FOOTER_FORM = ["/change-password", "/forgot-password"]
const RESET_PASSWORD_INCLUDE_PATH = "reset-password";
const Auth = () => {
  const { mutate, isPending } = useLoginGoogle();
  const { pathname } = useLocation();
  const isHideFooter = HIDE_FOOTER_FORM.includes(pathname) || pathname.includes(RESET_PASSWORD_INCLUDE_PATH);
  const navigate = useNavigate();
  const handleLoginWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userInfo = { email: result.user.email, fullName: result.user.displayName, accessToken: (result.user as any).accessToken };
      mutate({ email: userInfo.email as string, fullName: userInfo.fullName as string, accessToken: userInfo.accessToken }, {
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
      });
    } catch (error) {
      console.error("Login failed:", error);
    }
  };
  return (
    <div className=' grid grid-cols-1  md:grid-cols-2 border-y'>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className='flex items-center justify-center '
      >
        <div className='w-full max-w-md  p-8 rounded-lg shadow-xl'>
          <p className='text-2xl font-bold text-center mb-6'>Chào mừng bạn đến với Airbnb</p>
          <div className='space-y-6'>
            <Outlet />
          </div>
          {!isHideFooter && <div className='flex items-center justify-center gap-3 py-5'>
            <hr className='w-1/2 border-gray-300' />
            <p>hoặc</p>
            <hr className='w-1/2 border-gray-300' />
          </div>}
          {!isHideFooter && <button
            onClick={handleLoginWithGoogle}
            className='w-full font-medium  px-4 text-center border border-gray-300 rounded-md py-3 hover:bg-gray-200 cursor-pointer '
          >
            <GoogleOutlined className='text-primary text-xl text-center mr-1' />
            <span> Đăng nhập với google</span>
          </button>}
        </div>
      </motion.div>
      <div className='hidden md:block overflow-hidden  '>
        <img src={backgroundImage} className='w-full h-screen object-cover' alt='Background' />
      </div>
    </div>
  )
}

export default Auth
