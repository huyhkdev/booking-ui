import { useEffect, useState } from 'react'
import { FileChangeEvent, OwnerUploadHotelInfo } from '../../../Components/Owner'
import { Button, notification, Spin } from 'antd'
import { httpErrorToToastAtr } from '../../../helpers/httpErrorToToastAtr'
import { useInfoRequestOwner, useOwnerRegister } from '../../../hooks/owner'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export const OwnerHotelRequest = () => {
  const navigate = useNavigate()
  const [file, setFile] = useState<File | null>(null)
  const [userRole, setUserRole] = useState<string>('user')
  const [isPopupVisible, setIsPopupVisible] = useState(false)

  const { mutate, isPending } = useOwnerRegister()
  const { data: infor, isLoading } = useInfoRequestOwner()
  const inforRequest = infor?.data?.data?.infoRequest

  const handleFileChange = (e: FileChangeEvent) => {
    const selectedFile = e.target.files[0]
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile)
    } else {
      notification.error({ message: 'Vui lòng tải lên tệp PDF hợp lệ.' })
    }
  }

  const handleSubmit = () => {
    const formData = new FormData()
    formData.append('hotelInfoFileUrl', file as any)
    if (file) {
      mutate(formData, {
        onSuccess: () => {
          notification.success({
            message: 'Tệp đã được tải lên thành công!',
            description: 'Chúng tôi sẽ xem xét thông tin và phản hồi trong thời gian sớm nhất.'
          })
          window.location.reload()
        },
        onError: (error) => {
          const [message, description] = httpErrorToToastAtr(error)
          notification.error({ message, description })
        }
      })
    } else {
      notification.error({
        message: 'Vui lòng tải lên tệp PDF hợp lệ.'
      })
    }
  }

  useEffect(() => {
    const user = JSON.parse(String(localStorage.getItem('userInfo')))
    if (user && user.role === 'owner') {
      navigate('/owner/hotels')
    } else {
      setUserRole(user.role)
    }

    if (!isLoading) {
      inforRequest?.status ? setIsPopupVisible(false) : setIsPopupVisible(true)
    }
  }, [inforRequest])

  if (isLoading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <Spin size='large' />
      </div>
    )
  }

  return (
    <div className='container mx-auto p-5 min-h-screen'>
      <h1 className='text-3xl font-bold mb-6 text-center'>Đăng Ký Làm Chủ Khách Sạn</h1>

      {userRole === 'user' && (
        <div className='flex flex-col items-center'>
          {!inforRequest?.status ? (
            <>
              <div className='bg-yellow-100 text-yellow-800 px-4 py-3 rounded-md w-full max-w-md text-center mb-4'>
                Bạn cần đăng ký trở thành chủ sở hữu để có thể đăng khách sạn.
              </div>
              <Button
                onClick={() => setIsPopupVisible(true)}
                className='bg-blue-600 hover:bg-blue-700 transition-colors text-white px-6 py-2 rounded-md'
              >
                Đăng Ký Ngay
              </Button>
            </>
          ) : (
            <div className='bg-yellow-100 text-yellow-800 px-4 py-3 rounded-md w-full max-w-md text-center'>
              Hồ sơ của bạn đang được chờ duyệt. Vui lòng chờ để chúng tôi kiểm tra thông tin.
            </div>
          )}
        </div>
      )}

      <AnimatePresence>
        {isPopupVisible && userRole !== 'owner' && (
          <motion.div
            key='popup'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className='fixed inset-0 z-50'
          >
            <OwnerUploadHotelInfo
              handleFileChange={handleFileChange}
              handleSubmit={handleSubmit}
              setIsPopupVisible={setIsPopupVisible}
              isLoading={isPending}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
