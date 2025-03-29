import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, onAuthStateChanged, sendEmailVerification } from 'firebase/auth'

import { notification } from 'antd' // Nếu bạn đang sử dụng Ant Design

const VerifyEmail = () => {
  const auth = getAuth()
  const navigate = useNavigate()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [email, setEmail] = useState<any>('')

  // Dùng useEffect để theo dõi sự thay đổi trạng thái người dùng
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email) // Lưu email của người dùng
        if (user.emailVerified) {
          notification.success({
            message: 'Xác minh thành công',
            description: 'Bạn đã xác minh email thành công. Đang chuyển hướng đến trang đăng nhập...'
          })
          setTimeout(() => {
            navigate('/login')
            window.location.reload()
          }, 2000)
        } else {
          console.log('Thông tin người dùng:', user)
        }
      } else {
        console.log('Không có người dùng nào đăng nhập.')
      }
    })

    return () => unsubscribe()
  }, [auth, navigate])

  const handleResend = async () => {
    const user = auth.currentUser // Lấy thông tin người dùng hiện tại
    if (user) {
      try {
        await sendEmailVerification(user) // Gửi lại email xác minh
        notification.success({
          message: 'Gửi lại thành công',
          description: 'Email xác minh đã được gửi lại. Vui lòng kiểm tra hộp thư đến.'
        })
      } catch (error) {
        notification.error({
          message: 'Lỗi',
          description: 'Không thể gửi email xác minh. Vui lòng thử lại.'
        })
        console.error('Error sending email verification:', error)
      }
    } else {
      console.log('Không có người dùng để gửi email xác minh.')
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 p-4'>
      <div className='bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center'>
        <h2 className='mt-4 text-2xl font-bold text-gray-800'>Xác Minh Email{email}</h2>
        <p className='mt-2 text-gray-600'>
          Chúng tôi đã gửi một liên kết xác minh tới email của bạn ({email}). Vui lòng kiểm tra hộp thư đến và nhấp vào
          liên kết để hoàn tất việc đăng ký.
        </p>

        {/* Nút để gửi lại email xác minh */}
        <button
          onClick={handleResend}
          className='mt-6 w-full bg-primary text-white py-3 px-4 rounded-full font-semibold hover:bg-primary/90 transition'
        >
          Gửi lại email xác minh
        </button>

        <p className='mt-4 text-gray-600'>
          Đã xác minh?{' '}
          <Link to='/login' className='text-primary font-semibold hover:underline'>
            Đăng nhập tại đây
          </Link>
        </p>
        <p className='mt-2 text-sm text-gray-500'>
          Nếu bạn không nhận được email trong vài phút, hãy kiểm tra thư mục Spam hoặc{' '}
          <a
            href='https://mail.google.com/'
            className='text-primary font-semibold hover:underline'
            target='_blank'
            rel='noopener noreferrer'
          >
            mở Gmail
          </a>
          .
        </p>
      </div>
    </div>
  )
}

export default VerifyEmail
